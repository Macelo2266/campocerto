package macelo.dev.campocerto.common.bootstrap;

import macelo.dev.campocerto.common.config.AppProperties;
import macelo.dev.campocerto.user.UserRepository;
import macelo.dev.campocerto.user.dto.User;
import macelo.dev.campocerto.user.dto.UserRole;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;

@Component
public class AdminBootstrap implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(AdminBootstrap.class);
    private static final int MIN_PASSWORD_LENGTH = 12;
    private static final int BCRYPT_MAX_BYTES = 72;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AppProperties properties;

    public AdminBootstrap(UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          AppProperties properties) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.properties = properties;
    }

    @Override
    public void run(ApplicationArguments args) {
        AppProperties.Admin config = properties.admin();
        String email = config == null || config.email() == null ? "" : config.email().trim();
        String password = config == null || config.password() == null ? "" : config.password();
        String name = config == null || config.name() == null || config.name().isBlank()
                ? "Administrador" : config.name().trim();

        if (email.isEmpty() && password.isEmpty()) {
            log.info("Nenhum administrador configurado (ADMIN_EMAIL / ADMIN_PASSWORD).");
            return;
        }
        if (email.isEmpty() || password.isEmpty()) {
            throw new IllegalStateException("Defina ADMIN_EMAIL e ADMIN_PASSWORD juntos.");
        }

        if (userRepository.existsByRole(UserRole.ADMIN)) {
            log.info("Já existe um administrador: ADMIN_EMAIL e ADMIN_PASSWORD foram ignorados. "
                    + "Remova essas variáveis da configuração.");
            return;
        }

        validate(email, password);

        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new IllegalStateException(
                    "O e-mail do administrador já pertence a uma conta comum. Use outro e-mail.");
        }

        User admin = new User(name, email, passwordEncoder.encode(password), null, UserRole.ADMIN);
        userRepository.save(admin);

        log.info("Administrador criado (id={}). Remova ADMIN_PASSWORD da configuração.", admin.getId());
    }

    private void validate(String email, String password) {
        if (!email.contains("@")) {
            throw new IllegalStateException("ADMIN_EMAIL inválido.");
        }
        if (password.length() < MIN_PASSWORD_LENGTH) {
            throw new IllegalStateException(
                    "ADMIN_PASSWORD deve ter pelo menos " + MIN_PASSWORD_LENGTH + " caracteres.");
        }
        if (password.getBytes(StandardCharsets.UTF_8).length > BCRYPT_MAX_BYTES) {
            throw new IllegalStateException("ADMIN_PASSWORD deve ter no máximo 72 bytes.");
        }
    }
}