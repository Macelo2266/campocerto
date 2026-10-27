package macelo.dev.campocerto.provider;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import macelo.dev.campocerto.category.Category;
import macelo.dev.campocerto.common.util.SlugUtils;
import macelo.dev.campocerto.user.dto.User;

import java.time.Instant;
import java.util.Collection;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "provider_profiles")
public class ProviderProfile {

    public record OfferingInput(Category category, String priceInfo) {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    private User user;

    @Column(name = "professional_name", nullable = false, length = 120)
    private String professionalName;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false, length = 13)
    private String whatsapp;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(name = "photo_url", length = 500)
    private String photoUrl;

    @Column(nullable = false)
    private boolean available = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @OneToMany(mappedBy = "provider", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProviderServiceArea> serviceAreas = new HashSet<>();

    @OneToMany(mappedBy = "provider", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProviderOffering> offerings = new HashSet<>();

    protected ProviderProfile() {
    }

    public ProviderProfile(User user, String professionalName, String description,
                           String whatsapp, String city, boolean available) {
        this.user = user;
        this.professionalName = professionalName;
        this.description = description;
        this.whatsapp = whatsapp;
        this.city = city;
        this.available = available;
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

    public void updateBasicInfo(String professionalName, String description,
                                String whatsapp, String city, boolean available) {
        this.professionalName = professionalName;
        this.description = description;
        this.whatsapp = whatsapp;
        this.city = city;
        this.available = available;
    }

    /**
     * Sincroniza as cidades atendidas comparando pela chave normalizada.
     * Só remove o que saiu e só insere o que entrou, nunca "apaga tudo e recria".
     */
    public void syncServiceAreas(Collection<String> cityNames) {
        Map<String, String> wanted = new LinkedHashMap<>();
        for (String name : cityNames) {
            String key = SlugUtils.toSlug(name);
            if (!key.isEmpty()) {
                wanted.putIfAbsent(key, name.trim());
            }
        }

        serviceAreas.removeIf(area -> !wanted.containsKey(area.getCityKey()));

        Set<String> existingKeys = serviceAreas.stream()
                .map(ProviderServiceArea::getCityKey)
                .collect(Collectors.toSet());

        wanted.forEach((key, name) -> {
            if (!existingKeys.contains(key)) {
                serviceAreas.add(new ProviderServiceArea(this, name, key));
            }
        });
    }

    /**
     * Sincroniza os serviços oferecidos: remove os que saíram, atualiza o preço
     * dos que continuam e insere os novos.
     */
    public void syncOfferings(List<OfferingInput> wanted) {
        Set<Long> wantedIds = wanted.stream()
                .map(input -> input.category().getId())
                .collect(Collectors.toSet());

        offerings.removeIf(offering -> !wantedIds.contains(offering.getCategory().getId()));

        for (OfferingInput input : wanted) {
            Optional<ProviderOffering> existing = offerings.stream()
                    .filter(o -> o.getCategory().getId().equals(input.category().getId()))
                    .findFirst();

            if (existing.isPresent()) {
                existing.get().setPriceInfo(input.priceInfo());
            } else {
                offerings.add(new ProviderOffering(this, input.category(), input.priceInfo()));
            }
        }
    }

    public Set<Long> getOfferedCategoryIds() {
        return offerings.stream()
                .map(o -> o.getCategory().getId())
                .collect(Collectors.toSet());
    }

    public Long getId() { return id; }
    public User getUser() { return user; }
    public String getProfessionalName() { return professionalName; }
    public String getDescription() { return description; }
    public String getWhatsapp() { return whatsapp; }
    public String getCity() { return city; }
    public String getPhotoUrl() { return photoUrl; }
    public boolean isAvailable() { return available; }
    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
    public Set<ProviderServiceArea> getServiceAreas() { return serviceAreas; }
    public Set<ProviderOffering> getOfferings() { return offerings; }
}
