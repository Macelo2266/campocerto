package macelo.dev.campocerto.admin;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import macelo.dev.campocerto.user.dto.UserRole;

public record RegisterRequest(@NotBlank(message = "Informe seu nome")
                              @Size(max = 120, message = "O nome deve ter no máximo 120 caracteres")
                              String name,

                              @NotBlank(message = "Informe seu e-mail")
                              @Email(message = "E-mail inválido")
                              @Size(max = 180, message = "O e-mail deve ter no máximo 180 caracteres")
                              String email,

                              @NotBlank(message = "Informe uma senha")
                              @Size(min = 8, max = 72, message = "A senha deve ter entre 8 e 72 caracteres")
                              String password,

                              @Size(max = 20, message = "O telefone deve ter no máximo 20 caracteres")
                              String phone,

                              @NotNull(message = "Informe o tipo de conta")
                              UserRole role) {
}
