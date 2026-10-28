package macelo.dev.campocerto.admin.dto;

import jakarta.validation.constraints.NotNull;
import macelo.dev.campocerto.user.dto.UserStatus;

public record UserStatusRequest(

        @NotNull(message = "Informe o novo status")
        UserStatus status
) {
}
