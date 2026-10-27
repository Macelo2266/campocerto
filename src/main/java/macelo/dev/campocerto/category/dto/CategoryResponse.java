package macelo.dev.campocerto.category.dto;

import macelo.dev.campocerto.category.Category;

public record CategoryResponse(Long id, String name, String slug, String description, boolean active) {

    public static CategoryResponse from(Category category) {
        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getSlug(),
                category.getDescription(),
                category.isActive()
        );
    }
}
