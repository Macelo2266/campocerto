package macelo.dev.campocerto.integration;

import macelo.dev.campocerto.service.ServiceRequestRepository;
import org.apache.catalina.connector.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ServiceRequestIntegrationTest extends IntegrationTest {

    private static final String INSERT_OPEN_REQUEST = """
            INSERT INTO service_requests (requester_id, provider_id, category_id, description, city, status)
            VALUES (?, ?, ?, 'descricao qualquer com mais de dez letras', 'Patos', 'PENDENTE')
            """;

    @Autowired
    private ServiceRequestRepository requestRepository;

    @Autowired
    private PlatformTransactionManager transactionManager;

    private Account farmer;
    private Account provider;
    private long providerId;
    private long fencing;
    private long repair;

    @BeforeEach
    void cenario() {
        farmer = newFarmer("joao");
        provider = newProvider("ze");
        fencing = categoryId("construcao-de-cercas");
        repair = categoryId("conserto-de-cercas");
        providerId = createProfile(provider, "Zé das Cercas", "Itaporanga", List.of("Patos"), fencing, repair);
    }

    private Response post(Account who, String json) {
        return api.postAs(who.token(), "/api/service-requests", json);
    }

    // ---------- criação ----------

    @Test
    void agricultorCriaSolicitacaoPendenteEOPrestadorVeOsDadosDele() {
        long id = createRequest(farmer, providerId, fencing);

        Response asFarmer = api.getAs(farmer.token(), "/api/service-requests/%d".formatted(id));
        assertThat(asFarmer.text("$.status")).isEqualTo("PENDENTE");
        assertThat(asFarmer.list("$.availableTransitions")).containsExactly("CANCELADA");
        assertThat(asFarmer.json("$.requester")).isNull(); // o agricultor já sabe quem é

        Response asProvider = api.getAs(provider.token(), "/api/service-requests/%d".formatted(id));
        assertThat(asProvider.text("$.requester.name")).isEqualTo("Agricultor joao");
        assertThat(asProvider.text("$.requester.phone")).isEqualTo("83999990000");
        assertThat(asProvider.list("$.availableTransitions")).containsExactly("EM_NEGOCIACAO", "CANCELADA");
    }

    @Test
    void prestadorNaoPodeSolicitarOrcamento() {
        Response res = post(provider, requestJson(providerId, fencing, "Preciso de uma cerca nova", "Patos", null));

        assertThat(res.status()).isEqualTo(403);
    }

    @Test
    void descricaoCurtaEhRecusada() {
        Response res = post(farmer, requestJson(providerId, fencing, "curta", "Patos", null));

        assertThat(res.status()).isEqualTo(400);
    }

    @Test
    void dataNoPassadoEhRecusada() {
        Response res = post(farmer, requestJson(providerId, fencing, "Preciso de uma cerca nova",
                "Patos", LocalDate.now().minusDays(2)));

        assertThat(res.status()).isEqualTo(400);
    }

    @Test
    void servicoQueOPrestadorNaoOfereceEhRecusado() {
        long clearing = categoryId("rocagem-e-limpeza");

        Response res = post(farmer, requestJson(providerId, clearing, "Preciso de roçagem no pasto", "Patos", null));

        assertThat(res.status()).isEqualTo(400);
    }

    @Test
    void prestadorIndisponivelNaoRecebePedidos() {
        api.putAs(provider.token(), "/api/providers/profile",
                profileJson("Zé das Cercas", "Itaporanga", List.of(), false, fencing));

        Response res = post(farmer, requestJson(providerId, fencing, "Preciso de uma cerca nova", "Patos", null));

        assertThat(res.status()).isEqualTo(409);
    }

    @Test
    void solicitacaoEmAbertoDuplicadaEhRecusadaMasDepoisDeCancelarPodeRepetir() {
        long id = createRequest(farmer, providerId, fencing);

        Response duplicate = post(farmer, requestJson(providerId, fencing, "Preciso de uma cerca nova", "Patos", null));
        assertThat(duplicate.status()).isEqualTo(409);

        assertThat(changeStatus(farmer, id, "CANCELADA").status()).isEqualTo(200);

        Response again = post(farmer, requestJson(providerId, fencing, "Preciso de uma cerca nova", "Patos", null));
        assertThat(again.status()).isEqualTo(201);
    }

    @Test
    void agricultorTemLimiteDePedidosPendentes() {
        for (int i = 1; i <= 10; i++) {
            long otherProvider = createProfile(newProvider("lim" + i), "Prestador Limite " + i, "Patos",
                    List.of(), fencing);
            createRequest(farmer, otherProvider, fencing);
        }
        long eleventh = createProfile(newProvider("lim11"), "Prestador Limite 11", "Patos", List.of(), fencing);

        Response res = post(farmer, requestJson(eleventh, fencing, "Preciso de uma cerca nova", "Patos", null));

        assertThat(res.status()).isEqualTo(429);
    }

    // ---------- máquina de estados ----------

    @Test
    void cicloCompletoRespeitaQuemPodeCadaPasso() {
        long id = createRequest(farmer, providerId, fencing);

        // o agricultor não pode "iniciar negociação"; pular etapas também não
        assertThat(changeStatus(farmer, id, "EM_NEGOCIACAO").status()).isEqualTo(403);
        assertThat(changeStatus(provider, id, "CONCLUIDA").status()).isEqualTo(409);
        assertThat(statusInDatabase(id)).isEqualTo("PENDENTE"); // nenhuma das tentativas alterou nada

        Response negotiating = changeStatus(provider, id, "EM_NEGOCIACAO");
        assertThat(negotiating.status()).isEqualTo(200);
        assertThat(negotiating.list("$.availableTransitions")).containsExactly("ACEITA", "CANCELADA");

        assertThat(changeStatus(provider, id, "ACEITA").status()).isEqualTo(200);
        assertThat(changeStatus(provider, id, "EM_ANDAMENTO").status()).isEqualTo(200);

        Response done = changeStatus(provider, id, "CONCLUIDA");
        assertThat(done.status()).isEqualTo(200);
        assertThat(done.list("$.availableTransitions")).isEmpty();

        // estado final: ninguém muda mais
        assertThat(changeStatus(provider, id, "CANCELADA").status()).isEqualTo(409);
        assertThat(changeStatus(farmer, id, "CANCELADA").status()).isEqualTo(409);
        assertThat(statusInDatabase(id)).isEqualTo("CONCLUIDA");
    }

    @Test
    void ambosPodemCancelarEmQualquerEtapaAberta() {
        long first = createRequest(farmer, providerId, fencing);
        assertThat(changeStatus(farmer, first, "CANCELADA").status()).isEqualTo(200);

        long second = createRequest(farmer, providerId, repair);
        changeStatus(provider, second, "EM_NEGOCIACAO");
        changeStatus(provider, second, "ACEITA");
        assertThat(changeStatus(provider, second, "CANCELADA").status()).isEqualTo(200);
    }

    // ---------- isolamento entre usuários (IDOR) ----------

    @Test
    void estranhosNaoEnxergamNemAlteramAsolicitacaoDeOutraPessoa() {
        long id = createRequest(farmer, providerId, fencing);
        Account otherFarmer = newFarmer("outro");
        Account otherProvider = newProvider("outro");

        for (Account stranger : List.of(otherFarmer, otherProvider)) {
            Response read = api.getAs(stranger.token(), "/api/service-requests/%d".formatted(id));
            Response write = changeStatus(stranger, id, "CANCELADA");

            // 404, e não 403: não revelamos nem que a solicitação existe
            assertThat(read.status()).as("leitura por %s", stranger.email()).isEqualTo(404);
            assertThat(write.status()).as("alteração por %s", stranger.email()).isEqualTo(404);
        }
        assertThat(statusInDatabase(id)).isEqualTo("PENDENTE");
    }

    @Test
    void listasMostramSoOQueEDaPropriaPessoa() {
        createRequest(farmer, providerId, fencing);
        Account otherFarmer = newFarmer("outro");
        Account otherProvider = newProvider("outro");

        assertThat(api.getAs(farmer.token(), "/api/service-requests/me").number("$.totalElements")).isEqualTo(1);
        assertThat(api.getAs(provider.token(), "/api/providers/me/service-requests").number("$.totalElements"))
                .isEqualTo(1);

        assertThat(api.getAs(otherFarmer.token(), "/api/service-requests/me").number("$.totalElements")).isZero();
        assertThat(api.getAs(otherProvider.token(), "/api/providers/me/service-requests").number("$.totalElements"))
                .isZero();
    }

    // ---------- o banco como última barreira ----------

    @Test
    void indiceUnicoParcialDoBancoBarraDuplicataMesmoSemPassarPeloServico() {
        long id = createRequest(farmer, providerId, fencing);

        // direto no banco, pulando todas as regras do Java
        assertThatThrownBy(() -> jdbc.update(INSERT_OPEN_REQUEST, farmer.id(), providerId, fencing))
                .isInstanceOf(DataIntegrityViolationException.class);

        // a unicidade só vale para pedidos EM ABERTO: depois de cancelar, o banco aceita
        changeStatus(farmer, id, "CANCELADA");
        assertThat(jdbc.update(INSERT_OPEN_REQUEST, farmer.id(), providerId, fencing)).isEqualTo(1);
    }

    @Test
    void bancoRecusaSituacaoQueNaoExiste() {
        assertThatThrownBy(() -> jdbc.update("""
                INSERT INTO service_requests (requester_id, provider_id, category_id, description, city, status)
                VALUES (?, ?, ?, 'descricao qualquer com mais de dez letras', 'Patos', 'BANANA')
                """, farmer.id(), providerId, fencing))
                .isInstanceOf(DataIntegrityViolationException.class);
    }

    @Test
    void bloqueioOtimistaImpedeSobrescreverUmaMudancaFeitaPorOutraPessoa() {
        long id = createRequest(farmer, providerId, fencing);
        TransactionTemplate tx = new TransactionTemplate(transactionManager);

        // duas pessoas abrem a MESMA solicitação (as duas leem a versão 0)
        ServiceRequest openedByProvider = tx.execute(s -> requestRepository.findWithDetailsById(id).orElseThrow());
        ServiceRequest openedByFarmer = tx.execute(s -> requestRepository.findWithDetailsById(id).orElseThrow());

        // o prestador grava primeiro
        openedByProvider.changeStatus(ServiceRequestStatus.EM_NEGOCIACAO, RequestActor.PROVIDER);
        tx.execute(s -> requestRepository.saveAndFlush(openedByProvider));

        // o agricultor ainda está com a versão antiga: a gravação dele precisa FALHAR
        openedByFarmer.changeStatus(ServiceRequestStatus.CANCELADA, RequestActor.REQUESTER);
        assertThatThrownBy(() -> tx.execute(s -> requestRepository.saveAndFlush(openedByFarmer)))
                .isInstanceOf(OptimisticLockingFailureException.class);

        // ...e a mudança do prestador não foi perdida
        assertThat(statusInDatabase(id)).isEqualTo("EM_NEGOCIACAO");
    }

    private String statusInDatabase(long id) {
        return jdbc.queryForObject("SELECT status FROM service_requests WHERE id = ?", String.class, id);
    }
}