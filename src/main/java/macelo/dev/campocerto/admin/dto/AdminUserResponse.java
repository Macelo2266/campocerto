package macelo.dev.campocerto.admin.dto;


import macelo.dev.campocerto.user.dto.User;
import macelo.dev.campocerto.user.dto.UserRole;
import macelo.dev.campocerto.user.dto.UserStatus;

import java.time.Instant;

public record AdminUserResponse(
        Long id,
        String name,
        String email,
        String phone,
        UserRole role,
        UserStatus status,
        Instant createdAt
) {

    public static AdminUserResponse from(User user) {
        return new AdminUserResponse(
                user.getId(), user.getName(), user.getEmail(), user.getPhone(),
                user.getRole(), user.getStatus(), user.getCreatedAt());
    }
}