import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsuarioJwt } from '../common/interfaces/usuario-jwt.interface';
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
    registrar(dto: RegisterDto, file: Express.Multer.File): Promise<Omit<any, "passwordHash">>;
    login(dto: LoginDto, res: Response): Promise<{
        usuario: Omit<import("mongoose").Document<unknown, {}, import("../usuarios/schemas/usuario.schema").Usuario, {}, import("mongoose").DefaultSchemaOptions> & import("../usuarios/schemas/usuario.schema").Usuario & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>, "passwordHash">;
    }>;
    logout(token: string | undefined, res: Response): Promise<{
        mensaje: string;
    }>;
    perfil(usuario: UsuarioJwt): Promise<Omit<import("mongoose").Document<unknown, {}, import("../usuarios/schemas/usuario.schema").Usuario, {}, import("mongoose").DefaultSchemaOptions> & import("../usuarios/schemas/usuario.schema").Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, "passwordHash">>;
}
