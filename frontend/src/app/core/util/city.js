/**
 * Chave normalizada de uma cidade: sem acento, minúscula, só letras e números.
 * Mesma ideia do SlugUtils do backend: "PATOS" e "Pátos" são a mesma cidade.
 */
export function cityKey(name) {
    return name
        .normalize('NFD')
        .replace(/\p{M}/gu, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
