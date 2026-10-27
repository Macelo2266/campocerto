package macelo.dev.campocerto.provider.dto;

import br.com.campocerto.common.validation.BrazilianMobile;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record ProviderProfileRequest(

        @NotBlank(message = "Informe seu nome profissional")
        @Size(max = 120, message = "O nome profissional deve ter no máximo 120 caracteres")
        String professionalName,

        @Size(max = 1000, message = "A descrição deve ter no máximo 1000 caracteres")
        String description,

        @NotBlank(message = "Informe seu WhatsApp")
        @BrazilianMobile
        String whatsapp,

        @NotBlank(message = "Informe sua cidade")
        @Size(max = 100, message = "A cidade deve ter no máximo 100 caracteres")
        String city,

        @Size(max = 30, message = "Informe no máximo 30 cidades atendidas")
        List<@NotBlank(message = "Cidade atendida não pode ficar em branco")
        @Size(max = 100, message = "Cada cidade deve ter no máximo 100 caracteres") String> serviceAreas,

        @NotEmpty(message = "Selecione pelo menos um serviço")
        @Size(max = 20, message = "Selecione no máximo 20 serviços")
        List<@Valid OfferingRequest> offerings,

        @NotNull(message = "Informe a disponibilidade")
        Boolean available
) {

    public record OfferingRequest(

            @NotNull(message = "Informe a categoria do serviço")
            Long categoryId,

            @Size(max = 100, message = "O preço deve ter no máximo 100 caracteres")
            String priceInfo
    ) {
    }
}
