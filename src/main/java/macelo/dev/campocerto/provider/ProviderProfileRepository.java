package macelo.dev.campocerto.provider;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface ProviderProfileRepository
        extends JpaRepository<ProviderProfile, Long>, JpaSpecificationExecutor<ProviderProfile> {

    Optional<ProviderProfile> findByUserId(Long userId);

    boolean existsByUserId(Long userId);
}