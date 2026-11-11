import { UsuarioJwt } from '../common/interfaces/usuario-jwt.interface';
import { UsuariosService } from './usuarios.service';
export declare class UsuariosController {
    private readonly usuarios;
    constructor(usuarios: UsuariosService);
    actualizarFoto(foto: Express.Multer.File | undefined, usuario: UsuarioJwt): Promise<import("mongoose").Document<unknown, {}, import("./schemas/usuario.schema").Usuario, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/usuario.schema").Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
