import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publicacion, PublicacionDocument } from './schemas/publicacion.schema';
import { CrearPublicacionDto } from './dto/crear-publicacion.dto';
import { ImagenesService } from '../imagenes/imagenes.service';

@Injectable()
export class PublicacionesService {
  constructor(
    @InjectModel(Publicacion.name) private publicacionModel: Model<PublicacionDocument>,
    private readonly imagenesService: ImagenesService,
  ) {}

  async crear(crearPublicacionDto: CrearPublicacionDto, usuarioId: string, archivo?: Express.Multer.File): Promise<Publicacion> {
    let imagenUrl = null;
    let imagenPublicId = null;

    if (archivo) {
      // Usamos el método real procesarYSubir de tu ImagenesService con Sharp
      const resultadoImagen = await this.imagenesService.procesarYSubir(archivo, {
        carpeta: 'publicaciones',
        ancho: 1000,
        alto: 1000,
        fit: 'inside',
      });
      imagenUrl = resultadoImagen.url;
      imagenPublicId = resultadoImagen.publicId;
    }

    const nuevaPublicacion = new this.publicacionModel({
      ...crearPublicacionDto,
      imagenUrl,
      imagenPublicId,
      autor: usuarioId,
    });

    return await nuevaPublicacion.save();
  }

  async obtenerTodas(): Promise<Publicacion[]> {
    return await this.publicacionModel
      .find()
      .populate('autor', 'nombre apellido username fotoPerfil')
      .sort({ createdAt: -1 })
      .exec();
  }

  async eliminar(id: string, usuarioId: string): Promise<void> {
    const publicacion = await this.publicacionModel.findById(id);
    if (!publicacion) {
      throw new NotFoundException('Publicación no encontrada');
    }

    const publicId = publicacion.imagenPublicId;
    if (publicId) {
      // Usamos el método real eliminar de tu ImagenesService
      await this.imagenesService.eliminar(publicId);
    }

    await this.publicacionModel.findByIdAndDelete(id);
  }
}