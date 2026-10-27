package macelo.dev.campocerto.auth;

import macelo.dev.campocerto.auth.dto.AuthResponse;
import macelo.dev.campocerto.auth.dto.LoginRequest;
import macelo.dev.campocerto.auth.dto.RegisterRequest;
import macelo.dev.campocerto.common.exception.ApiException;
import macelo.dev.campocerto.common.security.TokenService;
import macelo.dev.campocerto.user.dto.*;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private static final String EMAIL_EM_USO = "Este e-mail já está cadastrado";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       TokenService tokenService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (request.role() == UserRole.ADMIN) {
            throw new ApiException(HttpStatus.FORBIDDEN,
                    "Não é permitido criar conta de administrador por este caminho");
        }

        String email = request.email().trim().toLowerCase();

        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new ApiException(HttpStatus.CONFLICT, EMAIL_EM_USO);
        }

        User user = new User(
                request.name().trim(),
                email,
                passwordEncoder.encode(request.password()),
                request.phone(),
                request.role()
        );

        try {
            userRepository.saveAndFlush(user);
        } catch (DataIntegrityViolationException e) {
            // Duas requisições simultâneas com o mesmo e-mail: o índice único do banco barra a segunda.
            throw new ApiException(HttpStatus.CONFLICT, EMAIL_EM_USO);
        }

        return buildResponse(user);
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmailIgnoreCase(request.email().trim())
                .filter(found -> passwordEncoder.matches(request.password(), found.getPasswordHash()))
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "E-mail ou senha inválidos"));

        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new ApiException(HttpStatus.FORBIDDEN,
                    "Sua conta está suspensa ou bloqueada. Entre em contato com o suporte.");
        }

        return buildResponse(user);
    }

    private AuthResponse buildResponse(User user) {
        return new AuthResponse(
                tokenService.generateToken(user),
                "Bearer",
                tokenService.getExpiresInSeconds(),
                UserResponse.from(user)
        );
    }
}
