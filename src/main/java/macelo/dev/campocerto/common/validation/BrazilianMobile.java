package macelo.dev.campocerto.common.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Documented
@Constraint(validatedBy = BrazilianMobileValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface BrazilianMobile {

    String message() default "Informe um celular válido com DDD, ex.: (83) 99999-0000";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}