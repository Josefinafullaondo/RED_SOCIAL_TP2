import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicacionesService } from './publicaciones.service';
import { PublicacionesController } from './publicaciones.controller';
import { Publicacion, PublicacionSchema } from './schemas/publicacion.schema';
import { ImagenesModule } from '../imagenes/imagenes.module';
import { AuthModule } from '../auth/auth.module'; // <- Corregido aquí

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Publicacion.name, schema: PublicacionSchema },
    ]),
    ImagenesModule,
    AuthModule, // <- Corregido aquí también
  ],
  controllers: [PublicacionesController],
  providers: [PublicacionesService],
  exports: [PublicacionesService],
})
export class PublicacionesModule {}