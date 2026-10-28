package macelo.dev.campocerto.admin;

import jakarta.validation.Valid;
import macelo.dev.campocerto.admin.dto.AdminReviewResponse;
import macelo.dev.campocerto.admin.dto.ReviewStatusRequest;
import macelo.dev.campocerto.common.dto.PageResponse;
import macelo.dev.campocerto.review.ReviewStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/reviews")
@PreAuthorize("hasRole('ADMIN')")
public class AdminReviewController {

    private final AdminReviewService service;

    public AdminReviewController(AdminReviewService service) {
        this.service = service;
    }

    @GetMapping
    public PageResponse<AdminReviewResponse> list(@RequestParam(required = false) ReviewStatus status,
                                                  @RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "20") int size) {
        return service.list(status, page, size);
    }

    @PatchMapping("/{id}/status")
    public AdminReviewResponse changeStatus(@AuthenticationPrincipal Jwt jwt,
                                            @PathVariable Long id,
                                            @Valid @RequestBody ReviewStatusRequest body) {
        return service.changeStatus(Long.valueOf(jwt.getSubject()), id, body.status());
    }
}