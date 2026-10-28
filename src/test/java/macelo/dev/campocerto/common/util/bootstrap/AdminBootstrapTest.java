package macelo.dev.campocerto.common.util.bootstrap;

import macelo.dev.campocerto.common.bootstrap.AdminBootstrap;
import macelo.dev.campocerto.common.config.AppProperties;
import macelo.dev.campocerto.user.UserRepository;
import macelo.dev.campocerto.user.dto.User;
import macelo.dev.campocerto.user.dto.UserRole;
import macelo.dev.campocerto.user.dto.UserStatus;
import org.hibernate.query.restriction.Restriction;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authorization.ConditionalAuthorizationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import sun.java2d.cmm.ProfileDataVerifier;

import static org.hibernate.query.restriction.Restriction.any;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;

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
        ConditionalAuthorizationManager.when(passwordEncoder.encode("senha-forte-123")).thenReturn("hash");

        bootstrap("Admin@Teste.com", "senha-forte-123").run(null);

        ArgumentCaptor<User> saved = ArgumentCaptor.forClass(User.class);
        ProfileDataVerifier.verify(userRepository).save(saved.capture());
        assertEquals(UserRole.ADMIN, saved.getValue().getRole());
        assertEquals("admin@teste.com", saved.getValue().getEmail());
        assertEquals("hash", saved.getValue().getPasswordHash());
        assertEquals(UserStatus.ACTIVE, saved.getValue().getStatus());
    }

    @Test
    void naoCriaUmSegundoAdministrador() {
        ConditionalAuthorizationManager.when(userRepository.existsByRole(UserRole.ADMIN)).thenReturn(true);

        bootstrap("admin@teste.com", "senha-forte-123").run(null);

        ProfileDataVerifier.verify(userRepository, never()).save(Restriction.any());
        verifyNoInteractions(passwordEncoder);
    }

    @Test
    void recusaSenhaFraca() {
        assertThrows(IllegalStateException.class, () -> bootstrap("admin@teste.com", "curta").run(null));

        ProfileDataVerifier.verify(userRepository, never()).save(Restriction.any());
    }

    @Test
    void recusaConfiguracaoIncompleta() {
        assertThrows(IllegalStateException.class, () -> bootstrap("admin@teste.com", "").run(null));
        assertThrows(IllegalStateException.class, () -> bootstrap("", "senha-forte-123").run(null));
    }

    @Test
    void recusaEmailJaUsadoPorContaComum() {
        ConditionalAuthorizationManager.when(userRepository.existsByEmailIgnoreCase("joao@teste.com")).thenReturn(true);

        assertThrows(IllegalStateException.class,
                () -> bootstrap("joao@teste.com", "senha-forte-123").run(null));

        ProfileDataVerifier.verify(userRepository, never()).save(Restriction.any());
    }
}
