import { Model } from 'mongoose';
import { Publicacion, PublicacionDocument } from './schemas/publicacion.schema';
import { CrearPublicacionDto } from './dto/crear-publicacion.dto';
import { ImagenesService } from '../imagenes/imagenes.service';
export declare class PublicacionesService {
    private publicacionModel;
    private readonly imagenesService;
    constructor(publicacionModel: Model<PublicacionDocument>, imagenesService: ImagenesService);
    crear(crearPublicacionDto: CrearPublicacionDto, usuarioId: string, archivo?: Express.Multer.File): Promise<Publicacion>;
    obtenerTodas(): Promise<Publicacion[]>;
    eliminar(id: string, usuarioId: string): Promise<void>;
}
