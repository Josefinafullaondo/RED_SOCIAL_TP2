import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

/** Lee una cookie concreta de la petición (o todas si no se indica nombre). */
export function extraerCookie(req: Request, nombre: string): string | undefined {
  return req.cookies?.[nombre];
}

/**
 * Uso:
 *   @Cookies('access_token') token: string
 *   @Cookies() todas: Record<string, string>
 */
export const Cookies = createParamDecorator(
  (nombre: string | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    return nombre ? extraerCookie(req, nombre) : req.cookies ?? {};
  },
);