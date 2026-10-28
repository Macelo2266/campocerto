package macelo.dev.campocerto.common.util;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SlugUtilsTest {

    @Test
    void deveConverterAcentosEEspacosEmHifens() {
        assertEquals(
                "construcao-de-cercas",
                SlugUtils.toSlug("Construção de cercas")
        );
    }

    @Test
    void deveRemoverPontuacaoEEspacosExtras() {
        assertEquals(
                "rocagem-e-limpeza",
                SlugUtils.toSlug("  Roçagem e limpeza!!  ")
        );
    }

    @Test
    void deveConverterApostrofoECaracteresAcentuados() {
        assertEquals(
                "bombas-d-agua",
                SlugUtils.toSlug("Bombas d'água")
        );
    }

    @T
    est
    void deveRetornarVazioQuandoExistiremApenasSimbolos() {
        assertEquals(
                "",
                SlugUtils.toSlug("!!! ### @@@")
        );
    }

    @Test
    void deveConverterTextoParaMinusculas() {
        assertEquals(
                "servicos-rurais",
                SlugUtils.toSlug("SERVIÇOS RURAIS")
        );
    }
}
