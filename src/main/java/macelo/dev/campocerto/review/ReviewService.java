package macelo.dev.campocerto.review;

import macelo.dev.campocerto.common.dto.PageResponse;
import macelo.dev.campocerto.common.exception.ApiException;
import macelo.dev.campocerto.common.util.PageUtils;
import macelo.dev.campocerto.provider.ProviderProfile;
import macelo.dev.campocerto.provider.ProviderProfileRepository;
import macelo.dev.campocerto.review.dto.ReviewCreateRequest;
import macelo.dev.campocerto.review.dto.ReviewResponse;
import macelo.dev.campocerto.service.RequestActor;
import macelo.dev.campocerto.service.ServiceRequest;
import macelo.dev.campocerto.service.ServiceRequestRepository;
import macelo.dev.campocerto.service.ServiceRequestStatus;
import macelo.dev.campocerto.user.UserService;
import macelo.dev.campocerto.user.dto.UserStatus;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class ReviewService {

    private static final String ALREADY_REVIEWED = "Esta solicitação já foi avaliada";
    private static final Sort NEWEST_FIRST = Sort.by(Sort.Order.desc("createdAt"), Sort.Order.desc("id"));

    private final ReviewRepository reviewRepository;
    private final ServiceRequestRepository requestRepository;
    private final ProviderProfileRepository providerRepository;
    private final UserService userService;

    public ReviewService(ReviewRepository reviewRepository,
                         ServiceRequestRepository requestRepository,
                         ProviderProfileRepository providerRepository,
                         UserService userService) {
        this.reviewRepository = reviewRepository;
        this.requestRepository = requestRepository;
        this.providerRepository = providerRepository;
        this.userService = userService;
    }

    @Transactional
    public ReviewResponse create(Long userId, Long requestId, ReviewCreateRequest body) {
        userService.requireActiveUser(userId);

        ServiceRequest request = requestRepository.findWithDetailsById(requestId)
                .orElseThrow(ReviewService::requestNotFound);

        // Quem não participa recebe 404, e não 403: não revelamos que a solicitação existe
        RequestActor actor = request.roleOf(userId).orElseThrow(ReviewService::requestNotFound);

        if (actor != RequestActor.REQUESTER) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Apenas quem solicitou o serviço pode avaliá-lo");
        }
        if (request.getStatus() != ServiceRequestStatus.CONCLUIDA) {
            throw new ApiException(HttpStatus.CONFLICT, "Só é possível avaliar serviços concluídos");
        }
        if (reviewRepository.existsByServiceRequestId(requestId)) {
            throw new ApiException(HttpStatus.CONFLICT, ALREADY_REVIEWED);
        }

        Review review = new Review(request, body.rating(), blankToNull(body.comment()));

        try {
            reviewRepository.saveAndFlush(review);
        } catch (DataIntegrityViolationException e) {
            // Dois cliques simultâneos: o UNIQUE do banco barrou o segundo
            throw new ApiException(HttpStatus.CONFLICT, ALREADY_REVIEWED);
        }

        refreshProviderRating(request.getProvider().getId());

        return ReviewResponse.from(review);
    }

    @Transactional(readOnly = true)
    public PageResponse<ReviewResponse> listForProvider(Long providerId, int page, int size) {
        providerRepository.findById(providerId)
                .filter(found -> found.getUser().getStatus() == UserStatus.ACTIVE)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Prestador não encontrado"));

        Pageable pageable = PageUtils.pageable(page, size, NEWEST_FIRST);

        return PageResponse.from(
                reviewRepository.findByProviderIdAndStatus(providerId, ReviewStatus.VISIBLE, pageable),
                ReviewResponse::from);
    }

    /**
     * ÚNICO caminho que escreve a média no perfil. Sempre recalcula a partir da tabela
     * (nunca "soma 1"), então não existe deriva. Também será usado pela moderação (3.6b).
     */
    @Transactional
    public void refreshProviderRating(Long providerId) {
        // Trava a linha do prestador: avaliações simultâneas entram em fila
        ProviderProfile provider = providerRepository.findForUpdateById(providerId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Prestador não encontrado"));

        long count = reviewRepository.countByProviderIdAndStatus(providerId, ReviewStatus.VISIBLE);
        Double average = reviewRepository.averageRating(providerId, ReviewStatus.VISIBLE);

        BigDecimal rounded = average == null
                ? BigDecimal.ZERO
                : BigDecimal.valueOf(average).setScale(2, RoundingMode.HALF_UP);

        provider.applyRating(rounded, (int) count);
    }

    private static ApiException requestNotFound() {
        return new ApiException(HttpStatus.NOT_FOUND, "Solicitação não encontrada");
    }

    private String blankToNull(String text) {
        if (text == null || text.isBlank()) {
            return null;
        }
        return text.trim();
    }
}