package macelo.dev.campocerto.admin;

import macelo.dev.campocerto.common.util.LikeUtils;
import macelo.dev.campocerto.user.dto.User;
import macelo.dev.campocerto.user.dto.UserRole;
import macelo.dev.campocerto.user.dto.UserStatus;
import org.springframework.data.jpa.domain.Specification;

import java.util.Locale;

final class AdminUserSpecifications {

    private static final char ESCAPE = '\\';

    private AdminUserSpecifications() {
    }

    // Ponto de partida sem restrição: "conjunction" é um predicado sempre verdadeiro
    static Specification<User> all() {
        return (root, query, cb) -> cb.conjunction();
    }

    static Specification<User> matchesText(String text) {
        String pattern = "%" + LikeUtils.escape(text.toLowerCase(Locale.ROOT)) + "%";
        return (root, query, cb) -> cb.or(
                cb.like(cb.lower(root.<String>get("name")), pattern, ESCAPE),
                cb.like(cb.lower(root.<String>get("email")), pattern, ESCAPE)
        );
    }

    static Specification<User> hasRole(UserRole role) {
        return (root, query, cb) -> cb.equal(root.get("role"), role);
    }

    static Specification<User> hasStatus(UserStatus status) {
        return (root, query, cb) -> cb.equal(root.get("status"), status);
    }
}