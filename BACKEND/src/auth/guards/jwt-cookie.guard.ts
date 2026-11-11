import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Model } from 'mongoose';
import { extraerCookie } from '../../common/decorators/cookies.decorator';
import { UsuarioJwt } from '../../common/interfaces/usuario-jwt.interface';
import { ACCESS_COOKIE } from '../constants/auth.constants';
import { Sesion, SesionDocument } from '../schemas/sesion.schema';

type RequestConUsuario = Request & { user?: UsuarioJwt };

/**
 * Valida el JWT de la cookie httpOnly. Un guard no puede usar decoradores de
 * parámetro, así que usa la misma función `extraerCookie` que el decorador @Cookies().
 */
@Injectable()
export class JwtCookieGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    @InjectModel(Sesion.name) private readonly sesiones: Model<SesionDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<RequestConUsuario>();
    const token = extraerCookie(req, ACCESS_COOKIE);

    if (!token) throw new UnauthorizedException('Sesión no iniciada');

    let payload: UsuarioJwt;
    try {
      payload = await this.jwt.verifyAsync<UsuarioJwt>(token);
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }

    // La sesión debe existir y no estar revocada (logout real)
    const activa = await this.sesiones
      .findOne({ jti: payload.jti, revocada: false })
      .select('_id')
      .lean();

    if (!activa) throw new UnauthorizedException('Sesión cerrada');

    req.user = payload;
    return true;
  }
}