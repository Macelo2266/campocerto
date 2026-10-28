package macelo.dev.campocerto.common.security;

import macelo.dev.campocerto.user.UserRepository;
import macelo.dev.campocerto.user.dto.User;
import macelo.dev.campocerto.user.dto.UserRole;
import macelo.dev.campocerto.user.dto.UserStatus;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.InvalidBearerTokenException;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;
import java.util.Optional;

import static org.hibernate.query.restriction.Restriction.any;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.security.authorization.ConditionalAuthorizationManager.when;
import static sun.java2d.cmm.ProfileDataVerifier.verify;

@ExtendWith(MockitoExtension.class)
class DatabaseJwtAuthenticationConverterTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private DatabaseJwtAuthenticationConverter converter;

    @Test
    void oPapelVemDoBancoENaoDoToken() {
        when(userRepository.findById(7L)).thenReturn(Optional.of(user(7L, UserRole.ADMIN)));
        Jwt jwt = Jwt.withTokenValue("t").header("alg", "HS256").subject("7").claim("role", "FARMER").build();

        AbstractAuthenticationToken auth = converter.convert(jwt);

        List<String> roles = auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        assertEquals(List.of("ROLE_ADMIN"), roles);
    }

    @Test
    void recusaUsuarioSuspenso() {
        User suspended = user(7L, UserRole.FARMER);
        suspended.setStatus(UserStatus.SUSPENDED);
        when(userRepository.findById(7L)).thenReturn(Optional.of(suspended));

        assertThrows(InvalidBearerTokenException.class, () -> converter.convert(jwtOf("7")));
    }

    @Test
    void recusaUsuarioInexistente() {
        when(userRepository.findById(7L)).thenReturn(Optional.empty());

        assertThrows(InvalidBearerTokenException.class, () -> converter.convert(jwtOf("7")));
    }

    @Test
    void recusaIdentificadorQueNaoEhNumero() {
        assertThrows(InvalidBearerTokenException.class, () -> converter.convert(jwtOf("abc")));
        verify(userRepository, never()).findById(any());
    }

    private Jwt jwtOf(String subject) {
        return Jwt.withTokenValue("t").header("alg", "HS256").subject(subject).build();
    }

    private User user(Long id, UserRole role) {
        User user = new User("Nome", "u" + id + "@teste.com", "hash", null, role);
        ReflectionTestUtils.setField(user, "id", id);
        return user;
    }
}