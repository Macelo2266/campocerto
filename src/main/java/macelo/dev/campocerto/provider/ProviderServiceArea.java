package macelo.dev.campocerto.provider;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "provider_service_areas")
public class ProviderServiceArea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "provider_id", nullable = false, updatable = false)
    private ProviderProfile provider;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(name = "city_key", nullable = false, length = 100)
    private String cityKey;

    protected ProviderServiceArea() {
    }

    ProviderServiceArea(ProviderProfile provider, String city, String cityKey) {
        this.provider = provider;
        this.city = city;
        this.cityKey = cityKey;
    }

    public Long getId() { return id; }
    public String getCity() { return city; }
    public String getCityKey() { return cityKey; }
}