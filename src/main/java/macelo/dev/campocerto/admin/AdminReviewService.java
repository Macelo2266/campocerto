package macelo.dev.campocerto.admin;

import macelo.dev.campocerto.admin.dto.AdminReviewResponse;
import macelo.dev.campocerto.common.dto.PageResponse;
import macelo.dev.campocerto.common.exception.ApiException;
import macelo.dev.campocerto.common.util.PageUtils;
import macelo.dev.campocerto.review.Review;
import macelo.dev.campocerto.review.ReviewRepository;
import macelo.dev.campocerto.review.ReviewService;
import macelo.dev.campocerto.review.ReviewStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminReviewService {

    private static final Logger log = LoggerFactory.getLogger(AdminReviewService.class);
    private static final Sort NEWEST_FIRST = Sort.by(Sort.Order.desc("createdAt"), Sort.Order.desc("id"));

    private final ReviewRepository reviewRepository;
    private final ReviewService reviewService;

    public AdminReviewService(ReviewRepository reviewRepository, ReviewService reviewService) {
        this.reviewRepository = reviewRepository;
        this.reviewService = reviewService;
    }

    @Transactional(readOnly = true)
    public PageResponse<AdminReviewResponse> list(ReviewStatus status, int page, int size) {
        Pageable pageable = PageUtils.pageable(page, size, NEWEST_FIRST);

        Page<Review> result = status == null
                ? reviewRepository.findAllBy(pageable)
                : reviewRepository.findByStatus(status, pageable);

        return PageResponse.from(result, AdminReviewResponse::from);
    }

    @Transactional
    public AdminReviewResponse changeStatus(Long adminId, Long reviewId, ReviewStatus newStatus) {
        Review review = reviewRepository.findWithDetailsById(reviewId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Avaliação não encontrada"));

        if (review.getStatus() != newStatus) {
            review.changeStatus(newStatus);
            reviewRepository.saveAndFlush(review);

            // A média só muda por UM caminho: recalcular a partir da tabela
            reviewService.refreshProviderRating(review.getProvider().getId());

            log.info("Admin {} alterou a avaliação {} para {}", adminId, reviewId, newStatus);
        }

        return AdminReviewResponse.from(review);
    }
}