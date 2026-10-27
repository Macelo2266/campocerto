package macelo.dev.campocerto.provider;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProviderServiceAreaRepository extends JpaRepository<ProviderServiceArea, Long> {

    @Query("""
            select min(a.city)
            from ProviderServiceArea a
            where a.provider.available = true
              and a.provider.user.status = br.com.campocerto.user.UserStatus.ACTIVE
            group by a.cityKey
            order by min(a.city)
            """)
    List<String> findPublicCities();
}
