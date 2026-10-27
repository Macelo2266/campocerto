package macelo.dev.campocerto.service;

import jakarta.validation.Valid;
import macelo.dev.campocerto.common.dto.PageResponse;
import macelo.dev.campocerto.service.dto.ServiceRequestCreateRequest;
import macelo.dev.campocerto.service.dto.ServiceRequestResponse;
import macelo.dev.campocerto.service.dto.ServiceRequestStatusRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/service-requests")
public class ServiceRequestController {

    private final ServiceRequestService service;

    public ServiceRequestController(ServiceRequestService service) {
        this.service = service;
    }

    @PostMapping
    @PreAuthorize("hasRole('FARMER')")
    public ResponseEntity<ServiceRequestResponse> create(@AuthenticationPrincipal Jwt jwt,
                                                         @Valid @RequestBody ServiceRequestCreateRequest request) {
        ServiceRequestResponse created = service.create(userId(jwt), request);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.id())
                .toUri();
        return ResponseEntity.created(location).body(created);
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('FARMER')")
    public PageResponse<ServiceRequestResponse> mine(@AuthenticationPrincipal Jwt jwt,
                                                     @RequestParam(required = false) ServiceRequestStatus status,
                                                     @RequestParam(defaultValue = "0") int page,
                                                     @RequestParam(defaultValue = "10") int size) {
        return service.listMine(userId(jwt), status, page, size);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('FARMER', 'PROVIDER')")
    public ServiceRequestResponse get(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id) {
        return service.get(userId(jwt), id);
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('FARMER', 'PROVIDER')")
    public ServiceRequestResponse changeStatus(@AuthenticationPrincipal Jwt jwt,
                                               @PathVariable Long id,
                                               @Valid @RequestBody ServiceRequestStatusRequest body) {
        return service.changeStatus(userId(jwt), id, body.status());
    }

    private static Long userId(Jwt jwt) {
        return Long.valueOf(jwt.getSubject());
    }
}