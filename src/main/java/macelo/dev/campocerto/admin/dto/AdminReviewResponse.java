package macelo.dev.campocerto.admin.dto;


import macelo.dev.campocerto.review.Review;
import macelo.dev.campocerto.review.ReviewStatus;

import java.time.Instant;

public record AdminReviewResponse(
        Long id,
        int rating,
        String comment,
        ReviewStatus status,
        String reviewerName,
        Long providerId,
        String providerName,
        Long serviceRequestId,
        Instant createdAt
) {

    public static AdminReviewResponse from(Review review) {
        return new AdminReviewResponse(
                review.getId(),
                review.getRating(),
                review.getComment(),
                review.getStatus(),
                review.getReviewer().getName(),
                review.getProvider().getId(),
                review.getProvider().getProfessionalName(),
                review.getServiceRequest().getId(),
                review.getCreatedAt()
        );
    }
}