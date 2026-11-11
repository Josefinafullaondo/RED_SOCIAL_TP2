import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PublicacionesService } from './publicaciones.service';
import { CrearPublicacionDto } from './dto/crear-publicacion.dto';
import { JwtCookieGuard } from '../auth/guards/jwt-cookie.guard';
import { UsuarioActual } from '../common/decorators/usuario-actual.decorator';

@Controller('publicaciones')
export class PublicacionesController {
  constructor(private readonly publicacionesService: PublicacionesService) {}

  @UseGuards(JwtCookieGuard)
  @UseInterceptors(FileInterceptor('imagen'))
  async crear(
    @Body() crearPublicacionDto: CrearPublicacionDto,
    @UsuarioActual() usuario: any,
    @UploadedFile() archivo?: Express.Multer.File,
  ) {
    const usuarioId = usuario.userId || usuario._id;
    return await this.publicacionesService.crear(crearPublicacionDto, usuarioId, archivo);
  }

  @Get()
  async obtenerTodas() {
    return await this.publicacionesService.obtenerTodas();
  }

  @UseGuards(JwtCookieGuard)
  @Delete(':id')
  async eliminar(
    @Param('id') id: string,
    @UsuarioActual() usuario: any,
  ) {
    const usuarioId = usuario.userId || usuario._id;
    await this.publicacionesService.eliminar(id, usuarioId);
    return { mensaje: 'Publicación eliminada correctamente' };
  }
}