package macelo.dev.campocerto.service;


import static org.hibernate.validator.internal.util.Contracts.assertTrue;

class ServiceRequestStatusTest {

    @ParameterizedTest(name = "{2} pode ir de {0} para {1}")
    @CsvSource({
            "PENDENTE,      EM_NEGOCIACAO, PROVIDER",
            "PENDENTE,      CANCELADA,     REQUESTER",
            "PENDENTE,      CANCELADA,     PROVIDER",
            "EM_NEGOCIACAO, ACEITA,        PROVIDER",
            "EM_NEGOCIACAO, CANCELADA,     REQUESTER",
            "ACEITA,        EM_ANDAMENTO,  PROVIDER",
            "ACEITA,        CANCELADA,     PROVIDER",
            "EM_ANDAMENTO,  CONCLUIDA,     PROVIDER",
            "EM_ANDAMENTO,  CANCELADA,     REQUESTER"
    })
    void permiteTransicoesValidas(ServiceRequestStatus from, ServiceRequestStatus to, RequestActor actor) {
        assertTrue(from.canTransitionTo(to));
        assertTrue(from.canBeDoneBy(to, actor));
    }

    @ParameterizedTest(name = "{1} nao pode ser feito por {2} a partir de {0}")
    @CsvSource({
            "PENDENTE,      EM_NEGOCIACAO, REQUESTER",
            "EM_NEGOCIACAO, ACEITA,        REQUESTER",
            "ACEITA,        EM_ANDAMENTO,  REQUESTER",
            "EM_ANDAMENTO,  CONCLUIDA,     REQUESTER"
    })
    void recusaQuandoOAtorNaoTemPermissao(ServiceRequestStatus from, ServiceRequestStatus to, RequestActor actor) {
        assertTrue(from.canTransitionTo(to), "a transição existe...");
        assertFalse(from.canBeDoneBy(to, actor), "...mas este ator não pode fazê-la");
    }

    @ParameterizedTest(name = "{0} nao pode ir para {1}")
    @CsvSource({
            "PENDENTE,      ACEITA",
            "PENDENTE,      EM_ANDAMENTO",
            "PENDENTE,      CONCLUIDA",
            "PENDENTE,      PENDENTE",
            "EM_NEGOCIACAO, PENDENTE",
            "ACEITA,        EM_NEGOCIACAO",
            "EM_ANDAMENTO,  ACEITA",
            "CONCLUIDA,     CANCELADA",
            "CONCLUIDA,     EM_ANDAMENTO",
            "CANCELADA,     PENDENTE",
            "CANCELADA,     CONCLUIDA"
    })
    void recusaTransicoesInexistentes(ServiceRequestStatus from, ServiceRequestStatus to) {
        assertFalse(from.canTransitionTo(to));
    }

    @Test
    void estadosFinaisNaoTemSaida() {
        for (ServiceRequestStatus status : ServiceRequestStatus.values()) {
            if (status.isFinal()) {
                assertTrue(status.nextStatuses().isEmpty());
            }
        }
        assertTrue(ServiceRequestStatus.CONCLUIDA.isFinal());
        assertTrue(ServiceRequestStatus.CANCELADA.isFinal());
        assertFalse(ServiceRequestStatus.PENDENTE.isFinal());
    }

    @Test
    void estadosEmAbertoSaoOsQueNaoSaoFinais() {
        assertEquals(4, ServiceRequestStatus.openStatuses().size());
        assertFalse(ServiceRequestStatus.openStatuses().contains(ServiceRequestStatus.CONCLUIDA));
        assertFalse(ServiceRequestStatus.openStatuses().contains(ServiceRequestStatus.CANCELADA));
    }
}