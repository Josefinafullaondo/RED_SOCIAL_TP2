import {
  BadRequestException,
  Controller,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { JwtCookieGuard } from '../auth/guards/jwt-cookie.guard';
import { UsuarioActual } from '../common/decorators/usuario-actual.decorator';
import { UsuarioJwt } from '../common/interfaces/usuario-jwt.interface';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
@UseGuards(JwtCookieGuard)
export class UsuariosController {
  constructor(private readonly usuarios: UsuariosService) {}

  @Patch('me/foto')
  @UseInterceptors(
    FileInterceptor('foto', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  actualizarFoto(
    @UploadedFile() foto: Express.Multer.File | undefined,
    @UsuarioActual() usuario: UsuarioJwt,
  ) {
    if (!foto) throw new BadRequestException('Envía el archivo en el campo "foto"');
    return this.usuarios.actualizarFoto(usuario.sub, foto);
  }
}