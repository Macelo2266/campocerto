package macelo.dev.campocerto.review;

import macelo.dev.campocerto.category.Category;
import macelo.dev.campocerto.common.exception.ApiException;
import macelo.dev.campocerto.provider.ProviderProfile;
import macelo.dev.campocerto.provider.ProviderProfileRepository;
import macelo.dev.campocerto.review.dto.ReviewCreateRequest;
import macelo.dev.campocerto.service.RequestActor;
import macelo.dev.campocerto.service.ServiceRequest;
import macelo.dev.campocerto.service.ServiceRequestRepository;
import macelo.dev.campocerto.service.ServiceRequestStatus;
import macelo.dev.campocerto.user.UserService;
import macelo.dev.campocerto.user.dto.User;
import macelo.dev.campocerto.user.dto.UserRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.test.util.ReflectionTestUtils;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.security.authorization.ConditionalAuthorizationManager.when;
import static sun.java2d.cmm.ProfileDataVerifier.verify;

@ExtendWith(MockitoExtension.class)
class ReviewServiceTest {

    private static final Long FARMER_ID = 1L;
    private static final Long PROVIDER_USER_ID = 2L;
    private static final Long OUTSIDER_ID = 3L;
    private static final Long PROVIDER_ID = 5L;
    private static final Long REQUEST_ID = 100L;

    @Mock
    private ReviewRepository reviewRepository;

    @Mock
    private ServiceRequestRepository requestRepository;

    @Mock
    private ProviderProfileRepository providerRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private ReviewService service;

    private User farmer;
    private User providerOwner;
    private ProviderProfile provider;

    @BeforeEach
    void setUp() {
        farmer = user(FARMER_ID, "João da Silva", UserRole.FARMER);
        providerOwner = user(PROVIDER_USER_ID, "Zé", UserRole.PROVIDER);

        Category fencing = new Category("Construção de cercas", "construcao-de-cercas", null);
        ReflectionTestUtils.setField(fencing, "id", 10L);

        provider = new ProviderProfile(providerOwner, "Zé das Cercas", null,
                "5583999990000", "Itaporanga", true);
        ReflectionTestUtils.setField(provider, "id", PROVIDER_ID);
        provider.syncOfferings(List.of(new ProviderProfile.OfferingInput(fencing, null)));
    }

    @Test
    void estranhoNaoAvaliaSolicitacaoDeOutraPessoa() {
        when(userService.requireActiveUser(OUTSIDER_ID)).thenReturn(user(OUTSIDER_ID, "Outro", UserRole.FARMER));
        when(requestRepository.findWithDetailsById(REQUEST_ID)).thenReturn(Optional.of(request(true)));

        ApiException ex = assertThrows(ApiException.class,
                () -> service.create(OUTSIDER_ID, REQUEST_ID, body(5)));

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatus());
        verify(reviewRepository, never()).saveAndFlush(any());
    }

    @Test
    void prestadorNaoPodeAvaliarASiMesmo() {
        when(userService.requireActiveUser(PROVIDER_USER_ID)).thenReturn(providerOwner);
        when(requestRepository.findWithDetailsById(REQUEST_ID)).thenReturn(Optional.of(request(true)));

        ApiException ex = assertThrows(ApiException.class,
                () -> service.create(PROVIDER_USER_ID, REQUEST_ID, body(5)));

        assertEquals(HttpStatus.FORBIDDEN, ex.getStatus());
        verify(reviewRepository, never()).saveAndFlush(any());
    }

    @Test
    void recusaAvaliarSolicitacaoNaoConcluida() {
        when(userService.requireActiveUser(FARMER_ID)).thenReturn(farmer);
        when(requestRepository.findWithDetailsById(REQUEST_ID)).thenReturn(Optional.of(request(false)));

        ApiException ex = assertThrows(ApiException.class,
                () -> service.create(FARMER_ID, REQUEST_ID, body(5)));

        assertEquals(HttpStatus.CONFLICT, ex.getStatus());
        verify(reviewRepository, never()).saveAndFlush(any());
    }

    @Test
    void recusaSegundaAvaliacaoDaMesmaSolicitacao() {
        when(userService.requireActiveUser(FARMER_ID)).thenReturn(farmer);
        when(requestRepository.findWithDetailsById(REQUEST_ID)).thenReturn(Optional.of(request(true)));
        when(reviewRepository.existsByServiceRequestId(REQUEST_ID)).thenReturn(true);

        ApiException ex = assertThrows(ApiException.class,
                () -> service.create(FARMER_ID, REQUEST_ID, body(5)));

        assertEquals(HttpStatus.CONFLICT, ex.getStatus());
        verify(reviewRepository, never()).saveAndFlush(any());
    }

    @Test
    void criaAvaliacaoEAtualizaAMediaDoPrestador() {
        when(userService.requireActiveUser(FARMER_ID)).thenReturn(farmer);
        when(requestRepository.findWithDetailsById(REQUEST_ID)).thenReturn(Optional.of(request(true)));
        when(reviewRepository.saveAndFlush(any())).thenAnswer(invocation -> invocation.getArgument(0));
        when(providerRepository.findForUpdateById(PROVIDER_ID)).thenReturn(Optional.of(provider));
        when(reviewRepository.countByProviderIdAndStatus(PROVIDER_ID, ReviewStatus.VISIBLE)).thenReturn(3L);
        when(reviewRepository.averageRating(PROVIDER_ID, ReviewStatus.VISIBLE)).thenReturn(4.3333333);

        ReviewResponse response = service.create(FARMER_ID, REQUEST_ID, new ReviewCreateRequest(5, "  Muito bom  "));

        assertEquals(5, response.rating());
        assertEquals("Muito bom", response.comment());
        assertEquals("João", response.reviewerName(), "só o primeiro nome é público");
        assertEquals("Construção de cercas", response.serviceName());
        assertEquals(3, provider.getRatingCount());
        assertEquals(new BigDecimal("4.33"), provider.getRatingAvg());
    }

    @Test
    void semAvaliacoesVisiveisAMediaVoltaAZero() {
        provider.applyRating(new BigDecimal("4.50"), 2);
        when(providerRepository.findForUpdateById(PROVIDER_ID)).thenReturn(Optional.of(provider));
        when(reviewRepository.countByProviderIdAndStatus(PROVIDER_ID, ReviewStatus.VISIBLE)).thenReturn(0L);
        when(reviewRepository.averageRating(PROVIDER_ID, ReviewStatus.VISIBLE)).thenReturn(null);

        service.refreshProviderRating(PROVIDER_ID);

        assertEquals(0, provider.getRatingCount());
        assertEquals(0, provider.getRatingAvg().compareTo(BigDecimal.ZERO));
    }

    // ---------- dados de teste ----------

    private
    ReviewCreateRequest body(int rating) {
        return new ReviewCreateRequest(rating, null);
    }

    private ServiceRequest request(boolean completed) {
        Category category = provider.getOfferings().iterator().next().getCategory();
        ServiceRequest request = new ServiceRequest(
                farmer, provider, category, "Preciso de 300 metros de cerca", "Itaporanga", null, null);
        ReflectionTestUtils.setField(request, "id", REQUEST_ID);

        if (completed) {
            request.changeStatus(ServiceRequestStatus.EM_NEGOCIACAO, RequestActor.PROVIDER);
            request.changeStatus(ServiceRequestStatus.ACEITA, RequestActor.PROVIDER);
            request.changeStatus(ServiceRequestStatus.EM_ANDAMENTO, RequestActor.PROVIDER);
            request.changeStatus(ServiceRequestStatus.CONCLUIDA, RequestActor.PROVIDER);
        }
        return request;
    }

    private User user(Long id, String name, UserRole role) {
        User user = new User(name, "u" + id + "@teste.com", "hash", null, role);
        ReflectionTestUtils.setField(user, "id", id);
        return user;
    }
}