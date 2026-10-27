package macelo.dev.campocerto.provider;

import macelo.dev.campocerto.common.dto.PageResponse;
import macelo.dev.campocerto.provider.dto.ProviderPublicResponse;
import macelo.dev.campocerto.provider.dto.ProviderSummaryResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/providers")
public class ProviderPublicController {

    private final ProviderSearchService searchService;

    public ProviderPublicController(ProviderSearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    public PageResponse<ProviderSummaryResponse> search(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) Long category,
            @RequestParam(required = false) String city,
            @RequestParam(defaultValue = "NAME") ProviderSort sort,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {

        return searchService.search(q, category, city, sort, page, size);
    }

    @GetMapping("/cities")
    public List<String> cities() {
        return searchService.listCities();
    }

    @GetMapping("/{id}")
    public ProviderPublicResponse profile(@PathVariable Long id) {
        return searchService.getPublicProfile(id);
    }
}