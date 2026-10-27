package macelo.dev.campocerto.review;

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
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import macelo.dev.campocerto.provider.ProviderProfile;
import macelo.dev.campocerto.service.ServiceRequest;
import macelo.dev.campocerto.user.dto.User;

import java.time.Instant;

@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "service_request_id", nullable = false, updatable = false)
    private ServiceRequest serviceRequest;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "provider_id", nullable = false, updatable = false)
    private ProviderProfile provider;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "reviewer_id", nullable = false, updatable = false)
    private User reviewer;

    @Column(nullable = false)
    private int rating;

    @Column(length = 1000)
    private String comment;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ReviewStatus status;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    protected Review() {
    }

    // Prestador e autor saem SEMPRE da solicitação: ninguém "informa" quem avalia quem
    public Review(ServiceRequest serviceRequest, int rating, String comment) {
        this.serviceRequest = serviceRequest;
        this.provider = serviceRequest.getProvider();
        this.reviewer = serviceRequest.getRequester();
        this.rating = rating;
        this.comment = comment;
        this.status = ReviewStatus.VISIBLE;
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

    public void changeStatus(ReviewStatus status) {
        this.status = status;
    }

    public Long getId() { return id; }
    public ServiceRequest getServiceRequest() { return serviceRequest; }
    public ProviderProfile getProvider() { return provider; }
    public User getReviewer() { return reviewer; }
    public int getRating() { return rating; }
    public String getComment() { return comment; }
    public ReviewStatus getStatus() { return status; }
    public Instant getCreatedAt() { return createdAt; }
}
