package macelo.dev.campocerto.common.bootstrap;

import macelo.dev.campocerto.common.config.AppProperties;
import macelo.dev.campocerto.user.UserRepository;
import macelo.dev.campocerto.user.dto.User;
import macelo.dev.campocerto.user.dto.UserRole;
import macelo.dev.campocerto.user.dto.UserStatus;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.hibernate.query.restriction.Restriction.any;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.security.authorization.ConditionalAuthorizationManager.when;
import static sun.java2d.cmm.ProfileDataVerifier.verify;

@ExtendWith(MockitoExtension.class)
class AdminBootstrapTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    private AdminBootstrap bootstrap(String email, String password) {
        AppProperties properties = new AppProperties(
                null, null, new AppProperties.Admin(email, password, "Administrador"));
        return new AdminBootstrap(userRepository, passwordEncoder, properties);
    }

    @Test
    void semConfiguracaoNaoFazNada() {
        bootstrap("", "").run(null);

        verifyNoInteractions(userRepository);
    }

    @Test
    void criaOAdministradorQuandoNaoExisteNenhum() {
        when(passwordEncoder.encode("senha-forte-123")).thenReturn("hash");

        bootstrap("Admin@Teste.com", "senha-forte-123").run(null);

        ArgumentCaptor<User> saved = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(saved.capture());
        assertEquals(UserRole.ADMIN, saved.getValue().getRole());
        assertEquals("admin@teste.com", saved.getValue().getEmail());
        assertEquals("hash", saved.getValue().getPasswordHash());
        assertEquals(UserStatus.ACTIVE, saved.getValue().getStatus());
    }

    @Test
    void naoCriaUmSegundoAdministrador() {
        when(userRepository.existsByRole(UserRole.ADMIN)).thenReturn(true);

        bootstrap("admin@teste.com", "senha-forte-123").run(null);

        verify(userRepository, never()).save(any());
        verifyNoInteractions(passwordEncoder);
    }

    @Test
    void recusaSenhaFraca() {
        assertThrows(IllegalStateException.class, () -> bootstrap("admin@teste.com", "curta").run(null));

        verify(userRepository, never()).save(any());
    }

    @Test
    void recusaConfiguracaoIncompleta() {
        assertThrows(IllegalStateException.class, () -> bootstrap("admin@teste.com", "").run(null));
        assertThrows(IllegalStateException.class, () -> bootstrap("", "senha-forte-123").run(null));
    }

    @Test
    void recusaEmailJaUsadoPorContaComum() {
        when(userRepository.existsByEmailIgnoreCase("joao@teste.com")).thenReturn(true);

        assertThrows(IllegalStateException.class,
                () -> bootstrap("joao@teste.com", "senha-forte-123").run(null));

        verify(userRepository, never()).save(any());
    }
}
