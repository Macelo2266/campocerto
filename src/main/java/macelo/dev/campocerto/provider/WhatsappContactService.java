package macelo.dev.campocerto.provider;

import macelo.dev.campocerto.category.Category;
import macelo.dev.campocerto.common.exception.ApiException;
import macelo.dev.campocerto.common.util.WhatsappLinkBuilder;
import macelo.dev.campocerto.provider.dto.WhatsappLinkResponse;
import macelo.dev.campocerto.user.dto.UserStatus;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class WhatsappContactService {

    private final ProviderProfileRepository providerRepository;

    public WhatsappContactService(ProviderProfileRepository providerRepository) {
        this.providerRepository = providerRepository;
    }

    @Transactional(readOnly = true)
    public WhatsappLinkResponse buildLink(Long providerId, Long categoryId) {
        ProviderProfile provider = providerRepository.findById(providerId)
                .filter(found -> found.getUser().getStatus() == UserStatus.ACTIVE)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Prestador não encontrado"));

        if (!provider.isAvailable()) {
            throw new ApiException(HttpStatus.CONFLICT, "Este prestador não está disponível no momento");
        }

        String greeting = "Olá, " + provider.getProfessionalName()
                + "! Vi seu perfil no CampoCerto e gostaria de pedir um orçamento";

        String message;
        if (categoryId == null) {
            message = greeting + ".";
        } else {
            Category category = provider.getOfferings().stream()
                    .map(ProviderOffering::getCategory)
                    .filter(candidate -> candidate.getId().equals(categoryId))
                    .findFirst()
                    .orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST,
                            "Este prestador não oferece o serviço selecionado"));
            message = greeting + " para o serviço: " + category.getName() + ".";
        }

        return new WhatsappLinkResponse(
                WhatsappLinkBuilder.url(provider.getWhatsapp(), message),
                message
        );
    }
}