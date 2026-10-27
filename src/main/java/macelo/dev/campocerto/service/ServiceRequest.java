package macelo.dev.campocerto.service;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import macelo.dev.campocerto.category.Category;
import macelo.dev.campocerto.common.exception.ApiException;
import macelo.dev.campocerto.provider.ProviderProfile;
import macelo.dev.campocerto.user.dto.User;
import org.springframework.http.HttpStatus;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Optional;

@Entity
@Table(name = "service_requests")
public class ServiceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "requester_id", nullable = false, updatable = false)
    private User requester;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "provider_id", nullable = false, updatable = false)
    private ProviderProfile provider;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false, updatable = false)
    private Category category;

    @Column(nullable = false, length = 2000)
    private String description;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(name = "desired_date")
    private LocalDate desiredDate;

    @Column(name = "additional_info", length = 1000)
    private String additionalInfo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ServiceRequestStatus status;

    @Version
    @Column(nullable = false)
    private long version;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    protected ServiceRequest() {
    }

    public ServiceRequest(User requester, ProviderProfile provider, Category category,
                          String description, String city, LocalDate desiredDate, String additionalInfo) {
        this.requester = requester;
        this.provider = provider;
        this.category = category;
        this.description = description;
        this.city = city;
        this.desiredDate = desiredDate;
        this.additionalInfo = additionalInfo;
        this.status = ServiceRequestStatus.PENDENTE;
    }

    @PrePersist
    void onCreate() {
        Instant now = Instant.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    void onUpdate() {
        this.updatedAt = Instant.now();
    }

    /**
     * Única porta de entrada para mudar o status: valida a transição e a permissão.
     */
    public void changeStatus(ServiceRequestStatus target, RequestActor actor) {
        if (!status.canTransitionTo(target)) {
            throw new ApiException(HttpStatus.CONFLICT,
                    "Não é possível mudar a solicitação de \"" + status.getLabel()
                            + "\" para \"" + target.getLabel() + "\"");
        }
        if (!status.canBeDoneBy(target, actor)) {
            throw new ApiException(HttpStatus.FORBIDDEN,
                    "Você não tem permissão para mudar a solicitação para \"" + target.getLabel() + "\"");
        }
        this.status = target;
    }

    /** Descobre qual é o papel do usuário NESTA solicitação (vazio = não participa dela). */
    public Optional<RequestActor> roleOf(Long userId) {
        if (requester.getId().equals(userId)) {
            return Optional.of(RequestActor.REQUESTER);
        }
        if (provider.getUser().getId().equals(userId)) {
            return Optional.of(RequestActor.PROVIDER);
        }
        return Optional.empty();
    }

    public Long getId() { return id; }
    public User getRequester() { return requester; }
    public ProviderProfile getProvider() { return provider; }
    public Category getCategory() { return category; }
    public String getDescription() { return description; }
    public String getCity() { return city; }
    public LocalDate getDesiredDate() { return desiredDate; }
    public String getAdditionalInfo() { return additionalInfo; }
    public ServiceRequestStatus getStatus() { return status; }
    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
}