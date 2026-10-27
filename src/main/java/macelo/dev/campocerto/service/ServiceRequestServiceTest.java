package macelo.dev.campocerto.service;

import macelo.dev.campocerto.category.Category;
import macelo.dev.campocerto.common.exception.ApiException;
import macelo.dev.campocerto.provider.ProviderProfile;
import macelo.dev.campocerto.provider.ProviderProfileRepository;
import macelo.dev.campocerto.service.dto.ServiceRequestCreateRequest;
import macelo.dev.campocerto.service.dto.ServiceRequestResponse;
import macelo.dev.campocerto.user.UserService;
import macelo.dev.campocerto.user.dto.User;
import macelo.dev.campocerto.user.dto.UserRole;
import macelo.dev.campocerto.user.dto.UserStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.Clock;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

import static org.hibernate.query.restriction.Restriction.any;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.security.authorization.ConditionalAuthorizationManager.when;
import static sun.java2d.cmm.ProfileDataVerifier.verify;

@ExtendWith(MockitoExtension.class)
class ServiceRequestServiceTest {

    private static final Long FARMER_ID = 1L;
    private static final Long PROVIDER_USER_ID = 2L;
    private static final Long OUTSIDER_ID = 3L;
    private static final Long PROVIDER_ID = 5L;
    private static final Long CATEGORY_ID = 10L;

    @Mock
    private ServiceRequestRepository requestRepository;

    @Mock
    private ProviderProfileRepository providerRepository;

    @Mock
    private UserService userService;

    // 23/10/2026, 12h em Fortaleza
    private final Clock clock = Clock.fixed(Instant.parse("2026-10-23T15:00:00Z"), ZoneId.of("America/Fortaleza"));

    private ServiceRequestService service;
    private User farmer;
    private User providerOwner;
    private Category fencing;
    private ProviderProfile provider;

    @BeforeEach
    void setUp() {
        service = new ServiceRequestService(requestRepository, providerRepository, userService, clock);
        farmer = user(FARMER_ID, UserRole.FARMER);
        providerOwner = user(PROVIDER_USER_ID, UserRole.PROVIDER);
        fencing = category(CATEGORY_ID, true);
        provider = profile(PROVIDER_ID, providerOwner, fencing, true);
    }

    // ---------- criação ----------

    @Test
    void recusaQuemNaoEhAgricultor() {
        when(userService.requireActiveUser(PROVIDER_USER_ID)).thenReturn(providerOwner);

        ApiException ex = assertThrows(ApiException.class,
                () -> service.create(PROVIDER_USER_ID, createRequest(CATEGORY_ID, null)));

        assertEquals(HttpStatus.FORBIDDEN, ex.getStatus());
        verify(requestRepository, never()).saveAndFlush(any());
    }

    @Test
    void recusaPrestadorInexistenteOuSuspenso() {
        providerOwner.setStatus(UserStatus.SUSPENDED);
        when(userService.requireActiveUser(FARMER_ID)).thenReturn(farmer);
        when(providerRepository.findById(PROVIDER_ID)).thenReturn(Optional.of(provider));

        ApiException ex = assertThrows(ApiException.class,
                () -> service.create(FARMER_ID, createRequest(CATEGORY_ID, null)));

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatus());
    }

    @Test
    void recusaPrestadorIndisponivel() {
        ProviderProfile unavailable = profile(PROVIDER_ID, providerOwner, fencing, false);
        when(userService.requireActiveUser(FARMER_ID)).thenReturn(farmer);
        when(providerRepository.findById(PROVIDER_ID)).thenReturn(Optional.of(unavailable));

        ApiException ex = assertThrows(ApiException.class,
                () -> service.create(FARMER_ID, createRequest(CATEGORY_ID, null)));

        assertEquals(HttpStatus.CONFLICT, ex.getStatus());
    }

    @Test
    void recusaServicoQueOPrestadorNaoOferece() {
        when(userService.requireActiveUser(FARMER_ID)).thenReturn(farmer);
        when(providerRepository.findById(PROVIDER_ID)).thenReturn(Optional.of(provider));

        ApiException ex = assertThrows(ApiException.class,
                () -> service.create(FARMER_ID, createRequest(99L, null)));

        assertEquals(HttpStatus.BAD_REQUEST, ex.getStatus());
    }

    @Test
    void recusaDataNoPassado() {
        when(userService.requireActiveUser(FARMER_ID)).thenReturn(farmer);
        when(providerRepository.findById(PROVIDER_ID)).thenReturn(Optional.of(provider));

        ApiException ex = assertThrows(ApiException.class,
                () -> service.create(FARMER_ID, createRequest(CATEGORY_ID, LocalDate.of(2026, 10, 22))));

        assertEquals(HttpStatus.BAD_REQUEST, ex.getStatus());
    }

    @Test
    void recusaSolicitacaoDuplicadaEmAberto() {
        when(userService.requireActiveUser(FARMER_ID)).thenReturn(farmer);
        when(providerRepository.findById(PROVIDER_ID)).thenReturn(Optional.of(provider));
        when(requestRepository.existsByRequesterIdAndProviderIdAndCategoryIdAndStatusIn(
                eq(FARMER_ID), eq(PROVIDER_ID), eq(CATEGORY_ID), any())).thenReturn(true);

        ApiException ex = assertThrows(ApiException.class,
                () -> service.create(FARMER_ID, createRequest(CATEGORY_ID, null)));

        assertEquals(HttpStatus.CONFLICT, ex.getStatus());
        verify(requestRepository, never()).saveAndFlush(any());
    }

    @Test
    void recusaQuandoHaMuitasPendentes() {
        when(userService.requireActiveUser(FARMER_ID)).thenReturn(farmer);
        when(providerRepository.findById(PROVIDER_ID)).thenReturn(Optional.of(provider));
        when(requestRepository.countByRequesterIdAndStatus(FARMER_ID, ServiceRequestStatus.PENDENTE))
                .thenReturn(10L);

        ApiException ex = assertThrows(ApiException.class,
                () -> service.create(FARMER_ID, createRequest(CATEGORY_ID, null)));

        assertEquals(HttpStatus.TOO_MANY_REQUESTS, ex.getStatus());
    }

    @Test
    void criaSolicitacaoPendenteComDataDeHoje() {
        when(userService.requireActiveUser(FARMER_ID)).thenReturn(farmer);
        when(providerRepository.findById(PROVIDER_ID)).thenReturn(Optional.of(provider));
        when(requestRepository.saveAndFlush(any())).thenAnswer(invocation -> invocation.getArgument(0));

        ServiceRequestResponse response = service.create(FARMER_ID,
                createRequest(CATEGORY_ID, LocalDate.of(2026, 10, 23)));

        assertEquals(ServiceRequestStatus.PENDENTE, response.status());
        assertEquals(List.of(ServiceRequestStatus.CANCELADA), response.availableTransitions());
        assertNull(response.requester(), "o agricultor não recebe os próprios dados de volta");
    }

    // ---------- leitura e mudança de status ----------

    @Test
    void estranhoNaoEnxergaASolicitacao() {
        when(requestRepository.findWithDetailsById(100L)).thenReturn(Optional.of(existingRequest()));

        ApiException ex = assertThrows(ApiException.class, () -> service.get(OUTSIDER_ID, 100L));

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatus());
    }

    @Test
    void prestadorVeDadosDoAgricultorEAgricultorNao() {
        when(requestRepository.findWithDetailsById(100L)).thenReturn(Optional.of(existingRequest()));

        assertEquals("Nome 1", service.get(PROVIDER_USER_ID, 100L).requester().name());
        assertNull(service.get(FARMER_ID, 100L).requester());
    }

    @Test
    void prestadorInicianegociacao() {
        when(userService.requireActiveUser(PROVIDER_USER_ID)).thenReturn(providerOwner);
        when(requestRepository.findWithDetailsById(100L)).thenReturn(Optional.of(existingRequest()));

        ServiceRequestResponse response =
                service.changeStatus(PROVIDER_USER_ID, 100L, ServiceRequestStatus.EM_NEGOCIACAO);

        assertEquals(ServiceRequestStatus.EM_NEGOCIACAO, response.status());
        assertEquals(List.of(ServiceRequestStatus.ACEITA, ServiceRequestStatus.CANCELADA),
                response.availableTransitions());
    }

    @Test
    void agricultorNaoPodeIniciarNegociacao() {
        when(userService.requireActiveUser(FARMER_ID)).thenReturn(farmer);
        when(requestRepository.findWithDetailsById(100L)).thenReturn(Optional.of(existingRequest()));

        ApiException ex = assertThrows(ApiException.class,
                () -> service.changeStatus(FARMER_ID, 100L, ServiceRequestStatus.EM_NEGOCIACAO));

        assertEquals(HttpStatus.FORBIDDEN, ex.getStatus());
        verify(requestRepository, never()).saveAndFlush(any());
    }

    @Test
    void recusaPularEtapas() {
        when(userService.requireActiveUser(PROVIDER_USER_ID)).thenReturn(providerOwner);
        when(requestRepository.findWithDetailsById(100L)).thenReturn(Optional.of(existingRequest()));

        ApiException ex = assertThrows(ApiException.class,
                () -> service.changeStatus(PROVIDER_USER_ID, 100L, ServiceRequestStatus.CONCLUIDA));

        assertEquals(HttpStatus.CONFLICT, ex.getStatus());
    }

    @Test
    void agricultorCancelaESolicitacaoFicaSemAcoes() {
        when(userService.requireActiveUser(FARMER_ID)).thenReturn(farmer);
        when(requestRepository.findWithDetailsById(100L)).thenReturn(Optional.of(existingRequest()));

        ServiceRequestResponse response =
                service.changeStatus(FARMER_ID, 100L, ServiceRequestStatus.CANCELADA);

        assertEquals(ServiceRequestStatus.CANCELADA, response.status());
        assertEquals(List.of(), response.availableTransitions());
    }

    @Test
    void estranhoNaoConsegueMudarStatus() {
        when(userService.requireActiveUser(OUTSIDER_ID)).thenReturn(user(OUTSIDER_ID, UserRole.PROVIDER));
        when(requestRepository.findWithDetailsById(100L)).thenReturn(Optional.of(existingRequest()));

        ApiException ex = assertThrows(ApiException.class,
                () -> service.changeStatus(OUTSIDER_ID, 100L, ServiceRequestStatus.CANCELADA));

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatus());
        verify(requestRepository, never()).saveAndFlush(any());
    }

    // ---------- fábricas de dados de teste ----------

    private ServiceRequestCreateRequest createRequest(Long categoryId, LocalDate date) {
        return new ServiceRequestCreateRequest(
                PROVIDER_ID, categoryId, "Preciso de 300 metros de cerca", "Itaporanga", date, null);
    }

    private ServiceRequest existingRequest() {
        ServiceRequest request = new ServiceRequest(
                farmer, provider, fencing, "Preciso de 300 metros de cerca", "Itaporanga", null, null);
        ReflectionTestUtils.setField(request, "id", 100L);
        return request;
    }

    private User user(Long id, UserRole role) {
        User user = new User("Nome " + id, "u" + id + "@teste.com", "hash", "83999990000", role);
        ReflectionTestUtils.setField(user, "id", id);
        return user;
    }

    private Category category(Long id, boolean active) {
        Category category = new Category("Construção de cercas", "construcao-de-cercas", null);
        ReflectionTestUtils.setField(category, "id", id);
        category.setActive(active);
        return category;
    }

    private ProviderProfile profile(Long id, User owner, Category category, boolean available) {
        ProviderProfile profile = new ProviderProfile(
                owner, "Zé das Cercas", null, "5583999990000", "Itaporanga", available);
        ReflectionTestUtils.setField(profile, "id", id);
        profile.syncOfferings(List.of(new ProviderProfile.OfferingInput(category, null)));
        return profile;
    }
}