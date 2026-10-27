package macelo.dev.campocerto.service.dto;

import macelo.dev.campocerto.service.RequestActor;
import macelo.dev.campocerto.service.ServiceRequest;
import macelo.dev.campocerto.service.ServiceRequestStatus;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

public record ServiceRequestResponse(
        Long id,
        ServiceRequestStatus status,
        String statusLabel,
        CategoryInfo category,
        String description,
        String city,
        LocalDate desiredDate,
        String additionalInfo,
        ProviderInfo provider,
        RequesterInfo requester,
        List<ServiceRequestStatus> availableTransitions,
        Instant createdAt,
        Instant updatedAt
) {

    public record CategoryInfo(Long id, String name) {
    }

    public record ProviderInfo(Long id, String professionalName) {
    }

    public record RequesterInfo(String name, String phone) {
    }

    /**
     * @param viewer quem está olhando. Define o que aparece (dados do agricultor só para o prestador)
     *               e quais ações estão disponíveis.
     */
    public static ServiceRequestResponse from(ServiceRequest request, RequestActor viewer) {
        ServiceRequestStatus status = request.getStatus();

        List<ServiceRequestStatus> transitions = status.nextStatuses().stream()
                .filter(target -> status.canBeDoneBy(target, viewer))
                .toList();

        RequesterInfo requester = viewer == RequestActor.PROVIDER
                ? new RequesterInfo(request.getRequester().getName(), request.getRequester().getPhone())
                : null;

        return new ServiceRequestResponse(
                request.getId(),
                status,
                status.getLabel(),
                new CategoryInfo(request.getCategory().getId(), request.getCategory().getName()),
                request.getDescription(),
                request.getCity(),
                request.getDesiredDate(),
                request.getAdditionalInfo(),
                new ProviderInfo(request.getProvider().getId(), request.getProvider().getProfessionalName()),
                requester,
                transitions,
                request.getCreatedAt(),
                request.getUpdatedAt()
        );
    }
}