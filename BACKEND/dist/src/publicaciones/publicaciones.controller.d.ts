import { PublicacionesService } from './publicaciones.service';
import { CrearPublicacionDto } from './dto/crear-publicacion.dto';
export declare class PublicacionesController {
    private readonly publicacionesService;
    constructor(publicacionesService: PublicacionesService);
    crear(crearPublicacionDto: CrearPublicacionDto, usuario: any, archivo?: Express.Multer.File): Promise<import("./schemas/publicacion.schema").Publicacion>;
    obtenerTodas(): Promise<import("./schemas/publicacion.schema").Publicacion[]>;
    eliminar(id: string, usuario: any): Promise<{
        mensaje: string;
    }>;
}
