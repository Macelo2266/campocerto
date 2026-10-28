package macelo.dev.campocerto.admin;

import jakarta.validation.Valid;
import macelo.dev.campocerto.admin.dto.AdminUserResponse;
import macelo.dev.campocerto.admin.dto.UserStatusRequest;
import macelo.dev.campocerto.common.dto.PageResponse;
import macelo.dev.campocerto.user.dto.UserRole;
import macelo.dev.campocerto.user.dto.UserStatus;
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
@RequestMapping("/api/admin/users")
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {

    private final AdminUserService service;

    public AdminUserController(AdminUserService service) {
        this.service = service;
    }

    @GetMapping
    public PageResponse<AdminUserResponse> list(@RequestParam(required = false) String q,
                                                @RequestParam(required = false) UserRole role,
                                                @RequestParam(required = false) UserStatus status,
                                                @RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "20") int size) {
        return service.list(q, role, status, page, size);
    }

    @PatchMapping("/{id}/status")
    public AdminUserResponse changeStatus(@AuthenticationPrincipal Jwt jwt,
                                          @PathVariable Long id,
                                          @Valid @RequestBody UserStatusRequest body) {
        return service.changeStatus(Long.valueOf(jwt.getSubject()), id, body.status());
    }
}