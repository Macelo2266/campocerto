package macelo.dev.campocerto.support;


import macelo.dev.campocerto.category.CategoryRepository;
import macelo.dev.campocerto.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.context.annotation.Import;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Base de todos os testes de integração: aplicação inteira + PostgreSQL de verdade.
 * Todas as classes herdam daqui, com a MESMA configuração, para o Spring reaproveitar o contexto.
 */
@Tag("integration")
@SpringBootTest
@AutoConfigureMockMvc
@Import(TestcontainersConfiguration.class)
@ActiveProfiles("test")
public abstract class IntegrationTest {

    public static final String PASSWORD = "senha12345";

    /** Uma conta de teste já criada e logada. */
    public record Account(long id, String email, String token) {
    }

    @Autowired
    private MockMvc mvc;

    @Autowired
    protected JdbcTemplate jdbc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    protected Api api;

    // Cada teste começa com o banco "zerado" (menos as categorias que a migration V2 cria)
    @BeforeEach
    protected void resetDatabase() {
        jdbc.execute("""
                TRUNCATE TABLE reviews, service_requests, provider_offerings, provider_service_areas,
                               provider_profiles, users
                RESTART IDENTITY CASCADE
                """);
        jdbc.update("DELETE FROM categories WHERE id > 10");
        jdbc.update("UPDATE categories SET active = TRUE");
        api = new Api(mvc);
    }

    // ---------- contas ----------

    protected String registerJson(String name, String email, String password, String role) {
        return """
                {"name":"%s","email":"%s","password":"%s","phone":"83999990000","role":"%s"}
                """.formatted(name, email, password, role);
    }

    protected Account register(UserRole role, String name, String email) {
        Response res = api.post("/api/auth/register", registerJson(name, email, PASSWORD, role.name()));
        assertThat(res.status()).as("cadastro de %s: %s", email, res.body()).isEqualTo(201);
        return new Account(res.number("$.user.id"), email, res.text("$.accessToken"));
    }

    protected Account newFarmer(String tag) {
        return register(UserRole.FARMER, "Agricultor " + tag, "agricultor." + tag + "@teste.com");
    }

    protected Account newProvider(String tag) {
        return register(UserRole.PROVIDER, "Prestador " + tag, "prestador." + tag + "@teste.com");
    }

    /** O admin não se cadastra pela API (de propósito): criamos direto, como o AdminBootstrap faz. */
    protected Account newAdmin() {
        User admin = userRepository.save(
                new User("Administrador", "admin@teste.com", passwordEncoder.encode(PASSWORD), null, UserRole.ADMIN));
        Response login = api.post("/api/auth/login", loginJson("admin@teste.com", PASSWORD));
        assertThat(login.status()).as("login do admin: %s", login.body()).isEqualTo(200);
        return new Account(admin.getId(), "admin@teste.com", login.text("$.accessToken"));
    }

    protected String loginJson(String email, String password) {
        return """
                {"email":"%s","password":"%s"}
                """.formatted(email, password);
    }

    protected void setUserStatus(long userId, String status) {
        jdbc.update("UPDATE users SET status = ? WHERE id = ?", status, userId);
    }

    protected void setUserRole(long userId, String role) {
        jdbc.update("UPDATE users SET role = ? WHERE id = ?", role, userId);
    }

    // ---------- prestadores ----------

    protected long categoryId(String slug) {
        return categoryRepository.findBySlug(slug).orElseThrow().getId();
    }

    protected String profileJson(String name, String city, List<String> areas, boolean available, long... categoryIds) {
        String offerings = Arrays.stream(categoryIds)
                .mapToObj(id -> "{\"categoryId\":%d,\"priceInfo\":\"R$ 10 por metro\"}".formatted(id))
                .collect(Collectors.joining(","));
        String areaList = areas.stream().map("\"%s\""::formatted).collect(Collectors.joining(","));

        return """
                {"professionalName":"%s","description":"Trabalho de qualidade","whatsapp":"(83) 99999-0000",
                 "city":"%s","serviceAreas":[%s],"offerings":[%s],"available":%s}
                """.formatted(name, city, areaList, offerings, available);
    }

    /** Cria o perfil e devolve o id do perfil. */
    protected long createProfile(Account provider, String name, String city, List<String> areas, long... categoryIds) {
        Response res = api.postAs(provider.token(), "/api/providers/profile",
                profileJson(name, city, areas, true, categoryIds));
        assertThat(res.status()).as("perfil de %s: %s", name, res.body()).isEqualTo(201);
        return res.number("$.id");
    }

    // ---------- solicitações ----------

    protected String requestJson(long providerId, long categoryId, String description, String city, LocalDate date) {
        String desiredDate = date == null ? "null" : "\"" + date + "\"";
        return """
                {"providerId":%d,"categoryId":%d,"description":"%s","city":"%s","desiredDate":%s}
                """.formatted(providerId, categoryId, description, city, desiredDate);
    }

    /** Cria uma solicitação válida e devolve o id dela. */
    protected long createRequest(Account farmer, long providerId, long categoryId) {
        Response res = api.postAs(farmer.token(), "/api/service-requests",
                requestJson(providerId, categoryId, "Preciso de 300 metros de cerca na divisa", "Itaporanga",
                        LocalDate.now().plusDays(7)));
        assertThat(res.status()).as("pedido de orçamento: %s", res.body()).isEqualTo(201);
        return res.number("$.id");
    }

    protected Response changeStatus(Account who, long requestId, String status) {
        return api.patchAs(who.token(), "/api/service-requests/%d/status".formatted(requestId),
                "{\"status\":\"%s\"}".formatted(status));
    }

    /** Leva a solicitação até CONCLUIDA, passo a passo, conferindo cada um. */
    protected void complete(Account provider, long requestId) {
        for (String step : List.of("EM_NEGOCIACAO", "ACEITA", "EM_ANDAMENTO", "CONCLUIDA")) {
            Response res = changeStatus(provider, requestId, step);
            assertThat(res.status()).as("passo %s: %s", step, res.body()).isEqualTo(200);
        }
    }
}