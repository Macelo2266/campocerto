package macelo.dev.campocerto.provider;

import macelo.dev.campocerto.common.dto.PageResponse;
import macelo.dev.campocerto.common.exception.ApiException;
import macelo.dev.campocerto.common.util.SlugUtils;
import macelo.dev.campocerto.provider.dto.ProviderPublicResponse;
import macelo.dev.campocerto.provider.dto.ProviderSummaryResponse;
import macelo.dev.campocerto.user.dto.UserStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProviderSearchService {

    private static final int MAX_PAGE_SIZE = 50;
    private static final int MAX_TEXT_LENGTH = 100;

    private final ProviderProfileRepository profileRepository;
    private final ProviderServiceAreaRepository areaRepository;

    public ProviderSearchService(ProviderProfileRepository profileRepository,
                                 ProviderServiceAreaRepository areaRepository) {
        this.profileRepository = profileRepository;
        this.areaRepository = areaRepository;
    }

    @Transactional(readOnly = true)
    public PageResponse<ProviderSummaryResponse> search(String text, Long categoryId, String city,
                                                        ProviderSort sort, int page, int size) {

        Specification<ProviderProfile> spec = ProviderSpecifications.publiclyVisible()
                .and(ProviderSpecifications.isAvailable());

        if (text != null && !text.isBlank()) {
            String trimmed = text.trim();
            if (trimmed.length() > MAX_TEXT_LENGTH) {
                trimmed = trimmed.substring(0, MAX_TEXT_LENGTH);
            }
            spec = spec.and(ProviderSpecifications.matchesText(trimmed));
        }

        if (categoryId != null) {
            spec = spec.and(ProviderSpecifications.offersCategory(categoryId));
        }

        String cityKey = city == null ? "" : SlugUtils.toSlug(city);
        if (!cityKey.isEmpty()) {
            spec = spec.and(ProviderSpecifications.servesCity(cityKey));
        }

        Pageable pageable = PageRequest.of(
                Math.max(page, 0),
                Math.min(Math.max(size, 1), MAX_PAGE_SIZE),
                sort.toSort()
        );

        Page<ProviderProfile> result = profileRepository.findAll(spec, pageable);

        // O mapeamento acontece AQUI, dentro da transação: é neste momento que as
        // coleções lazy são carregadas (em lote, por causa do batch_fetch_size).
        return PageResponse.from(result, ProviderSummaryResponse::from);
    }

    @Transactional(readOnly = true)
    public ProviderPublicResponse getPublicProfile(Long id) {
        ProviderProfile profile = profileRepository.findById(id)
                .filter(found -> found.getUser().getStatus() == UserStatus.ACTIVE)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Prestador não encontrado"));

        return ProviderPublicResponse.from(profile);
    }


    @Transactional(readOnly = true)
    public List<String> listCities() {
        return areaRepository.findPublicCities(UserStatus.ACTIVE);
    }

}
