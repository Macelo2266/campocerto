import { AbstractControl, FormGroup } from '@angular/forms';

/** Mensagem de erro de um campo (só depois que a pessoa mexeu nele), ou null. */
export function fieldError(control: AbstractControl | null): string | null {
  if (!control || !control.errors || !(control.touched || control.dirty)) {
    return null;
  }

  const first = Object.entries(control.errors)[0];
  if (!first) {
    return null;
  }
  const [key, value] = first;

  switch (key) {
    case 'required': return 'Preencha este campo.';
    case 'email': return 'Informe um e-mail válido, como nome@exemplo.com.';
    case 'minlength': return `Use pelo menos ${value.requiredLength} caracteres.`;
    case 'maxlength': return `Use no máximo ${value.requiredLength} caracteres.`;
    case 'server': return String(value);
    default: return 'Valor inválido.';
  }
}

/** Coloca os erros por campo devolvidos pela API nos campos do formulário. */
export function applyServerErrors(form: FormGroup, errors: Record<string, string>): void {
  for (const [field, message] of Object.entries(errors)) {
    const control = form.get(field);
    if (control) {
      control.setErrors({ server: message });
      control.markAsTouched();
    }
  }
}
