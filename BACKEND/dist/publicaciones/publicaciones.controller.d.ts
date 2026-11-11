import { UsuarioJwt } from '../common/interfaces/usuario-jwt.interface';
import { CrearPublicacionDto } from './dto/crear-publicacion.dto';
import { PublicacionesService } from './publicaciones.service';
export declare class PublicacionesController {
    private readonly publicaciones;
    constructor(publicaciones: PublicacionesService);
    crear(dto: CrearPublicacionDto, archivo: Express.Multer.File | undefined, usuario: UsuarioJwt): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/publicacion.schema").Publicacion, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/publicacion.schema").Publicacion & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/publicacion.schema").Publicacion, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/publicacion.schema").Publicacion & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    listar(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/publicacion.schema").Publicacion, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/publicacion.schema").Publicacion & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    eliminar(id: string, usuario: UsuarioJwt): Promise<{
        mensaje: string;
    }>;
}
