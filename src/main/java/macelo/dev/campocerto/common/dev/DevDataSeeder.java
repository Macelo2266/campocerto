package macelo.dev.campocerto.common.dev;

import macelo.dev.campocerto.category.CategoryRepository;
import macelo.dev.campocerto.provider.ProviderProfileService;
import macelo.dev.campocerto.provider.dto.ProviderProfileRequest;
import macelo.dev.campocerto.user.UserRepository;
import macelo.dev.campocerto.user.dto.User;
import macelo.dev.campocerto.user.dto.UserRole;
import macelo.dev.campocerto.user.dto.UserStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * Cria prestadores FICTÍCIOS para testes locais. Só roda com o perfil "dev".
 * Todos têm a senha "senha12345".
 */
@Component
@Profile("dev")
public class DevDataSeeder implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(DevDataSeeder.class);
    private static final String PASSWORD = "senha12345";

    private record Seed(String email, String name, String description, String city,
                        List<String> areas, Map<String, String> offeringsBySlug,
                        boolean available, boolean suspended) {
    }

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ProviderProfileService profileService;
    private final PasswordEncoder passwordEncoder;

    public DevDataSeeder(UserRepository userRepository,
                         CategoryRepository categoryRepository,
                         ProviderProfileService profileService,
                         PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.profileService = profileService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) {
        List<Seed> seeds = List.of(
                new Seed("dev.ze@campocerto.test", "Zé das Cercas",
                        "Cercas de arame e de madeira, com 15 anos de experiência.",
                        "Itaporanga", List.of("Coremas", "Patos"),
                        Map.of("construcao-de-cercas", "R$ 8 por metro", "conserto-de-cercas", ""),
                        true, false),
                new Seed("dev.chico@campocerto.test", "Roçadeira do Chico",
                        "Roçagem e limpeza de pastos e terrenos.",
                        "Coremas", List.of("Itaporanga"),
                        Map.of("rocagem-e-limpeza", "R$ 120 por diária", "capina-e-preparo-do-solo", ""),
                        true, false),
                new Seed("dev.silva@campocerto.test", "Tratores Silva",
                        "Aração e gradagem com trator e implementos.",
                        "Patos", List.of("Itaporanga", "Pombal"),
                        Map.of("tratores-e-maquinas", "R$ 150 por hora",
                                "capina-e-preparo-do-solo", "R$ 400 por hectare"),
                        true, false),
                new Seed("dev.agua@campocerto.test", "Água Certa Bombas",
                        "Instalação e conserto de bombas d'água.",
                        "Pombal", List.of("Catolé do Rocha", "Sousa"),
                        Map.of("bombas-dagua", ""),
                        true, false),
                new Seed("dev.currais@campocerto.test", "Currais & Cia",
                        "Currais, apartações e cercas para criação.",
                        "Sousa", List.of("Cajazeiras"),
                        Map.of("currais", "", "construcao-de-cercas", "R$ 10 por metro"),
                        true, false),
                new Seed("dev.maria@campocerto.test", "Dona Maria Colheita",
                        "Equipe para plantio e colheita.",
                        "Cajazeiras", List.of("Sousa"),
                        Map.of("plantio-e-colheita", "R$ 90 por diária",
                                "diaristas-e-ajudantes", "R$ 80 por diária"),
                        true, false),
                new Seed("dev.joaquim@campocerto.test", "Joaquim Ajudante (indisponível)",
                        "Ajudante rural. Está sem agenda no momento.",
                        "Itaporanga", List.of(),
                        Map.of("diaristas-e-ajudantes", ""),
                        false, false),
                new Seed("dev.suspenso@campocerto.test", "Cadastro Suspenso",
                        "Este cadastro foi suspenso pelo administrador.",
                        "Patos", List.of(),
                        Map.of("outros-servicos-rurais", ""),
                        true, true)
        );

        int index = 1;
        for (Seed seed : seeds) {
            createIfMissing(seed, index++);
        }
        log.info("DevDataSeeder concluído. Senha de todos os usuários de teste: {}", PASSWORD);
    }

    private void createIfMissing(Seed seed, int index) {
        if (userRepository.existsByEmailIgnoreCase(seed.email())) {
            return;
        }

        User user = userRepository.save(new User(
                seed.name(), seed.email(), passwordEncoder.encode(PASSWORD), null, UserRole.PROVIDER));

        List<ProviderProfileRequest.OfferingRequest> offerings = seed.offeringsBySlug().entrySet().stream()
                .map(entry -> new ProviderProfileRequest.OfferingRequest(
                        categoryRepository.findBySlug(entry.getKey()).orElseThrow().getId(),
                        entry.getValue()))
                .toList();

        profileService.create(user.getId(), new ProviderProfileRequest(
                seed.name(),
                seed.description(),
                String.format("(83) 99999-%04d", index),   // números fictícios
                seed.city(),
                seed.areas(),
                offerings,
                seed.available()
        ));

        if (seed.suspended()) {
            user.setStatus(UserStatus.SUSPENDED);
            userRepository.save(user);
        }
    }
}
