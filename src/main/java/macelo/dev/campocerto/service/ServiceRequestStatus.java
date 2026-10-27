package macelo.dev.campocerto.service;

import java.util.Collections;
import java.util.EnumMap;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static macelo.dev.campocerto.service.RequestActor.PROVIDER;
import static macelo.dev.campocerto.service.RequestActor.REQUESTER;

public enum ServiceRequestStatus {

    PENDENTE("Pendente"),
    EM_NEGOCIACAO("Em negociação"),
    ACEITA("Aceita"),
    EM_ANDAMENTO("Em andamento"),
    CONCLUIDA("Concluída"),
    CANCELADA("Cancelada");

    // Para cada status de origem: quais destinos são possíveis e QUEM pode ir até lá.
    private static final Map<ServiceRequestStatus, Map<ServiceRequestStatus, Set<RequestActor>>> RULES =
            new EnumMap<>(ServiceRequestStatus.class);

    static {
        allow(PENDENTE, EM_NEGOCIACAO, PROVIDER);
        allow(PENDENTE, CANCELADA, REQUESTER, PROVIDER);

        allow(EM_NEGOCIACAO, ACEITA, PROVIDER);
        allow(EM_NEGOCIACAO, CANCELADA, REQUESTER, PROVIDER);

        allow(ACEITA, EM_ANDAMENTO, PROVIDER);
        allow(ACEITA, CANCELADA, REQUESTER, PROVIDER);

        allow(EM_ANDAMENTO, CONCLUIDA, PROVIDER);
        allow(EM_ANDAMENTO, CANCELADA, REQUESTER, PROVIDER);
    }

    private final String label;

    ServiceRequestStatus(String label) {
        this.label = label;
    }

    private static void allow(ServiceRequestStatus from, ServiceRequestStatus to, RequestActor... actors) {
        RULES.computeIfAbsent(from, key -> new EnumMap<>(ServiceRequestStatus.class))
                .put(to, EnumSet.copyOf(List.of(actors)));
    }

    public String getLabel() {
        return label;
    }

    public boolean canTransitionTo(ServiceRequestStatus target) {
        return RULES.getOrDefault(this, Map.of()).containsKey(target);
    }

    public boolean canBeDoneBy(ServiceRequestStatus target, RequestActor actor) {
        return RULES.getOrDefault(this, Map.of()).getOrDefault(target, Set.of()).contains(actor);
    }

    public Set<ServiceRequestStatus> nextStatuses() {
        Map<ServiceRequestStatus, Set<RequestActor>> transitions = RULES.get(this);
        return transitions == null ? Set.of() : Collections.unmodifiableSet(transitions.keySet());
    }

    // Estado final = não tem para onde ir. Derivado da tabela, sem lista duplicada.
    public boolean isFinal() {
        return nextStatuses().isEmpty();
    }

    public static Set<ServiceRequestStatus> openStatuses() {
        Set<ServiceRequestStatus> open = EnumSet.noneOf(ServiceRequestStatus.class);
        for (ServiceRequestStatus status : values()) {
            if (!status.isFinal()) {
                open.add(status);
            }
        }
        return open;
    }
}