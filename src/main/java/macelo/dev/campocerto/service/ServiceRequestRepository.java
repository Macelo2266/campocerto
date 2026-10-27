package macelo.dev.campocerto.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.Optional;

public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {

    @EntityGraph(attributePaths = {"requester", "provider", "provider.user", "category"})
    Optional<ServiceRequest> findWithDetailsById(Long id);

    @EntityGraph(attributePaths = {"requester", "provider", "category"})
    Page<ServiceRequest> findByRequesterId(Long requesterId, Pageable pageable);

    @EntityGraph(attributePaths = {"requester", "provider", "category"})
    Page<ServiceRequest> findByRequesterIdAndStatus(Long requesterId, ServiceRequestStatus status,
                                                    Pageable pageable);

    @EntityGraph(attributePaths = {"requester", "provider", "category"})
    Page<ServiceRequest> findByProviderUserId(Long providerUserId, Pageable pageable);

    @EntityGraph(attributePaths = {"requester", "provider", "category"})
    Page<ServiceRequest> findByProviderUserIdAndStatus(Long providerUserId, ServiceRequestStatus status,
                                                       Pageable pageable);

    long countByRequesterIdAndStatus(Long requesterId, ServiceRequestStatus status);

    boolean existsByRequesterIdAndProviderIdAndCategoryIdAndStatusIn(
            Long requesterId, Long providerId, Long categoryId, Collection<ServiceRequestStatus> statuses);
}