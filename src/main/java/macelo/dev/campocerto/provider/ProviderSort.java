package macelo.dev.campocerto.provider;

import org.springframework.data.domain.Sort;

public enum ProviderSort {

    NAME,
    NEWEST,
    RATING;

    // O "id" no fim desempata: sem ordem total, itens podem repetir ou sumir entre páginas
    public Sort toSort() {
        return switch (this) {
            case NAME -> Sort.by(Sort.Order.asc("professionalName").ignoreCase(), Sort.Order.asc("id"));
            case NEWEST -> Sort.by(Sort.Order.desc("createdAt"), Sort.Order.desc("id"));
            case RATING -> Sort.by(Sort.Order.desc("ratingAvg"), Sort.Order.desc("ratingCount"),
                    Sort.Order.asc("id"));
        };
    }
}