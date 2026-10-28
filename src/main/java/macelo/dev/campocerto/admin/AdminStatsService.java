package macelo.dev.campocerto.admin;

import macelo.dev.campocerto.admin.dto.AdminStatsResponse;
import macelo.dev.campocerto.provider.ProviderProfileRepository;
import macelo.dev.campocerto.review.ReviewRepository;
import macelo.dev.campocerto.review.ReviewStatus;
import macelo.dev.campocerto.service.ServiceRequestRepository;
import macelo.dev.campocerto.service.ServiceRequestStatus;
import macelo.dev.campocerto.user.UserRepository;
import macelo.dev.campocerto.user.dto.UserRole;
import macelo.dev.campocerto.user.dto.UserStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.EnumMap;
import java.util.Map;

@Service
public class AdminStatsService {

    private final UserRepository userRepository;
    private final ProviderProfileRepository providerRepository;
    private final ServiceRequestRepository requestRepository;
    private final ReviewRepository reviewRepository;

    public AdminStatsService(UserRepository userRepository,
                             ProviderProfileRepository providerRepository,
                             ServiceRequestRepository requestRepository,
                             ReviewRepository reviewRepository) {
        this.userRepository = userRepository;
        this.providerRepository = providerRepository;
        this.requestRepository = requestRepository;
        this.reviewRepository = reviewRepository;
    }

    @Transactional(readOnly = true)
    public AdminStatsResponse stats() {
        AdminStatsResponse.UserStats users = new AdminStatsResponse.UserStats(
                userRepository.count(),
                userRepository.countByRole(UserRole.FARMER),
                userRepository.countByRole(UserRole.PROVIDER),
                userRepository.countByRole(UserRole.ADMIN),
                userRepository.countByStatus(UserStatus.ACTIVE),
                userRepository.countByStatus(UserStatus.SUSPENDED),
                userRepository.countByStatus(UserStatus.BLOCKED)
        );

        AdminStatsResponse.ProviderStats providers = new AdminStatsResponse.ProviderStats(
                providerRepository.count(),
                providerRepository.countByAvailableTrue()
        );

        Map<ServiceRequestStatus, Long> requests = new EnumMap<>(ServiceRequestStatus.class);
        for (ServiceRequestStatus status : ServiceRequestStatus.values()) {
            requests.put(status, requestRepository.countByStatus(status));
        }

        Double average = reviewRepository.averageRatingByStatus(ReviewStatus.VISIBLE);
        AdminStatsResponse.ReviewStats reviews = new AdminStatsResponse.ReviewStats(
                reviewRepository.countByStatus(ReviewStatus.VISIBLE),
                reviewRepository.countByStatus(ReviewStatus.HIDDEN),
                average == null ? null : BigDecimal.valueOf(average).setScale(2, RoundingMode.HALF_UP).doubleValue()
        );

        return new AdminStatsResponse(users, providers, requests, reviews);
    }
}