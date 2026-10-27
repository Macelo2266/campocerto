package macelo.dev.campocerto.provider;

import org.springframework.data.domain.Sort;

public enum ProviderSort {

    NAME,
    NEWEST;

    // O "id" no fim desempata: sem ordem total, itens podem repetir ou sumir entre páginas
    public Sort toSort() {
        return switch (this) {
            case NAME -> Sort.by(Sort.Order.asc("professionalName").ignoreCase(), Sort.Order.asc("id"));
            case NEWEST -> Sort.by(Sort.Order.desc("createdAt"), Sort.Order.desc("id"));
        };
    }
}