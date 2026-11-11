import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import sharp from 'sharp';

export interface OpcionesImagen {
  carpeta: string;
  ancho: number;
  alto: number;
  fit: 'inside' | 'cover';
}

@Injectable()
export class ImagenesService {
  constructor(config: ConfigService) {
    cloudinary.config({
      cloud_name: config.getOrThrow<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: config.getOrThrow<string>('CLOUDINARY_API_KEY'),
      api_secret: config.getOrThrow<string>('CLOUDINARY_API_SECRET'),
      secure: true,
    });
  }

  /** Procesa en memoria (Sharp → WebP) y sube a Cloudinary. Sin diskStorage. */
  async procesarYSubir(
    file: Express.Multer.File,
    opciones: OpcionesImagen,
  ): Promise<{ url: string; publicId: string }> {
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('El archivo debe ser una imagen');
    }

    let buffer: Buffer;
    try {
      buffer = await sharp(file.buffer)
        .rotate()
        .resize({
          width: opciones.ancho,
          height: opciones.alto,
          fit: opciones.fit,
          withoutEnlargement: true,
        })
        .webp({ quality: 80 })
        .toBuffer();
    } catch {
      throw new BadRequestException('Imagen inválida o corrupta');
    }

    const res = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: opciones.carpeta, resource_type: 'image' },
          (error, result) => {
            if (error || !result) return reject(error ?? new Error('Cloudinary sin resultado'));
            resolve(result);
          },
        )
        .end(buffer);
    });

    return { url: res.secure_url, publicId: res.public_id };
  }

  async eliminar(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId).catch(() => undefined);
  }
}