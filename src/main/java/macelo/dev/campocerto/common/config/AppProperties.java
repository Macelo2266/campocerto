package macelo.dev.campocerto.common.config;


import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

import java.util.List;

@ConfigurationProperties(prefix = "app")
public record AppProperties(Jwt jwt, Cors cors, Admin admin) {

    public record Jwt(String secret, long expirationMinutes) {
    }

    public record Cors(List<String> allowedOrigins) {
    }

    public record Admin(String email, String password, String name) {
    }
}