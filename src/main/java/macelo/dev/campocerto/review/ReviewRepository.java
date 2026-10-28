package macelo.dev.campocerto.review;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    boolean existsByServiceRequestId(Long serviceRequestId);

    long countByProviderIdAndStatus(Long providerId, ReviewStatus status);

    @Query("select avg(r.rating) from Review r where r.provider.id = :providerId and r.status = :status")
    Double averageRating(@Param("providerId") Long providerId, @Param("status") ReviewStatus status);

    @EntityGraph(attributePaths = {"reviewer", "serviceRequest", "serviceRequest.category"})
    Page<Review> findByProviderIdAndStatus(Long providerId, ReviewStatus status, Pageable pageable);

    @EntityGraph(attributePaths = {"reviewer", "provider", "serviceRequest"})
    Page<Review> findAllBy(Pageable pageable);

    @EntityGraph(attributePaths = {"reviewer", "provider", "serviceRequest"})
    Page<Review> findByStatus(ReviewStatus status, Pageable pageable);

    @EntityGraph(attributePaths = {"reviewer", "provider", "serviceRequest"})
    Optional<Review> findWithDetailsById(Long id);

    long countByStatus(ReviewStatus status);

    @Query("select avg(r.rating) from Review r where r.status = :status")
    Double averageRatingByStatus(@Param("status") ReviewStatus status);
}