package macelo.dev.campocerto.service.dto;

import jakarta.validation.constraints.NotNull;
import macelo.dev.campocerto.service.ServiceRequestStatus;

public record ServiceRequestStatusRequest(

        @NotNull(message = "Informe o novo status")
        ServiceRequestStatus status
) {
}
