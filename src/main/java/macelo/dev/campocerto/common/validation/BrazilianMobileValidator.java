package macelo.dev.campocerto.common.validation;


import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import macelo.dev.campocerto.common.util.PhoneUtils;

public class BrazilianMobileValidator implements ConstraintValidator<BrazilianMobile, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        // Campo vazio é problema do @NotBlank, e cada anotação cuida de uma coisa só
        if (value == null || value.isBlank()) {
            return true;
        }
        return PhoneUtils.normalizeBrazilianMobile(value) != null;
    }
}