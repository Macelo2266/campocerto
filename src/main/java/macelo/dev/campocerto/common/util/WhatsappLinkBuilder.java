package macelo.dev.campocerto.common.util;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public final class WhatsappLinkBuilder {

    private WhatsappLinkBuilder() {
    }

    /**
     * @param phoneDigits número só com dígitos e código do país (ex.: 5583999990000)
     */
    public static String url(String phoneDigits, String message) {
        if (phoneDigits == null || !phoneDigits.matches("\\d{10,15}")) {
            throw new IllegalArgumentException("Número de telefone inválido");
        }

        // URLEncoder troca espaço por "+", mas o wa.me espera "%20"
        String encoded = URLEncoder.encode(message, StandardCharsets.UTF_8).replace("+", "%20");

        return "https://wa.me/" + phoneDigits + "?text=" + encoded;
    }
}