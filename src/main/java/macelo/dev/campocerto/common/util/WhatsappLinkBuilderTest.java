package macelo.dev.campocerto.common.util;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class WhatsappLinkBuilderTest {

    @Test
    void codificaAcentosEPontuacao() {
        assertEquals("https://wa.me/5583999990001?text=Ol%C3%A1%2C%20Z%C3%A9",
                WhatsappLinkBuilder.url("5583999990001", "Olá, Zé"));
    }

    @Test
    void usaPorcentoVinteParaEspacosEPreservaOMais() {
        assertEquals("https://wa.me/5583999990001?text=1%20%2B%201",
                WhatsappLinkBuilder.url("5583999990001", "1 + 1"));
    }

    @Test
    void codificaQuebraDeLinha() {
        assertEquals("https://wa.me/5583999990001?text=a%0Ab",
                WhatsappLinkBuilder.url("5583999990001", "a\nb"));
    }

    @Test
    void recusaTelefoneInvalido() {
        assertThrows(IllegalArgumentException.class, () -> WhatsappLinkBuilder.url("83 99999", "oi"));
        assertThrows(IllegalArgumentException.class, () -> WhatsappLinkBuilder.url(null, "oi"));
        assertThrows(IllegalArgumentException.class, () -> WhatsappLinkBuilder.url("5583/../x", "oi"));
    }
}