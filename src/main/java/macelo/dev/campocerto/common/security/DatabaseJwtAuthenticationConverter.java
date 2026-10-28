package macelo.dev.campocerto.common.security;

import macelo.dev.campocerto.user.UserRepository;
import macelo.dev.campocerto.user.dto.User;
import macelo.dev.campocerto.user.dto.UserStatus;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.InvalidBearerTokenException;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Depois que a assinatura do token foi validada, confere no banco se o usuário
 * ainda existe e está ativo, e define o papel A PARTIR DO BANCO.
 */
@Component
public class DatabaseJwtAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private final UserRepository userRepository;

    public DatabaseJwtAuthenticationConverter(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        Long userId = parseUserId(jwt.getSubject());

        User user = userRepository.findById(userId)
                .filter(found -> found.getStatus() == UserStatus.ACTIVE)
                .orElseThrow(() -> new InvalidBearerTokenException("Usuário inexistente ou inativo"));

        return new JwtAuthenticationToken(
                jwt,
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name())),
                String.valueOf(userId)
        );
    }

    private Long parseUserId(String subject) {
        try {
            return Long.valueOf(subject);
        } catch (NumberFormatException e) {
            throw new InvalidBearerTokenException("Token com identificador inválido");
        }
    }
}