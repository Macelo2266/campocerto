package macelo.dev.campocerto.integration;

import org.apache.catalina.connector.Response;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.http.HttpMethod;

import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

/**
 * Para cada endpoint: o que cada tipo de visitante recebe.
 *  - EXIGE_LOGIN: 401 (o servidor não sabe quem é)
 *  - PROIBIDO:    403 (sabe quem é, mas não pode)
 *  - PERMITIDO:   passou pela segurança (qualquer status, menos 401 e 403: 404, 400, 201...)
 *
 * Os corpos são VÁLIDOS de propósito. Com um corpo inválido, a validação (400) acontece ANTES
 * do @PreAuthorize e esconderia o 403 (veja o Desafio 3).
 */
class AuthorizationMatrixIntegrationTest extends IntegrationTest {

    enum Acesso { EXIGE_LOGIN, PROIBIDO, PERMITIDO }

    record Endpoint(HttpMethod method, String url, String body,
                    Acesso anonimo, Acesso agricultor, Acesso prestador, Acesso admin) {
        @Override
        public String toString() {
            return method + " " + url;
        }
    }

    private static final String PERFIL = """
            {"professionalName":"Prestador da matriz","description":"x","whatsapp":"(83) 99999-0000",
             "city":"Patos","serviceAreas":[],"offerings":[{"categoryId":1,"priceInfo":null}],"available":true}""";
    private static final String PEDIDO = """
            {"providerId":999999,"categoryId":1,"description":"Preciso de 300 metros de cerca","city":"Patos"}""";
    private static final String STATUS_PEDIDO = "{\"status\":\"CANCELADA\"}";
    private static final String AVALIACAO = "{\"rating\":5}";
    private static final String CATEGORIA = "{\"name\":\"Categoria da matriz\"}";
    private static final String SUSPENDER = "{\"status\":\"SUSPENDED\"}";
    private static final String OCULTAR = "{\"status\":\"HIDDEN\"}";

    static Stream<Endpoint> endpoints() {
        return Stream.of(
                // públicos
                publico(HttpMethod.GET, "/api/categories"),
                publico(HttpMethod.GET, "/api/providers"),
                publico(HttpMethod.GET, "/api/providers/cities"),
                publico(HttpMethod.GET, "/api/providers/999999"),
                publico(HttpMethod.GET, "/api/providers/999999/reviews"),

                // qualquer pessoa logada
                qualquerLogado(HttpMethod.GET, "/api/users/me"),
                // rota que não existe: o visitante sem login nem fica sabendo (negar por padrão)
                qualquerLogado(HttpMethod.GET, "/api/rota-que-nao-existe"),

                // só agricultor
                soAgricultor(HttpMethod.GET, "/api/providers/999999/whatsapp", null),
                soAgricultor(HttpMethod.POST, "/api/service-requests", PEDIDO),
                soAgricultor(HttpMethod.GET, "/api/service-requests/me", null),
                soAgricultor(HttpMethod.POST, "/api/service-requests/999999/reviews", AVALIACAO),

                // agricultor ou prestador (participantes de uma solicitação)
                agricultorOuPrestador(HttpMethod.GET, "/api/service-requests/999999", null),
                agricultorOuPrestador(HttpMethod.PATCH, "/api/service-requests/999999/status", STATUS_PEDIDO),
                agricultorOuPrestador(HttpMethod.GET, "/api/service-requests/999999/review", null),

                // só prestador
                soPrestador(HttpMethod.GET, "/api/providers/me", null),
                soPrestador(HttpMethod.POST, "/api/providers/profile", PERFIL),
                soPrestador(HttpMethod.PUT, "/api/providers/profile", PERFIL),
                soPrestador(HttpMethod.GET, "/api/providers/me/service-requests", null),

                // só administrador
                soAdmin(HttpMethod.GET, "/api/admin/users", null),
                soAdmin(HttpMethod.PATCH, "/api/admin/users/999999/status", SUSPENDER),
                soAdmin(HttpMethod.GET, "/api/admin/stats", null),
                soAdmin(HttpMethod.GET, "/api/admin/reviews", null),
                soAdmin(HttpMethod.PATCH, "/api/admin/reviews/999999/status", OCULTAR),
                soAdmin(HttpMethod.GET, "/api/admin/service-requests", null),
                soAdmin(HttpMethod.GET, "/api/admin/categories", null),
                soAdmin(HttpMethod.POST, "/api/admin/categories", CATEGORIA),
                soAdmin(HttpMethod.PUT, "/api/admin/categories/999999", CATEGORIA),
                soAdmin(HttpMethod.DELETE, "/api/admin/categories/999999", null),
                soAdmin(HttpMethod.PATCH, "/api/admin/categories/999999/reactivate", null)
        );
    }

    @ParameterizedTest(name = "{0}")
    @MethodSource("endpoints")
    void respeitaAMatrizDePermissoes(Endpoint endpoint) {
        String farmer = newFarmer("matriz").token();
        String provider = newProvider("matriz").token();
        String admin = newAdmin().token();

        // assertAll executa os quatro e mostra TODAS as falhas juntas (não só a primeira)
        assertAll(
                () -> verificar("anônimo", endpoint, null, endpoint.anonimo()),
                () -> verificar("agricultor", endpoint, farmer, endpoint.agricultor()),
                () -> verificar("prestador", endpoint, provider, endpoint.prestador()),
                () -> verificar("admin", endpoint, admin, endpoint.admin())
        );
    }

    private void verificar(String quem, Endpoint endpoint, String token, Acesso esperado) {
        Response res = api.call(endpoint.method(), token, endpoint.url(), endpoint.body());
        String contexto = "%s em %s -> %d: %s".formatted(quem, endpoint, res.status(), res.body());

        switch (esperado) {
            case EXIGE_LOGIN -> assertThat(res.status()).as("%s", contexto).isEqualTo(401);
            case PROIBIDO -> assertThat(res.status()).as("%s", contexto).isEqualTo(403);
            case PERMITIDO -> assertThat(res.status()).as("%s", contexto).isNotIn(401, 403);
        }
    }

    private static Endpoint publico(HttpMethod method, String url) {
        return new Endpoint(method, url, null,
                Acesso.PERMITIDO, Acesso.PERMITIDO, Acesso.PERMITIDO, Acesso.PERMITIDO);
    }

    private static Endpoint qualquerLogado(HttpMethod method, String url) {
        return new Endpoint(method, url, null,
                Acesso.EXIGE_LOGIN, Acesso.PERMITIDO, Acesso.PERMITIDO, Acesso.PERMITIDO);
    }

    private static Endpoint soAgricultor(HttpMethod method, String url, String body) {
        return new Endpoint(method, url, body,
                Acesso.EXIGE_LOGIN, Acesso.PERMITIDO, Acesso.PROIBIDO, Acesso.PROIBIDO);
    }

    private static Endpoint agricultorOuPrestador(HttpMethod method, String url, String body) {
        return new Endpoint(method, url, body,
                Acesso.EXIGE_LOGIN, Acesso.PERMITIDO, Acesso.PERMITIDO, Acesso.PROIBIDO);
    }

    private static Endpoint soPrestador(HttpMethod method, String url, String body) {
        return new Endpoint(method, url, body,
                Acesso.EXIGE_LOGIN, Acesso.PROIBIDO, Acesso.PERMITIDO, Acesso.PROIBIDO);
    }

    private static Endpoint soAdmin(HttpMethod method, String url, String body) {
        return new Endpoint(method, url, body,
                Acesso.EXIGE_LOGIN, Acesso.PROIBIDO, Acesso.PROIBIDO, Acesso.PERMITIDO);
    }
}