import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { SesionDocument } from '../schemas/sesion.schema';
export declare class JwtCookieGuard implements CanActivate {
    private readonly jwt;
    private readonly sesiones;
    constructor(jwt: JwtService, sesiones: Model<SesionDocument>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
