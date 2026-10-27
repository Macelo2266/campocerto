package macelo.dev.campocerto.review;

import jakarta.validation.Valid;
import macelo.dev.campocerto.common.dto.PageResponse;
import macelo.dev.campocerto.review.dto.ReviewCreateRequest;
import macelo.dev.campocerto.review.dto.ReviewResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/api/service-requests/{id}/reviews")
    @PreAuthorize("hasRole('FARMER')")
    public ResponseEntity<ReviewResponse> create(@AuthenticationPrincipal Jwt jwt,
                                                 @PathVariable Long id,
                                                 @Valid @RequestBody ReviewCreateRequest request) {
        ReviewResponse created = reviewService.create(Long.valueOf(jwt.getSubject()), id, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/api/providers/{id}/reviews")
    public PageResponse<ReviewResponse> list(@PathVariable Long id,
                                             @RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "10") int size) {
        return reviewService.listForProvider(id, page, size);
    }
}
