export interface UsuarioJwt {
    sub: string;
    rol: 'usuario' | 'administrador';
    jti: string;
}
