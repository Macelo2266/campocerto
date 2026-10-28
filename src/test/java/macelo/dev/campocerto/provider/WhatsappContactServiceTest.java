package macelo.dev.campocerto.provider;

import macelo.dev.campocerto.category.Category;
import macelo.dev.campocerto.common.exception.ApiException;
import macelo.dev.campocerto.provider.dto.WhatsappLinkResponse;
import macelo.dev.campocerto.user.dto.User;
import macelo.dev.campocerto.user.dto.UserRole;
import macelo.dev.campocerto.user.dto.UserStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.test.util.ReflectionTestUtils;


import java.util.List;
import java.util.Optional;

import static org.hibernate.validator.internal.util.Contracts.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.springframework.security.authorization.ConditionalAuthorizationManager.when;


@ExtendWith(MockitoExtension.class)
class WhatsappContactServiceTest {

    private static final Long PROVIDER_ID = 5L;

    @Mock
    private ProviderProfileRepository providerRepository;

    @InjectMocks
    private WhatsappContactService service;

    private User owner;
    private ProviderProfile provider;

    @BeforeEach
    void setUp() {
        owner = new User("Zé", "ze@teste.com", "hash", null, UserRole.PROVIDER);

        Category fencing = new Category("Construção de cercas", "construcao-de-cercas", null);
        ReflectionTestUtils.setField(fencing, "id", 10L);

        provider = new ProviderProfile(owner, "Zé das Cercas", null, "5583999990001", "Itaporanga", true);
        ReflectionTestUtils.setField(provider, "id", PROVIDER_ID);
        provider.syncOfferings(List.of(new ProviderProfile.OfferingInput(fencing, null)));
    }

    @Test
    void geraLinkGenericoSemCategoria() {
        when(providerRepository.findById(PROVIDER_ID)).thenReturn(Optional.of(provider));

        WhatsappLinkResponse response = service.buildLink(PROVIDER_ID, null);

        assertTrue(response.url().startsWith("https://wa.me/5583999990001?text="));
        assertTrue(response.message().contains("Zé das Cercas"));
    }

    @Test
    void incluiOServicoQuandoInformado() {
        when(providerRepository.findById(PROVIDER_ID)).thenReturn(Optional.of(provider));

        WhatsappLinkResponse response = service.buildLink(PROVIDER_ID, 10L);

        assertTrue(response.message().contains("Construção de cercas"));
    }

    @Test
    void recusaServicoQueOPrestadorNaoOferece() {
        when(providerRepository.findById(PROVIDER_ID)).thenReturn(Optional.of(provider));

        ApiException ex = assertThrows(ApiException.class, () -> service.buildLink(PROVIDER_ID, 99L));

        assertEquals(HttpStatus.BAD_REQUEST, ex.getStatus());
    }

    @Test
    void recusaPrestadorIndisponivel() {
        ProviderProfile unavailable = new ProviderProfile(
                owner, "Zé das Cercas", null, "5583999990001", "Itaporanga", false);
        when(providerRepository.findById(PROVIDER_ID)).thenReturn(Optional.of(unavailable));

        ApiException ex = assertThrows(ApiException.class, () -> service.buildLink(PROVIDER_ID, null));

        assertEquals(HttpStatus.CONFLICT, ex.getStatus());
    }

    @Test
    void prestadorSuspensoNaoExisteParaOPublico() {
        owner.setStatus(UserStatus.SUSPENDED);
        when(providerRepository.findById(PROVIDER_ID)).thenReturn(Optional.of(provider));

        ApiException ex = assertThrows(ApiException.class, () -> service.buildLink(PROVIDER_ID, null));

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatus());
    }

    @Test
    void prestadorInexistenteDa404() {
        when(providerRepository.findById(PROVIDER_ID)).thenReturn(Optional.empty());

        ApiException ex = assertThrows(ApiException.class, () -> service.buildLink(PROVIDER_ID, null));

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatus());
    }
}