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
import macelo.dev.campocerto.category.Category;

@Entity
@Table(name = "provider_offerings")
public class ProviderOffering {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "provider_id", nullable = false, updatable = false)
    private ProviderProfile provider;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false, updatable = false)
    private Category category;

    @Column(name = "price_info", length = 100)
    private String priceInfo;

    protected ProviderOffering() {
    }

    ProviderOffering(ProviderProfile provider, Category category, String priceInfo) {
        this.provider = provider;
        this.category = category;
        this.priceInfo = priceInfo;
    }

    public Long getId() { return id; }
    public Category getCategory() { return category; }
    public String getPriceInfo() { return priceInfo; }

    void setPriceInfo(String priceInfo) {
        this.priceInfo = priceInfo;
    }
}
