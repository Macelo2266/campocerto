package macelo.dev.campocerto.admin.dto;

import jakarta.validation.constraints.NotNull;
import macelo.dev.campocerto.review.ReviewStatus;

public record ReviewStatusRequest(

        @NotNull(message = "Informe o novo status")
        ReviewStatus status
) {
}