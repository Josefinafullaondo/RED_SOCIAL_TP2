import { ConfigService } from '@nestjs/config';
export interface OpcionesImagen {
    carpeta: string;
    ancho: number;
    alto: number;
    fit: 'inside' | 'cover';
}
export declare class ImagenesService {
    constructor(config: ConfigService);
    procesarYSubir(file: Express.Multer.File, opciones: OpcionesImagen): Promise<{
        url: string;
        publicId: string;
    }>;
    eliminar(publicId: string): Promise<void>;
}
