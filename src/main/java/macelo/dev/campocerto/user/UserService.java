package macelo.dev.campocerto.user;

import macelo.dev.campocerto.common.exception.ApiException;
import macelo.dev.campocerto.user.dto.User;
import macelo.dev.campocerto.user.dto.UserResponse;
import macelo.dev.campocerto.user.dto.UserStatus;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public UserResponse getById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));

        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Sua conta está suspensa ou bloqueada");
        }

        return UserResponse.from(user);
    }


    // Duas pessoas alteraram o mesmo registro ao mesmo tempo
    @ExceptionHandler(OptimisticLockingFailureException.class)
    public ProblemDetail handleOptimisticLock(OptimisticLockingFailureException ex) {
        return ProblemDetail.forStatusAndDetail(
                HttpStatus.CONFLICT,
                "Os dados foram alterados por outra pessoa. Atualize a página e tente novamente.");
    }
}