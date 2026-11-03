package macelo.dev.campocerto.integration;



import com.nimbusds.jose.jwk.source.ImmutableSecret;
import org.apache.coyote.Response;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.Instant;

import static org.assertj.core.api.Assertions.assertThat;
import static org.flywaydb.core.internal.configuration.ConfigUtils.PASSWORD;

class AuthIntegrationTest extends IntegrationTest {

    @Autowired
    private JwtEncoder jwtEncoder;

    // ---------- cadastro ----------

    @Test
    void cadastroCriaContaEDevolveToken() {
        Response res = api.post("/api/auth/register",
                registerJson("Maria da Silva", "maria@teste.com", PASSWORD, "FARMER"));

        assertThat(res.status()).isEqualTo(201);
        assertThat(res.text("$.tokenType")).isEqualTo("Bearer");
        assertThat(res.text("$.user.role")).isEqualTo("FARMER");
        assertThat(res.text("$.accessToken")).isNotBlank();
        // a resposta nunca devolve a senha nem o hash dela
        assertThat(res.body()).doesNotContain("passwordHash").doesNotContain("$2a$");
    }

    @Test
    void senhaVaiParaOBancoComoHashBcryptEEmailEmMinusculas() {
        api.post("/api/auth/register", registerJson("Maria", "Maria@Teste.COM", PASSWORD, "FARMER"));

        String hash = jdbc.queryForObject(
                "SELECT password_hash FROM users WHERE email = ?", String.class, "maria@teste.com");

        assertThat(hash).startsWith("$2").isNotEqualTo(PASSWORD);
    }

    @Test
    void emailRepetidoEhRecusadoSemDiferenciarMaiusculas() {
        newFarmer("maria");

        Response res = api.post("/api/auth/register",
                registerJson("Outra Maria", "AGRICULTOR.MARIA@teste.com", PASSWORD, "FARMER"));

        assertThat(res.status()).isEqualTo(409);
    }

    @Test
    void contaDeAdministradorNaoSeCriaPeloCadastro() {
        Response res = api.post("/api/auth/register",
                registerJson("Espertinho", "esperto@teste.com", PASSWORD, "ADMIN"));

        assertThat(res.status()).isEqualTo(403);
        Long users = jdbc.queryForObject("SELECT count(*) FROM users", Long.class);
        assertThat(users).isZero();
    }

    @Test
    void errosDeValidacaoVemPorCampo() {
        Response res = api.post("/api/auth/register", registerJson("Maria", "abc", "123", "FARMER"));

        assertThat(res.status()).isEqualTo(400);
        assertThat(res.text("$.title")).isEqualTo("Dados inválidos");
        assertThat(res.has("$.errors.email")).isTrue();
        assertThat(res.has("$.errors.password")).isTrue();
    }

    @Test
    void tipoDeContaDesconhecidoEhRecusado() {
        Response res = api.post("/api/auth/register",
                registerJson("Maria", "maria@teste.com", PASSWORD, "BANANA"));

        assertThat(res.status()).isEqualTo(400);
        assertThat(res.text("$.title")).isEqualTo("Requisição inválida");
    }

    // ---------- login ----------

    @Test
    void loginCorretoDevolveToken() {
        Account maria = newFarmer("maria");

        Response res = api.post("/api/auth/login", loginJson(maria.email(), PASSWORD));

        assertThat(res.status()).isEqualTo(200);
        assertThat(res.text("$.accessToken")).isNotBlank();
    }

    @Test
    void senhaErradaEEmailInexistenteDaoExatamenteAMesmaResposta() {
        Account maria = newFarmer("maria");

        Response wrongPassword = api.post("/api/auth/login", loginJson(maria.email(), "senha-errada-123"));
        Response unknownEmail = api.post("/api/auth/login", loginJson("ninguem@teste.com", PASSWORD));

        assertThat(wrongPassword.status()).isEqualTo(401);
        assertThat(unknownEmail.status()).isEqualTo(401);
        // mensagens diferentes revelariam quais e-mails existem
        assertThat(wrongPassword.text("$.detail")).isEqualTo(unknownEmail.text("$.detail"));
    }

    @Test
    void contaSuspensaNaoConsegueEntrar() {
        Account maria = newFarmer("maria");
        setUserStatus(maria.id(), "SUSPENDED");

        Response res = api.post("/api/auth/login", loginJson(maria.email(), PASSWORD));

        assertThat(res.status()).isEqualTo(403);
    }

    // ---------- token ----------

    @Test
    void meDevolveOsDadosDoDonoDoToken() {
        Account maria = newFarmer("maria");

        Response res = api.getAs(maria.token(), "/api/users/me");

        assertThat(res.status()).isEqualTo(200);
        assertThat(res.text("$.email")).isEqualTo(maria.email());
        assertThat(res.has("$.passwordHash")).isFalse();
    }

    @Test
    void semTokenAResposta401EmJson() {
        Response res = api.get("/api/users/me");

        assertThat(res.status()).isEqualTo(401);
        assertThat(res.text("$.title")).isEqualTo("Não autenticado");
    }

    @Test
    void tokenSemSentidoEhRecusado() {
        Response res = api.getAs("abc.def.ghi", "/api/users/me");

        assertThat(res.status()).isEqualTo(401);
    }

    @Test
    void tokenAdulteradoEhRecusado() {
        Account maria = newFarmer("maria");
        String[] parts = maria.token().split("\\.");
        // Trocamos o PRIMEIRO caractere da assinatura (o último poderia só mexer em bits de preenchimento)
        char first = parts[2].charAt(0);
        String forged = parts[0] + "." + parts[1] + "." + (first == 'A' ? 'B' : 'A') + parts[2].substring(1);

        Response res = api.getAs(forged, "/api/users/me");

        assertThat(res.status()).isEqualTo(401);
    }

    @Test
    void tokenFabricadoNoTesteComDadosCertosEhAceito() {
        // Teste de CONTROLE: sem ele, os testes abaixo poderiam passar por um token mal montado
        Account maria = newFarmer("maria");
        String token = signedToken(jwtEncoder, "campocerto", maria.id(),
                Instant.now().minusSeconds(10), Instant.now().plusSeconds(600));

        Response res = api.getAs(token, "/api/users/me");

        assertThat(res.status()).isEqualTo(200);
    }

    @Test
    void tokenVencidoEhRecusado() {
        Account maria = newFarmer("maria");
        String token = signedToken(jwtEncoder, "campocerto", maria.id(),
                Instant.now().minusSeconds(7200), Instant.now().minusSeconds(3600));

        Response res = api.getAs(token, "/api/users/me");

        assertThat(res.status()).isEqualTo(401);
    }

    @Test
    void tokenAssinadoComOutroSegredoEhRecusado() {
        Account maria = newFarmer("maria");
        NimbusJwtEncoder stranger = new NimbusJwtEncoder(new ImmutableSecret<>(new SecretKeySpec(
                "outro-segredo-outro-segredo-outro-segredo-1".getBytes(StandardCharsets.UTF_8), "HmacSHA256")));
        String token = signedToken(stranger, "campocerto", maria.id(),
                Instant.now().minusSeconds(10), Instant.now().plusSeconds(600));

        Response res = api.getAs(token, "/api/users/me");

        assertThat(res.status()).isEqualTo(401);
    }

    @Test
    void tokenDeOutroEmissorEhRecusado() {
        Account maria = newFarmer("maria");
        String token = signedToken(jwtEncoder, "outro-sistema", maria.id(),
                Instant.now().minusSeconds(10), Instant.now().plusSeconds(600));

        Response res = api.getAs(token, "/api/users/me");

        assertThat(res.status()).isEqualTo(401);
    }

    // ---------- o banco manda mais que o token (decisões da 3.6b) ----------

    @Test
    void suspenderInvalidaOTokenNaHoraEReativarOLibera() {
        Account maria = newFarmer("maria");
        assertThat(api.getAs(maria.token(), "/api/users/me").status()).isEqualTo(200);

        setUserStatus(maria.id(), "SUSPENDED");
        assertThat(api.getAs(maria.token(), "/api/users/me").status()).isEqualTo(401);

        setUserStatus(maria.id(), "ACTIVE");
        assertThat(api.getAs(maria.token(), "/api/users/me").status()).isEqualTo(200);
    }

    @Test
    void tokenDeUsuarioApagadoEhRecusado() {
        Account maria = newFarmer("maria");

        jdbc.update("DELETE FROM users WHERE id = ?", maria.id());

        assertThat(api.getAs(maria.token(), "/api/users/me").status()).isEqualTo(401);
    }

    @Test
    void oPapelVemDoBancoENaoDoToken() {
        Account maria = newFarmer("maria"); // o token diz FARMER
        assertThat(api.getAs(maria.token(), "/api/admin/stats").status()).isEqualTo(403);

        setUserRole(maria.id(), "ADMIN");
        assertThat(api.getAs(maria.token(), "/api/admin/stats").status()).isEqualTo(200);

        setUserRole(maria.id(), "FARMER");
        assertThat(api.getAs(maria.token(), "/api/admin/stats").status()).isEqualTo(403);
    }

    // ---------- auxiliar ----------

    private String signedToken(JwtEncoder encoder, String issuer, long userId, Instant issuedAt, Instant expiresAt) {
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer(issuer)
                .subject(String.valueOf(userId))
                .issuedAt(issuedAt)
                .expiresAt(expiresAt)
                .claim("role", "FARMER")
                .build();

        return encoder.encode(JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS256).build(), claims))
                .getTokenValue();
    }
}