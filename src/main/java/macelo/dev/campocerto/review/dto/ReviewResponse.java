package macelo.dev.campocerto.review.dto;

import macelo.dev.campocerto.review.Review;

import java.time.Instant;

public record ReviewResponse(
        Long id,
        int rating,
        String comment,
        String reviewerName,
        String serviceName,
        Instant createdAt
) {

    public static ReviewResponse from(Review review) {
        return new ReviewResponse(
                review.getId(),
                review.getRating(),
                review.getComment(),
                firstName(review.getReviewer().getName()),
                review.getServiceRequest().getCategory().getName(),
                review.getCreatedAt()
        );
    }

    // Privacidade: só o primeiro nome aparece publicamente
    private static String firstName(String fullName) {
        String trimmed = fullName.trim();
        int space = trimmed.indexOf(' ');
        return space < 0 ? trimmed : trimmed.substring(0, space);
    }
}