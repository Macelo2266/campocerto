package macelo.dev.campocerto.provider;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ProviderSpecificationsTest {

    @Test
    void escapaCuringasDoLike() {
        assertEquals("50\\%\\_a\\\\b", ProviderSpecifications.escapeLike("50%_a\\b"));
    }

    @Test
    void naoAlteraTextoComum() {
        assertEquals("cerca de arame", ProviderSpecifications.escapeLike("cerca de arame"));
    }
}