package macelo.dev.campocerto.user.dto;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository  extends JpaRepository<User, Long> {
}
