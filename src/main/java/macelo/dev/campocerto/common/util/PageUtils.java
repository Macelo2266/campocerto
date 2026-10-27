package macelo.dev.campocerto.common.util;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public final class PageUtils {

    public static final int MAX_PAGE_SIZE = 50;

    private PageUtils() {
    }

    public static Pageable pageable(int page, int size, Sort sort) {
        return PageRequest.of(
                Math.max(page, 0),
                Math.min(Math.max(size, 1), MAX_PAGE_SIZE),
                sort
        );
    }
}
