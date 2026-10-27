package macelo.dev.campocerto.service;

import macelo.dev.campocerto.common.dto.PageResponse;
import macelo.dev.campocerto.service.dto.ServiceRequestResponse;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/providers/me/service-requests")
@PreAuthorize("hasRole('PROVIDER')")
public class ProviderServiceRequestController {

    private final ServiceRequestService service;

    public ProviderServiceRequestController(ServiceRequestService service) {
        this.service = service;
    }

    @GetMapping
    public PageResponse<ServiceRequestResponse> received(@AuthenticationPrincipal Jwt jwt,
                                                         @RequestParam(required = false) ServiceRequestStatus status,
                                                         @RequestParam(defaultValue = "0") int page,
                                                         @RequestParam(defaultValue = "10") int size) {
        return service.listReceived(Long.valueOf(jwt.getSubject()), status, page, size);
    }
}
