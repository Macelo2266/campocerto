package macelo.dev.campocerto.common.util;

public final class LikeUtils {

    private LikeUtils() {
    }

    // % e _ são curingas do LIKE: se o usuário digitar "%", não pode casar com tudo
    public static String escape(String text) {
        return text.replace("\\", "\\\\")
                .replace("%", "\\%")
                .replace("_", "\\_");
    }
}
