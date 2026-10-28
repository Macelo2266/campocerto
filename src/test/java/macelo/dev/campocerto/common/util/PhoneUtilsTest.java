package macelo.dev.campocerto.common.util;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class PhoneUtilsTest {

    @Test
    void aceitaFormatoComMascara() {
        assertEquals("5583999990000", PhoneUtils.normalizeBrazilianMobile("(83) 99999-0000"));
    }

    @Test
    void aceitaComCodigoDoPais() {
        assertEquals("5583999990000", PhoneUtils.normalizeBrazilianMobile("+55 83 99999-0000"));
    }

    @Test
    void aceitaSoNumeros() {
        assertEquals("5583999990000", PhoneUtils.normalizeBrazilianMobile("83999990000"));
    }

    @Test
    void naoConfundeDdd55ComCodigoDoPais() {
        assertEquals("5555999990000", PhoneUtils.normalizeBrazilianMobile("55999990000"));
    }

    @Test
    void recusaTelefoneFixo() {
        assertNull(PhoneUtils.normalizeBrazilianMobile("8333221000"));
    }

    @Test
    void recusaNumeroSemDdd() {
        assertNull(PhoneUtils.normalizeBrazilianMobile("99999-0000"));
    }

    @Test
    void recusaDddComecandoComZero() {
        assertNull(PhoneUtils.normalizeBrazilianMobile("03999990000"));
    }

    @Test
    void recusaNuloEVazio() {
        assertNull(PhoneUtils.normalizeBrazilianMobile(null));
        assertNull(PhoneUtils.normalizeBrazilianMobile("   "));
    }
}