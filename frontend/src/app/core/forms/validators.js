import { todayIso } from '../util/format';
import { normalizeBrazilianMobile } from '../util/phone';
/** Como o @NotBlank do backend: espaços sozinhos não contam como preenchido. */
export const notBlank = (control) => String(control.value ?? '').trim() === '' ? { required: true } : null;
/** Como a regra do backend: o tamanho mínimo vale DEPOIS de tirar os espaços das pontas. */
export function minTrimmedLength(min) {
    return (control) => {
        const length = String(control.value ?? '').trim().length;
        return length > 0 && length < min ? { minlength: { requiredLength: min, actualLength: length } } : null;
    };
}
/** Recebe "yyyy-MM-dd" (formato de <input type="date">). Vazio é permitido. */
export const notInPast = (control) => {
    const value = String(control.value ?? '');
    return value !== '' && value < todayIso() ? { past: true } : null;
};
/** Vazio é problema do notBlank. Aqui só dizemos se o que foi digitado é um celular válido. */
export const brazilianMobile = (control) => {
    const value = String(control.value ?? '');
    return value.trim() === '' || normalizeBrazilianMobile(value) !== null ? null : { whatsapp: true };
};
