package macelo.dev.campocerto.provider;


import macelo.dev.campocerto.user.dto.UserStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProviderServiceAreaRepository
        extends JpaRepository<ProviderServiceArea, Long> {

    @Query("""
            select min(a.city)
            from ProviderServiceArea a
            where a.provider.available = true
              and a.provider.user.status = :status
            group by a.cityKey
            order by min(a.city)
            """)
    List<String> findPublicCities(@Param("status") UserStatus status);
}

