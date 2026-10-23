package macelo.dev.campocerto.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository  extends JpaRepository<User, Long> {
}
