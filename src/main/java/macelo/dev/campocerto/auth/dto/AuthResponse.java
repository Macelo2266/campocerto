package macelo.dev.campocerto.auth.dto;

import macelo.dev.campocerto.user.dto.UserResponse;

public record AuthResponse(String accessToken,
                           String tokenType,
                           long expiresInSeconds,
                           UserResponse user) {
}
