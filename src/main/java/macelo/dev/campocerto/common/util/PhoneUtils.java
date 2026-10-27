package macelo.dev.campocerto.common.util;

import java.util.regex.Pattern;

public final class PhoneUtils {

    // DDD (2 dígitos, sem zero) + 9 + 8 dígitos
    private static final Pattern CELULAR_BR = Pattern.compile("^[1-9][1-9]9\\d{8}$");

    private PhoneUtils() {
    }

    /**
     * Converte "(83) 99999-0000", "+55 83 99999-0000" ou "83999990000"
     * em "5583999990000". Devolve null se não for um celular brasileiro válido.
     */
    public static String normalizeBrazilianMobile(String raw) {
        if (raw == null) {
            return null;
        }

        String digits = raw.replaceAll("\\D", "");

        // 13 dígitos começando com 55 = tem código do país
        if (digits.length() == 13 && digits.startsWith("55")) {
            digits = digits.substring(2);
        }

        return CELULAR_BR.matcher(digits).matches() ? "55" + digits : null;
    }
}