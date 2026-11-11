import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsuarioJwt } from '../interfaces/usuario-jwt.interface';

/** Devuelve el payload del JWT ya validado por JwtCookieGuard. */
export const UsuarioActual = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UsuarioJwt =>
    ctx.switchToHttp().getRequest().user,
);