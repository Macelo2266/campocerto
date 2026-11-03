package macelo.dev.campocerto.support;


import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.context.annotation.Bean;
import org.testcontainers.containers.JdbcDatabaseContainer;
import org.testcontainers.postgresql.PostgreSQLContainer;

@TestConfiguration(proxyBeanMethods = false)
public class TestcontainersConfiguration {

    // Mesma imagem do docker-compose.yml: teste com o que roda de verdade (collation e lower() iguais)
    @Bean
    @ServiceConnection
    JdbcDatabaseContainer<?> postgresContainer() {
        return new PostgreSQLContainer("postgres:17");
    }
}