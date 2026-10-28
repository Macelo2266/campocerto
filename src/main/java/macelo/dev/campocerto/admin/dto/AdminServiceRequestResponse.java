package macelo.dev.campocerto.admin.dto;

import macelo.dev.campocerto.service.ServiceRequest;
import macelo.dev.campocerto.service.ServiceRequestStatus;

import java.time.Instant;
import java.time.LocalDate;

public record AdminServiceRequestResponse(
        Long id,
        ServiceRequestStatus status,
        String statusLabel,
        String categoryName,
        String description,
        String city,
        LocalDate desiredDate,
        Long requesterId,
        String requesterName,
        Long providerId,
        String providerName,
        Instant createdAt,
        Instant updatedAt
) {

    public static AdminServiceRequestResponse from(ServiceRequest request) {
        return new AdminServiceRequestResponse(
                request.getId(),
                request.getStatus(),
                request.getStatus().getLabel(),
                request.getCategory().getName(),
                request.getDescription(),
                request.getCity(),
                request.getDesiredDate(),
                request.getRequester().getId(),
                request.getRequester().getName(),
                request.getProvider().getId(),
                request.getProvider().getProfessionalName(),
                request.getCreatedAt(),
                request.getUpdatedAt()
        );
    }
}