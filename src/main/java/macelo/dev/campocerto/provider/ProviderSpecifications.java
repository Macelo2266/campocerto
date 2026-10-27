package macelo.dev.campocerto.provider;

import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import macelo.dev.campocerto.common.util.SlugUtils;
import macelo.dev.campocerto.user.dto.UserStatus;
import org.springframework.data.jpa.domain.Specification;

import java.util.Locale;

final class ProviderSpecifications {

    private static final char ESCAPE = '\\';

    private ProviderSpecifications() {
    }

    static Specification<ProviderProfile> publiclyVisible() {
        return (root, query, cb) -> cb.equal(root.get("user").get("status"), UserStatus.ACTIVE);
    }

    static Specification<ProviderProfile> isAvailable() {
        return (root, query, cb) -> cb.isTrue(root.<Boolean>get("available"));
    }

    static Specification<ProviderProfile> offersCategory(Long categoryId) {
        return (root, query, cb) -> {
            Subquery<Long> sub = query.subquery(Long.class);
            Root<ProviderOffering> offering = sub.from(ProviderOffering.class);
            sub.select(offering.<Long>get("id")).where(
                    cb.equal(offering.get("provider"), root),
                    cb.equal(offering.get("category").get("id"), categoryId)
            );
            return cb.exists(sub);
        };
    }

    static Specification<ProviderProfile> servesCity(String cityKey) {
        return (root, query, cb) -> {
            Subquery<Long> sub = query.subquery(Long.class);
            Root<ProviderServiceArea> area = sub.from(ProviderServiceArea.class);
            sub.select(area.<Long>get("id")).where(
                    cb.equal(area.get("provider"), root),
                    cb.equal(area.<String>get("cityKey"), cityKey)
            );
            return cb.exists(sub);
        };
    }

    static Specification<ProviderProfile> matchesText(String text) {
        String pattern = "%" + escapeLike(text.toLowerCase(Locale.ROOT)) + "%";
        String slug = SlugUtils.toSlug(text);

        return (root, query, cb) -> {
            Predicate byName = cb.like(cb.lower(root.<String>get("professionalName")), pattern, ESCAPE);
            Predicate byDescription = cb.like(cb.lower(root.<String>get("description")), pattern, ESCAPE);

            // Sem letras nem números, o slug seria "" e o LIKE '%%' casaria com tudo
            if (slug.isEmpty()) {
                return cb.or(byName, byDescription);
            }

            Subquery<Long> sub = query.subquery(Long.class);
            Root<ProviderOffering> offering = sub.from(ProviderOffering.class);
            sub.select(offering.<Long>get("id")).where(
                    cb.equal(offering.get("provider"), root),
                    cb.like(offering.get("category").<String>get("slug"), "%" + escapeLike(slug) + "%", ESCAPE)
            );

            return cb.or(byName, byDescription, cb.exists(sub));
        };
    }

    // % e _ são curingas do LIKE: se o usuário digitar "%", não pode casar com tudo
    static String escapeLike(String text) {
        return text.replace("\\", "\\\\")
                .replace("%", "\\%")
                .replace("_", "\\_");
    }
}