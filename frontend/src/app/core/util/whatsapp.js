/** Só aceitamos o endereço que esperamos receber do backend: https://wa.me/<número>?text=... */
export function isWhatsappUrl(url) {
    return /^https:\/\/wa\.me\/\d{10,15}(\?text=\S*)?$/.test(url);
}
