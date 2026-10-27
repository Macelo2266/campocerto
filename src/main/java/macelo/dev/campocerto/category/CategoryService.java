package macelo.dev.campocerto.category;

import macelo.dev.campocerto.category.dto.CategoryRequest;
import macelo.dev.campocerto.category.dto.CategoryResponse;
import macelo.dev.campocerto.common.exception.ApiException;
import macelo.dev.campocerto.common.util.SlugUtils;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoryService {

    private static final String NOME_EM_USO = "Já existe uma categoria com este nome";

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Transactional(readOnly = true)
    public List<CategoryResponse> listActive() {
        return categoryRepository.findByActiveTrueOrderByNameAsc().stream()
                .map(CategoryResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<CategoryResponse> listAll() {
        return categoryRepository.findAll(Sort.by("name")).stream()
                .map(CategoryResponse::from)
                .toList();
    }

    @Transactional
    public CategoryResponse create(CategoryRequest request) {
        String name = request.name().trim();
        String slug = SlugUtils.toSlug(name);

        if (slug.isEmpty()) {
            throw new ApiException(HttpStatus.BAD_REQUEST,
                    "O nome da categoria deve conter letras ou números");
        }
        if (categoryRepository.existsByNameIgnoreCase(name) || categoryRepository.existsBySlug(slug)) {
            throw new ApiException(HttpStatus.CONFLICT, NOME_EM_USO);
        }

        Category category = new Category(name, slug, blankToNull(request.description()));
        return CategoryResponse.from(categoryRepository.save(category));
    }

    @Transactional
    public CategoryResponse update(Long id, CategoryRequest request) {
        Category category = findOrThrow(id);
        String name = request.name().trim();

        if (SlugUtils.toSlug(name).isEmpty()) {
            throw new ApiException(HttpStatus.BAD_REQUEST,
                    "O nome da categoria deve conter letras ou números");
        }
        if (categoryRepository.existsByNameIgnoreCaseAndIdNot(name, id)) {
            throw new ApiException(HttpStatus.CONFLICT, NOME_EM_USO);
        }

        category.setName(name);
        category.setDescription(blankToNull(request.description()));
        return CategoryResponse.from(category);
    }

    @Transactional
    public void deactivate(Long id) {
        findOrThrow(id).setActive(false);
    }

    @Transactional
    public CategoryResponse reactivate(Long id) {
        Category category = findOrThrow(id);
        category.setActive(true);
        return CategoryResponse.from(category);
    }

    private Category findOrThrow(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Categoria não encontrada"));
    }

    private String blankToNull(String text) {
        if (text == null || text.isBlank()) {
            return null;
        }
        return text.trim();
    }
}
