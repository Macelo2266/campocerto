package macelo.dev.campocerto.provider;


import macelo.dev.campocerto.category.Category;
import macelo.dev.campocerto.category.CategoryRepository;
import macelo.dev.campocerto.common.exception.ApiException;
import macelo.dev.campocerto.common.util.PhoneUtils;
import macelo.dev.campocerto.provider.dto.ProviderProfileRequest;
import macelo.dev.campocerto.provider.dto.ProviderProfileResponse;
import macelo.dev.campocerto.user.UserRepository;
import macelo.dev.campocerto.user.dto.User;
import macelo.dev.campocerto.user.dto.UserRole;
import macelo.dev.campocerto.user.dto.UserStatus;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ProviderProfileService {

    private final ProviderProfileRepository profileRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public ProviderProfileService(ProviderProfileRepository profileRepository,
                                  UserRepository userRepository,
                                  CategoryRepository categoryRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    public ProviderProfileResponse create(Long userId, ProviderProfileRequest request) {
        User user = loadActiveProvider(userId);

        if (profileRepository.existsByUserId(userId)) {
            throw new ApiException(HttpStatus.CONFLICT, "Você já possui um perfil de prestador");
        }

        ProviderProfile profile = new ProviderProfile(
                user,
                request.professionalName().trim(),
                blankToNull(request.description()),
                PhoneUtils.normalizeBrazilianMobile(request.whatsapp()),
                request.city().trim(),
                request.available()
        );
        applyAreasAndOfferings(profile, request);

        return ProviderProfileResponse.from(profileRepository.save(profile));
    }

    @Transactional
    public ProviderProfileResponse update(Long userId, ProviderProfileRequest request) {
        loadActiveProvider(userId);

        ProviderProfile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND,
                        "Você ainda não criou seu perfil de prestador"));

        profile.updateBasicInfo(
                request.professionalName().trim(),
                blankToNull(request.description()),
                PhoneUtils.normalizeBrazilianMobile(request.whatsapp()),
                request.city().trim(),
                request.available()
        );
        applyAreasAndOfferings(profile, request);

        return ProviderProfileResponse.from(profile);
    }

    @Transactional(readOnly = true)
    public ProviderProfileResponse getMine(Long userId) {
        ProviderProfile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND,
                        "Você ainda não criou seu perfil de prestador"));
        return ProviderProfileResponse.from(profile);
    }

    // O papel do token pode estar desatualizado: a fonte da verdade é o banco.
    private User loadActiveProvider(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Sessão inválida. Faça login novamente."));

        if (user.getRole() != UserRole.PROVIDER) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Apenas prestadores de serviço podem ter perfil profissional");
        }
        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Sua conta está suspensa ou bloqueada");
        }
        return user;
    }

    private void applyAreasAndOfferings(ProviderProfile profile, ProviderProfileRequest request) {
        // A cidade-base sempre faz parte das cidades atendidas
        Set<String> areas = new LinkedHashSet<>();
        areas.add(profile.getCity());
        if (request.serviceAreas() != null) {
            request.serviceAreas().forEach(area -> areas.add(area.trim()));
        }
        profile.syncServiceAreas(areas);

        profile.syncOfferings(resolveOfferings(profile, request.offerings()));
    }

    private List<ProviderProfile.OfferingInput> resolveOfferings(ProviderProfile profile, List<OfferingRequest> requested) {
        Set<Long> ids = new LinkedHashSet<>();
        for (ProviderProfileRequest.OfferingRequest offering : requested) {
            if (!ids.add(offering.categoryId())) {
                throw new ApiException(HttpStatus.BAD_REQUEST, "Há serviços repetidos na lista");
            }
        }

        Map<Long, Category> found = categoryRepository.findAllById(ids).stream()
                .collect(Collectors.toMap(Category::getId, Function.identity()));

        Set<Long> alreadyOffered = profile.getOfferedCategoryIds();
        List<ProviderProfile.OfferingInput> result = new ArrayList<>();

        for (ProviderProfileRequest.OfferingRequest offering : requested) {
            Category category = found.get(offering.categoryId());

            if (category == null) {
                throw new ApiException(HttpStatus.BAD_REQUEST,
                        "Categoria inválida: " + offering.categoryId());
            }
            // Categoria desativada só continua valendo para quem já a oferecia
            if (!category.isActive() && !alreadyOffered.contains(category.getId())) {
                throw new ApiException(HttpStatus.BAD_REQUEST,
                        "A categoria \"" + category.getName() + "\" não está disponível no momento");
            }

            result.add(new ProviderProfile.OfferingInput(category, blankToNull(offering.priceInfo())));
        }
        return result;
    }

    private String blankToNull(String text) {
        if (text == null || text.isBlank()) {
            return null;
        }
        return text.trim();
    }
}