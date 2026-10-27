package macelo.dev.campocerto.provider;

import jakarta.validation.Valid;
import macelo.dev.campocerto.provider.dto.ProviderProfileRequest;
import macelo.dev.campocerto.provider.dto.ProviderProfileResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/providers")
@PreAuthorize("hasRole('PROVIDER')")
public class ProviderProfileController {

    private final ProviderProfileService profileService;

    public ProviderProfileController(ProviderProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping("/profile")
    public ResponseEntity<ProviderProfileResponse> create(@AuthenticationPrincipal Jwt jwt,
                                                          @Valid @RequestBody ProviderProfileRequest request) {
        ProviderProfileResponse created = profileService.create(userId(jwt), request);
        URI location = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/providers/me")
                .build()
                .toUri();
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/profile")
    public ProviderProfileResponse update(@AuthenticationPrincipal Jwt jwt,
                                          @Valid @RequestBody ProviderProfileRequest request) {
        return profileService.update(userId(jwt), request);
    }

    @GetMapping("/me")
    public ProviderProfileResponse me(@AuthenticationPrincipal Jwt jwt) {
        return profileService.getMine(userId(jwt));
    }

    private static Long userId(Jwt jwt) {
        return Long.valueOf(jwt.getSubject());
    }
}
