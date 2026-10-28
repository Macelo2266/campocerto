package macelo.dev.campocerto.admin;

import macelo.dev.campocerto.admin.dto.AdminServiceRequestResponse;
import macelo.dev.campocerto.common.dto.PageResponse;
import macelo.dev.campocerto.service.ServiceRequestStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/service-requests")
@PreAuthorize("hasRole('ADMIN')")
public class AdminServiceRequestController {

    private final AdminServiceRequestService service;

    public AdminServiceRequestController(AdminServiceRequestService service) {
        this.service = service;
    }

    @GetMapping
    public PageResponse<AdminServiceRequestResponse> list(
            @RequestParam(required = false) ServiceRequestStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return service.list(status, page, size);
    }
}