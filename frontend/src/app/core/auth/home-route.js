/** Para onde cada tipo de conta vai depois de entrar. */
export function homeRouteFor(role) {
    switch (role) {
        case 'PROVIDER':
            return '/painel';
        case 'ADMIN':
            return '/admin';
        default:
            return '/';
    }
}
