package macelo.dev.campocerto.user;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "usuarios")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String nome;

    @Column(nullable = false, length = 180)
    private String email;

    @Column(name = "senha_hash", nullable = false, length = 100)
    private String senhaHash;

    @Column(length = 20)
    private String telefone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private UserRole papel;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private UserStatus status;

    @Column(name = "data_criacao", nullable = false, updatable = false)
    private Instant dataCriacao;

    @Column(name = "data_atualizacao", nullable = false)
    private Instant dataAtualizacao;

    // Construtor exigido pelo JPA.
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
        this.email = email.toLowerCase();
        this.senhaHash = senhaHash;
        this.telefone = telefone;
        this.papel = papel;
        this.status = UserStatus.ACTIVE;
    }

    @PrePersist
    void aoCriar() {
        Instant agora = Instant.now();
        this.dataCriacao = agora;
        this.dataAtualizacao = agora;
    }

    @PreUpdate
    void aoAtualizar() {
        this.dataAtualizacao = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getSenhaHash() {
        return senhaHash;
    }

    public String getTelefone() {
        return telefone;
    }

    public UserRole getPapel() {
        return papel;
    }

    public UserStatus getStatus() {
        return status;
    }

    public Instant getDataCriacao() {
        return dataCriacao;
    }

    public Instant getDataAtualizacao() {
        return dataAtualizacao;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public void setStatus(UserStatus status) {
        this.status = status;
    }
}
