
package macelo.dev.campocerto.user.dto;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.Locale;

@Entity
@Getter
@Setter
@Table(name = "users")
public class User {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 120)
    private String nome;

    @Column(name = "email", nullable = false, length = 180)
    private String email;

    @Column(name = "password_hash", nullable = false, length = 100)
    private String senhaHash;

    @Column(name = "phone", length = 20)
    private String telefone;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, length = 20)
    private UserRole papel;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private UserStatus status;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant dataCriacao;

    @Column(name = "updated_at", nullable = false)
    private Instant dataAtualizacao;


    protected User() {
    }

    public User(
            String nome,
            String email,
            String senhaHash,
            String telefone,
            UserRole papel
    ) {
        this.nome = nome;
        this.email = email.toLowerCase(Locale.ROOT);
        this.senhaHash = senhaHash;
        this.telefone = telefone;
        this.papel = papel;
        this.status = UserStatus.ACTIVE;
    }

    // Compatibilidade com chamadas que utilizam nomes em inglês.

    public String getName() {
        return nome;
    }

    public void setName(String name) {
        this.nome = name;
    }

    public String getPasswordHash() {
        return senhaHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.senhaHash = passwordHash;
    }

    public String getPhone() {
        return telefone;
    }

    public void setPhone(String phone) {
        this.telefone = phone;
    }

    public UserRole getRole() {
        return papel;
    }

    public void setRole(UserRole role) {
        this.papel = role;
    }

    public Instant getCreatedAt() {
        return dataCriacao;
    }

    public void setCreatedAt(Instant createdAt) {
        this.dataCriacao = createdAt;
    }

    public Instant getUpdatedAt() {
        return dataAtualizacao;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.dataAtualizacao = updatedAt;
    }

    @PrePersist
    protected void aoCriar() {
        Instant agora = Instant.now();
        this.dataCriacao = agora;
        this.dataAtualizacao = agora;
    }

    @PreUpdate
    protected void aoAtualizar() {
        this.dataAtualizacao = Instant.now();
    }
}
