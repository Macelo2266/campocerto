package macelo.dev.campocerto.service;

mport org.springframework.dao.DataIntegrityViolationException;
import macelo.dev.campocerto.category.Category;
import macelo.dev.campocerto.common.dto.PageResponse;
import macelo.dev.campocerto.common.exception.ApiException;
import macelo.dev.campocerto.common.util.PageUtils;
import macelo.dev.campocerto.provider.ProviderOffering;
import macelo.dev.campocerto.provider.ProviderProfile;
import macelo.dev.campocerto.provider.ProviderProfileRepository;
import macelo.dev.campocerto.service.dto.ServiceRequestCreateRequest;
import macelo.dev.campocerto.service.dto.ServiceRequestResponse;
import macelo.dev.campocerto.user.UserService;
import macelo.dev.campocerto.user.dto.User;
import macelo.dev.campocerto.user.dto.UserRole;
import macelo.dev.campocerto.user.dto.UserStatus;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDate;

@Service
public class ServiceRequestService {

    private static final int MAX_PENDING_PER_REQUESTER = 10;
    private static final int MIN_DESCRIPTION_LENGTH = 10;
    private static final String DUPLICATE_MESSAGE =
            "Você já tem uma solicitação em aberto para este serviço com este prestador";
    private static final Sort NEWEST_FIRST = Sort.by(Sort.Order.desc("createdAt"), Sort.Order.desc("id"));

    private record Access(ServiceRequest request, RequestActor actor) {
    }

    private final ServiceRequestRepository requestRepository;
    private final ProviderProfileRepository providerRepository;
    private final UserService userService;
    private final Clock clock;

    public ServiceRequestService(ServiceRequestRepository requestRepository,
                                 ProviderProfileRepository providerRepository,
                                 UserService userService,
                                 Clock clock) {
        this.requestRepository = requestRepository;
        this.providerRepository = providerRepository;
        this.userService = userService;
        this.clock = clock;
    }

    @Transactional
    public ServiceRequestResponse create(Long userId, ServiceRequestCreateRequest request) {
        User requester = userService.requireActiveUser(userId);
        if (requester.getRole() != UserRole.FARMER) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Apenas agricultores podem solicitar orçamentos");
        }

        ProviderProfile provider = providerRepository.findById(request.providerId())
                .filter(found -> found.getUser().getStatus() == UserStatus.ACTIVE)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Prestador não encontrado"));

        if (!provider.isAvailable()) {
            throw new ApiException(HttpStatus.CONFLICT, "Este prestador não está disponível no momento");
        }

        // A categoria sai das ofertas do próprio prestador: ele só recebe pedidos do que faz
        Category category = provider.getOfferings().stream()
                .map(ProviderOffering::getCategory)
                .filter(candidate -> candidate.getId().equals(request.categoryId()))
                .findFirst()
                .orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST,
                        "Este prestador não oferece o serviço selecionado"));

        if (!category.isActive()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Este serviço não está disponível no momento");
        }

        String description = request.description().trim();
        if (description.length() < MIN_DESCRIPTION_LENGTH) {
            throw new ApiException(HttpStatus.BAD_REQUEST,
                    "Descreva o trabalho com pelo menos " + MIN_DESCRIPTION_LENGTH + " caracteres");
        }

        LocalDate today = LocalDate.now(clock);
        if (request.desiredDate() != null && request.desiredDate().isBefore(today)) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "A data desejada não pode estar no passado");
        }

        if (requestRepository.existsByRequesterIdAndProviderIdAndCategoryIdAndStatusIn(
                userId, provider.getId(), category.getId(), ServiceRequestStatus.openStatuses())) {
            throw new ApiException(HttpStatus.CONFLICT, DUPLICATE_MESSAGE);
        }

        if (requestRepository.countByRequesterIdAndStatus(userId, ServiceRequestStatus.PENDENTE)
                >= MAX_PENDING_PER_REQUESTER) {
            throw new ApiException(HttpStatus.TOO_MANY_REQUESTS,
                    "Você atingiu o limite de solicitações pendentes. Aguarde as respostas dos prestadores.");
        }

        ServiceRequest entity = new ServiceRequest(
                requester, provider, category,
                description,
                request.city().trim(),
                request.desiredDate(),
                blankToNull(request.additionalInfo())
        );

        try {
            requestRepository.saveAndFlush(entity);
        } catch (DataIntegrityViolationException e) {
            // Dois cliques simultâneos: o índice único parcial do banco barrou o segundo
            throw new ApiException(HttpStatus.CONFLICT, DUPLICATE_MESSAGE);
        }

        return ServiceRequestResponse.from(entity, RequestActor.REQUESTER);
    }

    @Transactional(readOnly = true)
    public PageResponse<ServiceRequestResponse> listMine(Long userId, ServiceRequestStatus status,
                                                         int page, int size) {
        Pageable pageable = PageUtils.pageable(page, size, NEWEST_FIRST);

        Page<ServiceRequest> result = status == null
                ? requestRepository.findByRequesterId(userId, pageable)
                : requestRepository.findByRequesterIdAndStatus(userId, status, pageable);

        return PageResponse.from(result, item -> ServiceRequestResponse.from(item, RequestActor.REQUESTER));
    }

    @Transactional(readOnly = true)
    public PageResponse<ServiceRequestResponse> listReceived(Long providerUserId, ServiceRequestStatus status,
                                                             int page, int size) {
        Pageable pageable = PageUtils.pageable(page, size, NEWEST_FIRST);

        Page<ServiceRequest> result = status == null
                ? requestRepository.findByProviderUserId(providerUserId, pageable)
                : requestRepository.findByProviderUserIdAndStatus(providerUserId, status, pageable);

        return PageResponse.from(result, item -> ServiceRequestResponse.from(item, RequestActor.PROVIDER));
    }

    @Transactional(readOnly = true)
    public ServiceRequestResponse get(Long userId, Long requestId) {
        Access access = loadForParticipant(userId, requestId);
        return ServiceRequestResponse.from(access.request(), access.actor());
    }

    @Transactional
    public ServiceRequestResponse changeStatus(Long userId, Long requestId, ServiceRequestStatus target) {
        userService.requireActiveUser(userId);

        Access access = loadForParticipant(userId, requestId);
        access.request().changeStatus(target, access.actor());

        // Descarrega agora: o updatedAt e o version já estão atualizados na resposta,
        // e um conflito de concorrência estoura aqui dentro, e não só no commit.
        requestRepository.saveAndFlush(access.request());

        return ServiceRequestResponse.from(access.request(), access.actor());
    }

    // "Não existe" e "não é sua" devolvem exatamente a mesma resposta (404)
    private Access loadForParticipant(Long userId, Long requestId) {
        ServiceRequest request = requestRepository.findWithDetailsById(requestId)
                .orElseThrow(ServiceRequestService::notFound);

        RequestActor actor = request.roleOf(userId).orElseThrow(ServiceRequestService::notFound);

        return new Access(request, actor);
    }

    private static ApiException notFound() {
        return new ApiException(HttpStatus.NOT_FOUND, "Solicitação não encontrada");
    }

    private String blankToNull(String text) {
        if (text == null || text.isBlank()) {
            return null;
        }
        return text.trim();
    }
}