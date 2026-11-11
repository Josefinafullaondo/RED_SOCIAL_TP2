import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { UsuariosService } from '../usuarios/usuarios.service';
import { ImagenesService } from '../imagenes/imagenes.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { SesionDocument } from './schemas/sesion.schema';
export declare class AuthService {
    private readonly usuarios;
    private readonly jwt;
    private readonly imagenes;
    private readonly sesiones;
    constructor(usuarios: UsuariosService, jwt: JwtService, imagenes: ImagenesService, sesiones: Model<SesionDocument>);
    registrar(dto: RegisterDto, file?: Express.Multer.File): Promise<Omit<any, "passwordHash">>;
    login(dto: LoginDto): Promise<{
        token: string;
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
    cerrarSesion(token?: string): Promise<void>;
    perfil(usuarioId: string): Promise<Omit<import("mongoose").Document<unknown, {}, import("../usuarios/schemas/usuario.schema").Usuario, {}, import("mongoose").DefaultSchemaOptions> & import("../usuarios/schemas/usuario.schema").Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, "passwordHash">>;
}
