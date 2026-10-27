package macelo.dev.campocerto.common.util;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SlugUtilsTest {

    @Test
    void removeAcentosEUsaHifens() {
        assertEquals("construcao-de-cercas", SlugUtils.toSlug("Construção de cercas"));
    }

    @Test
    void ignoraEspacosEPontuacaoNasPontas() {
        assertEquals("rocagem-e-limpeza", SlugUtils.toSlug("  Roçagem   e limpeza!! "));
    }

    @Test
    void trocaApostrofoPorHifen() {
        assertEquals("bombas-d-agua", SlugUtils.toSlug("Bombas d'água"));
    }

    @Test
    void devolveVazioQuandoNaoHaLetrasNemNumeros() {
        assertEquals("", SlugUtils.toSlug("!!!"));
    }

    @Test
    void devolveVazioParaNulo() {
        assertEquals("", SlugUtils.toSlug(null));
    }
}
