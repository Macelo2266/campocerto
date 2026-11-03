/**
 * Lê o "exp" do token SÓ para evitar enviar ao servidor um token que já sabemos vencido.
 * Isto não é segurança: quem decide se o token vale é sempre o servidor.
 */
export function getTokenExpiry(token) {
    try {
        const payload = token.split('.')[1];
        if (!payload) {
            return null;
        }
        const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
        const exp = JSON.parse(json).exp;
        return typeof exp === 'number' ? exp * 1000 : null;
    }
    catch {
        return null;
    }
}
export function isTokenExpired(token, now = Date.now()) {
    const expiry = getTokenExpiry(token);
    return expiry === null || expiry <= now;
}
