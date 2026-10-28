package macelo.dev.campocerto.provider;

import macelo.dev.campocerto.provider.dto.WhatsappLinkResponse;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProviderContactController {

    private final WhatsappContactService contactService;

    public ProviderContactController(WhatsappContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping("/api/providers/{id}/whatsapp")
    @PreAuthorize("hasRole('FARMER')")
    public WhatsappLinkResponse whatsapp(@PathVariable Long id,
                                         @RequestParam(required = false) Long categoryId) {
        return contactService.buildLink(id, categoryId);
    }
}