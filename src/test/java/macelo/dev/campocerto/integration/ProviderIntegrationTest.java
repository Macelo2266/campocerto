package macelo.dev.campocerto.integration;

import org.apache.catalina.connector.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class ProviderIntegrationTest extends IntegrationTest {

    private long fencing;
    private long clearing;

    @BeforeEach
    void categorias() {
        fencing = categoryId("construcao-de-cercas");
        clearing = categoryId("rocagem-e-limpeza");
    }

    private List<String> names(Response res) {
        return res.list("$.content[*].professionalName").stream().map(Object::toString).toList();
    }

    // ---------- perfil do prestador ----------

    @Test
    void prestadorCriaPerfilECidadeBaseEntraNasAreasAtendidas() {
        Account ze = newProvider("ze");

        Response res = api.postAs(ze.token(), "/api/providers/profile",
                profileJson("Zé das Cercas", "Itaporanga", List.of("Coremas"), true, fencing));

        assertThat(res.status()).isEqualTo(201);
        assertThat(res.text("$.whatsapp")).isEqualTo("5583999990000");
        assertThat(res.list("$.serviceAreas")).containsExactly("Coremas", "Itaporanga");
    }

    @Test
    void agricultorNaoCriaPerfilDePrestador() {
        Account maria = newFarmer("maria");

        Response res = api.postAs(maria.token(), "/api/providers/profile",
                profileJson("Perfil indevido", "Patos", List.of(), true, fencing));

        assertThat(res.status()).isEqualTo(403);
    }

    @Test
    void segundoPerfilDoMesmoPrestadorEhRecusado() {
        Account ze = newProvider("ze");
        createProfile(ze, "Zé das Cercas", "Itaporanga", List.of(), fencing);

        Response res = api.postAs(ze.token(), "/api/providers/profile",
                profileJson("Outro Perfil", "Patos", List.of(), true, fencing));

        assertThat(res.status()).isEqualTo(409);
    }

    @Test
    void editarComAsMesmasCidadesEmOutraGrafiaNaoDuplicaNemQuebraUnique() {
        Account ze = newProvider("ze");
        createProfile(ze, "Zé das Cercas", "Itaporanga", List.of("Coremas", "Patos"), fencing);

        Response res = api.putAs(ze.token(), "/api/providers/profile",
                profileJson("Zé das Cercas", "Itaporanga", List.of("COREMAS", "patos"), true, fencing));

        assertThat(res.status()).isEqualTo(200);
        // as cidades que já existiam mantêm a grafia original
        assertThat(res.list("$.serviceAreas")).containsExactly("Coremas", "Itaporanga", "Patos");
    }

    @Test
    void trocarACidadePrincipalRemoveAAntigaDasAreas() {
        Account ze = newProvider("ze");
        createProfile(ze, "Zé das Cercas", "Itaporanga", List.of("Patos"), fencing);

        Response res = api.putAs(ze.token(), "/api/providers/profile",
                profileJson("Zé das Cercas", "Pombal", List.of("Patos"), true, fencing));

        assertThat(res.status()).isEqualTo(200);
        assertThat(res.list("$.serviceAreas")).containsExactly("Patos", "Pombal");
    }

    // ---------- privacidade ----------

    @Test
    void buscaEPerfilPublicosNaoExpoemOWhatsapp() {
        Account ze = newProvider("ze");
        long id = createProfile(ze, "Zé das Cercas", "Itaporanga", List.of(), fencing);

        Response list = api.get("/api/providers");
        Response profile = api.get("/api/providers/%d".formatted(id));

        assertThat(list.status()).isEqualTo(200);
        assertThat(profile.status()).isEqualTo(200);
        for (Response res : List.of(list, profile)) {
            assertThat(res.body()).doesNotContainIgnoringCase("whatsapp").doesNotContain("5583999990000");
        }
        // o dono, sim, vê o próprio número
        assertThat(api.getAs(ze.token(), "/api/providers/me").text("$.whatsapp")).isEqualTo("5583999990000");
    }

    // ---------- filtros ----------

    @Test
    void buscaPorTextoEncontraPeloNomeEPeloServicoSemDependerDeAcento() {
        createProfile(newProvider("ze"), "Zé das Cercas", "Itaporanga", List.of(), fencing);
        createProfile(newProvider("chico"), "Roçadeira do Chico", "Coremas", List.of(), clearing);

        assertThat(names(api.get("/api/providers?q={q}", "cerca"))).containsExactly("Zé das Cercas");
        // "roçagem" não está no nome do Chico: ele é achado pela categoria que oferece
        assertThat(names(api.get("/api/providers?q={q}", "roçagem"))).containsExactly("Roçadeira do Chico");
        // maiúsculas e minúsculas, inclusive em letras acentuadas
        assertThat(names(api.get("/api/providers?q={q}", "ROÇADEIRA"))).containsExactly("Roçadeira do Chico");
    }

    @Test
    void curingasDoLikeNaoCasamComTudo() {
        createProfile(newProvider("ze"), "Zé das Cercas", "Itaporanga", List.of(), fencing);

        assertThat(names(api.get("/api/providers?q={q}", "%"))).isEmpty();
        assertThat(names(api.get("/api/providers?q={q}", "_"))).isEmpty();
    }

    @Test
    void filtroDeCidadeIgnoraAcentoEMaiusculas() {
        createProfile(newProvider("ze"), "Zé das Cercas", "Catolé do Rocha", List.of(), fencing);

        assertThat(names(api.get("/api/providers?city={c}", "CATOLE DO ROCHA"))).containsExactly("Zé das Cercas");
        assertThat(names(api.get("/api/providers?city={c}", "catolé do rocha"))).containsExactly("Zé das Cercas");
        assertThat(names(api.get("/api/providers?city={c}", "Patos"))).isEmpty();
    }

    @Test
    void filtroPorCategoriaECidadeSeSomam() {
        createProfile(newProvider("ze"), "Zé das Cercas", "Itaporanga", List.of("Patos"), fencing);
        createProfile(newProvider("chico"), "Roçadeira do Chico", "Patos", List.of(), clearing);

        assertThat(names(api.get("/api/providers?category={c}", fencing))).containsExactly("Zé das Cercas");
        assertThat(names(api.get("/api/providers?city={c}&sort=NAME", "Patos")))
                .containsExactly("Roçadeira do Chico", "Zé das Cercas");
        assertThat(names(api.get("/api/providers?category={cat}&city={city}", clearing, "Patos")))
                .containsExactly("Roçadeira do Chico");
    }

    // ---------- paginação e ordenação ----------

    @Test
    void paginacaoNaoRepeteNemPerdeItens() {
        for (int i = 1; i <= 5; i++) {
            createProfile(newProvider("p" + i), "Prestador Nome " + i, "Patos", List.of(), fencing);
        }

        Response first = api.get("/api/providers?sort=NAME&size=2&page=0");
        Response second = api.get("/api/providers?sort=NAME&size=2&page=1");
        Response third = api.get("/api/providers?sort=NAME&size=2&page=2");

        assertThat(first.number("$.totalElements")).isEqualTo(5);
        assertThat(first.number("$.totalPages")).isEqualTo(3);
        assertThat(names(first)).containsExactly("Prestador Nome 1", "Prestador Nome 2");
        assertThat(names(second)).containsExactly("Prestador Nome 3", "Prestador Nome 4");
        assertThat(names(third)).containsExactly("Prestador Nome 5");
    }

    @Test
    void paginaDepoisDoFimVemVaziaSemErro() {
        createProfile(newProvider("ze"), "Zé das Cercas", "Patos", List.of(), fencing);

        Response res = api.get("/api/providers?page=99");

        assertThat(res.status()).isEqualTo(200);
        assertThat(names(res)).isEmpty();
    }

    @Test
    void tamanhoDePaginaTemLimite() {
        Response res = api.get("/api/providers?size=1000");

        assertThat(res.number("$.size")).isEqualTo(50);
    }

    @Test
    void ordenacaoDesconhecidaEhRecusada() {
        Response res = api.get("/api/providers?sort=passwordHash");

        assertThat(res.status()).isEqualTo(400);
    }

    // ---------- quem aparece ----------

    @Test
    void prestadorIndisponivelSaiDaBuscaMasOPerfilContinuaAbrindo() {
        Account ze = newProvider("ze");
        long id = createProfile(ze, "Zé das Cercas", "Itaporanga", List.of(), fencing);

        api.putAs(ze.token(), "/api/providers/profile",
                profileJson("Zé das Cercas", "Itaporanga", List.of(), false, fencing));

        assertThat(names(api.get("/api/providers"))).isEmpty();
        Response profile = api.get("/api/providers/%d".formatted(id));
        assertThat(profile.status()).isEqualTo(200);
        assertThat(profile.text("$.available")).isEqualTo("false");
    }

    @Test
    void prestadorSuspensoSomeDaBuscaDoPerfilEDasCidades() {
        Account ze = newProvider("ze");
        long id = createProfile(ze, "Zé das Cercas", "Itaporanga", List.of("Patos"), fencing);
        assertThat(api.get("/api/providers/cities").list("$")).containsExactly("Itaporanga", "Patos");

        setUserStatus(ze.id(), "SUSPENDED");

        assertThat(names(api.get("/api/providers"))).isEmpty();
        assertThat(api.get("/api/providers/%d".formatted(id)).status()).isEqualTo(404);
        assertThat(api.get("/api/providers/cities").list("$")).isEmpty();
    }

    @Test
    void perfilInexistenteOuComIdInvalido() {
        assertThat(api.get("/api/providers/999999").status()).isEqualTo(404);
        assertThat(api.get("/api/providers/abc").status()).isEqualTo(400);
    }
}