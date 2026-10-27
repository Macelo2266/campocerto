package macelo.dev.campocerto.provider;

import macelo.dev.campocerto.category.Category;
import macelo.dev.campocerto.category.CategoryRepository;
import macelo.dev.campocerto.common.exception.ApiException;
import macelo.dev.campocerto.provider.dto.ProviderProfileRequest;
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
class ProviderProfileServiceTest {

    @Mock
    private ProviderProfileRepository profileRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private ProviderProfileService service;

    private ProviderProfileRequest validRequest() {
        return new ProviderProfileRequest(
                "Zé das Cercas",
                "Faço cercas há 15 anos",
                "(83) 99999-0000",
                "Itaporanga",
                List.of("Patos"),
                List.of(new ProviderProfileRequest.OfferingRequest(1L, "R$ 8 por metro")),
                true
        );
    }

    private User userWithRole(UserRole role) {
        return new User("Fulano", "fulano@teste.com", "hash", null, role);
    }

    @Test
    void recusaCriarPerfilParaQuemNaoEhPrestador() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(userWithRole(UserRole.FARMER)));

        ApiException ex = assertThrows(ApiException.class, () -> service.create(1L, validRequest()));

        assertEquals(HttpStatus.FORBIDDEN, ex.getStatus());
        verify(profileRepository, never()).save(any());
    }

    @Test
    void recusaCriarPerfilParaPrestadorSuspenso() {
        User suspended = userWithRole(UserRole.PROVIDER);
        suspended.setStatus(UserStatus.SUSPENDED);
        when(userRepository.findById(1L)).thenReturn(Optional.of(suspended));

        ApiException ex = assertThrows(ApiException.class, () -> service.create(1L, validRequest()));

        assertEquals(HttpStatus.FORBIDDEN, ex.getStatus());
    }

    @Test
    void recusaSegundoPerfilDoMesmoPrestador() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(userWithRole(UserRole.PROVIDER)));
        when(profileRepository.existsByUserId(1L)).thenReturn(true);

        ApiException ex = assertThrows(ApiException.class, () -> service.create(1L, validRequest()));

        assertEquals(HttpStatus.CONFLICT, ex.getStatus());
        verify(profileRepository, never()).save(any());
    }

    @Test
    void recusaAtualizarQuandoNaoHaPerfil() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(userWithRole(UserRole.PROVIDER)));
        when(profileRepository.findByUserId(1L)).thenReturn(Optional.empty());

        ApiException ex = assertThrows(ApiException.class, () -> service.update(1L, validRequest()));

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatus());
    }

    @Test
    void recusaCategoriaInexistente() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(userWithRole(UserRole.PROVIDER)));
        when(categoryRepository.findAllById(any())).thenReturn(List.of());

        ApiException ex = assertThrows(ApiException.class, () -> service.create(1L, validRequest()));

        assertEquals(HttpStatus.BAD_REQUEST, ex.getStatus());
        verify(profileRepository, never()).save(any());
    }

    @Test
    void recusaCategoriaDesativadaParaQuemAindaNaoOferecia() {
        Category inactive = new Category("Conserto de cercas", "conserto-de-cercas", null);
        ReflectionTestUtils.setField(inactive, "id", 1L);
        inactive.setActive(false);

        when(userRepository.findById(1L)).thenReturn(Optional.of(userWithRole(UserRole.PROVIDER)));
        when(categoryRepository.findAllById(any())).thenReturn(List.of(inactive));

        ApiException ex = assertThrows(ApiException.class, () -> service.create(1L, validRequest()));

        assertEquals(HttpStatus.BAD_REQUEST, ex.getStatus());
    }
}
