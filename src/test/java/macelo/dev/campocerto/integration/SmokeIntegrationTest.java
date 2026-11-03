package macelo.dev.campocerto.integration;
;

import macelo.dev.campocerto.support.Api.Response;
import macelo.dev.campocerto.support.IntegrationTest;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class SmokeIntegrationTest extends IntegrationTest {

    @Test
    void aplicacaoSobeContraUmPostgresDeVerdade() {
        String version = jdbc.queryForObject("SHOW server_version", String.class);

        assertThat(version).startsWith("17");
    }

    @Test
    void todasAsMigrationsForamAplicadasComSucesso() {
        Long failed = jdbc.queryForObject("SELECT count(*) FROM flyway_schema_history WHERE success = false", Long.class);
        Long applied = jdbc.queryForObject("SELECT count(*) FROM flyway_schema_history", Long.class);

        assertThat(failed).isZero();
        assertThat(applied).isGreaterThanOrEqualTo(5);
    }

    @Test
    void asDezCategoriasIniciaisExistem() {
        Long total = jdbc.queryForObject("SELECT count(*) FROM categories", Long.class);

        assertThat(total).isEqualTo(10);
    }

    @Test
    void endpointPublicoDeCategoriasResponde() {
        Response res = api.get("/api/categories");

        assertThat(res.status()).isEqualTo(200);
        assertThat(res.list("$")).hasSize(10);
    }
}