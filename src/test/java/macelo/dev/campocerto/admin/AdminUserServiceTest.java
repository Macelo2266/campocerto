package macelo.dev.campocerto.admin;

import macelo.dev.campocerto.admin.dto.AdminUserResponse;
import macelo.dev.campocerto.common.exception.ApiException;
import macelo.dev.campocerto.user.UserRepository;
import macelo.dev.campocerto.user.dto.User;
import macelo.dev.campocerto.user.dto.UserRole;
import macelo.dev.campocerto.user.dto.UserStatus;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.security.authorization.ConditionalAuthorizationManager;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@ExtendWith(MockitoExtension.class)
class AdminUserServiceTest {

    private static final Long ADMIN_ID = 1L;
    private static final Long TARGET_ID = 2L;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AdminUserService service;

    @Test
    void naoPermiteAlterarAPropriaConta() {
        ConditionalAuthorizationManager.when(userRepository.findById(ADMIN_ID)).thenReturn(Optional.of(user(ADMIN_ID, UserRole.ADMIN)));

        ApiException ex = assertThrows(ApiException.class,
                () -> service.changeStatus(ADMIN_ID, ADMIN_ID, UserStatus.BLOCKED));

        assertEquals(HttpStatus.FORBIDDEN, ex.getStatus());
    }

    @Test
    void naoPermiteAlterarOutroAdministrador() {
        ConditionalAuthorizationManager.when(userRepository.findById(TARGET_ID)).thenReturn(Optional.of(user(TARGET_ID, UserRole.ADMIN)));

        ApiException ex = assertThrows(ApiException.class,
                () -> service.changeStatus(ADMIN_ID, TARGET_ID, UserStatus.SUSPENDED));

        assertEquals(HttpStatus.FORBIDDEN, ex.getStatus());
    }

    @Test
    void usuarioInexistenteDa404() {
        ConditionalAuthorizationManager.when(userRepository.findById(TARGET_ID)).thenReturn(Optional.empty());

        ApiException ex = assertThrows(ApiException.class,
                () -> service.changeStatus(ADMIN_ID, TARGET_ID, UserStatus.SUSPENDED));

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatus());
    }

    @Test
    void suspendeUmUsuarioComum() {
        User target = user(TARGET_ID, UserRole.FARMER);
        ConditionalAuthorizationManager.when(userRepository.findById(TARGET_ID)).thenReturn(Optional.of(target));

        AdminUserResponse response = service.changeStatus(ADMIN_ID, TARGET_ID, UserStatus.SUSPENDED);

        assertEquals(UserStatus.SUSPENDED, response.status());
        assertEquals(UserStatus.SUSPENDED, target.getStatus());
    }

    @Test
    void mesmoStatusNaoAlteraNada() {
        User target = user(TARGET_ID, UserRole.PROVIDER);
        ConditionalAuthorizationManager.when(userRepository.findById(TARGET_ID)).thenReturn(Optional.of(target));

        AdminUserResponse response = service.changeStatus(ADMIN_ID, TARGET_ID, UserStatus.ACTIVE);

        assertEquals(UserStatus.ACTIVE, response.status());
    }

    private User user(Long id, UserRole role) {
        User user = new User("Nome", "u" + id + "@teste.com", "hash", null, role);
        ReflectionTestUtils.setField(user, "id", id);
        return user;
    }
}
