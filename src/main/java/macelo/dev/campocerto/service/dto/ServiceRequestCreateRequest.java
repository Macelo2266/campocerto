package macelo.dev.campocerto.service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record ServiceRequestCreateRequest(

        @NotNull(message = "Informe o prestador")
        Long providerId,

        @NotNull(message = "Informe o serviço desejado")
        Long categoryId,

        @NotBlank(message = "Descreva o trabalho que precisa ser feito")
        @Size(max = 2000, message = "A descrição deve ter no máximo 2000 caracteres")
        String description,

        @NotBlank(message = "Informe o município ou a região da propriedade")
        @Size(max = 100, message = "O município deve ter no máximo 100 caracteres")
        String city,

        LocalDate desiredDate,

        @Size(max = 1000, message = "As informações adicionais devem ter no máximo 1000 caracteres")
        String additionalInfo
) {
}