package macelo.dev.campocerto.user;

import macelo.dev.campocerto.common.exception.ApiException;
import macelo.dev.campocerto.user.dto.User;
import macelo.dev.campocerto.user.dto.UserRepository;
import macelo.dev.campocerto.user.dto.UserResponse;
import macelo.dev.campocerto.user.dto.UserStatus;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}