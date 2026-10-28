package macelo.dev.campocerto.admin;

import macelo.dev.campocerto.admin.dto.AdminUserResponse;
import macelo.dev.campocerto.common.dto.PageResponse;
import macelo.dev.campocerto.common.exception.ApiException;
import macelo.dev.campocerto.common.util.PageUtils;
import macelo.dev.campocerto.user.UserRepository;
import macelo.dev.campocerto.user.dto.User;
import macelo.dev.campocerto.user.dto.UserRole;
import macelo.dev.campocerto.user.dto.UserStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminUserService {

    private static final Logger log = LoggerFactory.getLogger(AdminUserService.class);
    private static final int MAX_TEXT_LENGTH = 100;
    private static final Sort NEWEST_FIRST = Sort.by(Sort.Order.desc("createdAt"), Sort.Order.desc("id"));

    private final UserRepository userRepository;

    public AdminUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public PageResponse<AdminUserResponse> list(String text, UserRole role, UserStatus status,
                                                int page, int size) {
        Specification<User> spec = AdminUserSpecifications.all();

        if (text != null && !text.isBlank()) {
            String trimmed = text.trim();
            if (trimmed.length() > MAX_TEXT_LENGTH) {
                trimmed = trimmed.substring(0, MAX_TEXT_LENGTH);
            }
            spec = spec.and(AdminUserSpecifications.matchesText(trimmed));
        }
        if (role != null) {
            spec = spec.and(AdminUserSpecifications.hasRole(role));
        }
        if (status != null) {
            spec = spec.and(AdminUserSpecifications.hasStatus(status));
        }

        Pageable pageable = PageUtils.pageable(page, size, NEWEST_FIRST);

        return PageResponse.from(userRepository.findAll(spec, pageable), AdminUserResponse::from);
    }

    @Transactional
    public AdminUserResponse changeStatus(Long adminId, Long targetId, UserStatus newStatus) {
        User target = userRepository.findById(targetId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));

        if (target.getId().equals(adminId)) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Você não pode alterar o status da própria conta");
        }
        if (target.getRole() == UserRole.ADMIN) {
            throw new ApiException(HttpStatus.FORBIDDEN,
                    "Não é permitido alterar o status de outro administrador");
        }

        if (target.getStatus() != newStatus) {
            UserStatus previous = target.getStatus();
            target.setStatus(newStatus);
            // Só ids no log: nada de nome, e-mail ou telefone
            log.info("Admin {} alterou o status do usuário {}: {} -> {}", adminId, targetId, previous, newStatus);
        }

        return AdminUserResponse.from(target);
    }
}