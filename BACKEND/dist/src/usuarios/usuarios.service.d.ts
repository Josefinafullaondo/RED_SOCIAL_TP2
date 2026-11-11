import { Model, Types } from 'mongoose';
import { ImagenesService } from '../imagenes/imagenes.service';
import { Usuario, UsuarioDocument } from './schemas/usuario.schema';
export declare class UsuariosService {
    private readonly model;
    private readonly imagenes;
    constructor(model: Model<UsuarioDocument>, imagenes: ImagenesService);
    static sinPassword<T extends {
        passwordHash?: string;
    }>(doc: T): Omit<T, 'passwordHash'>;
    existePorEmail(email: string): import("mongoose").Query<{
        _id: Types.ObjectId;
    }, import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Usuario, {}, import("mongoose").DefaultSchemaOptions> & Usuario & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Usuario, {}, import("mongoose").DefaultSchemaOptions> & Usuario & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, Usuario, {}, import("mongoose").DefaultSchemaOptions> & Usuario & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>, "findOne", {}, import("mongoose").Document<unknown, {}, Usuario, {}, import("mongoose").DefaultSchemaOptions> & Usuario & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    existePorUsername(username: string): import("mongoose").Query<{
        _id: Types.ObjectId;
    }, import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Usuario, {}, import("mongoose").DefaultSchemaOptions> & Usuario & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Usuario, {}, import("mongoose").DefaultSchemaOptions> & Usuario & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, Usuario, {}, import("mongoose").DefaultSchemaOptions> & Usuario & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>, "findOne", {}, import("mongoose").Document<unknown, {}, Usuario, {}, import("mongoose").DefaultSchemaOptions> & Usuario & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    crear(datos: {
        nombre: string;
        apellido: string;
        email: string;
        username: string;
        fechaNacimiento: string;
        descripcion: string;
        rol: string;
        fotoPerfil: string;
        passwordHash: string;
    }): Promise<Omit<any, "passwordHash">>;
    buscarPorEmailOUsernameConPassword(identificador: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, Usuario, {}, import("mongoose").DefaultSchemaOptions> & Usuario & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>, import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Usuario, {}, import("mongoose").DefaultSchemaOptions> & Usuario & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Usuario, {}, import("mongoose").DefaultSchemaOptions> & Usuario & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, Usuario, {}, import("mongoose").DefaultSchemaOptions> & Usuario & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>, "findOne", {}, import("mongoose").Document<unknown, {}, Usuario, {}, import("mongoose").DefaultSchemaOptions> & Usuario & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    buscarPorId(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, Usuario, {}, import("mongoose").DefaultSchemaOptions> & Usuario & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>, import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Usuario, {}, import("mongoose").DefaultSchemaOptions> & Usuario & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Usuario, {}, import("mongoose").DefaultSchemaOptions> & Usuario & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, Usuario, {}, import("mongoose").DefaultSchemaOptions> & Usuario & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>, "findOne", {}, import("mongoose").Document<unknown, {}, Usuario, {}, import("mongoose").DefaultSchemaOptions> & Usuario & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    actualizarFoto(id: string, foto: Express.Multer.File): Promise<import("mongoose").Document<unknown, {}, Usuario, {}, import("mongoose").DefaultSchemaOptions> & Usuario & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
}
