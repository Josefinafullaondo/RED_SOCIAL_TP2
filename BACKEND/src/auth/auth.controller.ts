import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ACCESS_COOKIE, DURACION_SEG } from './constants/auth.constants';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtCookieGuard } from './guards/jwt-cookie.guard';
import { UsuarioActual } from '../common/decorators/usuario-actual.decorator';
import { UsuarioJwt } from '../common/interfaces/usuario-jwt.interface';
import { Cookies } from '../common/decorators/cookies.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  // Agregamos el interceptor para recibir la imagen de perfil
  @Post('register')
  @UseInterceptors(FileInterceptor('imagen')) 
  registrar(
    @Body() dto: RegisterDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // Ahora le pasamos el DTO y el archivo al servicio
    return this.auth.registrar(dto, file);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, usuario } = await this.auth.login(dto);

    res.cookie(ACCESS_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: DURACION_SEG * 1000,
    });

    return { usuario };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtCookieGuard)
  async logout(
    @Cookies(ACCESS_COOKIE) token: string | undefined,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.auth.cerrarSesion(token);
    res.clearCookie(ACCESS_COOKIE);
    return { mensaje: 'Sesión cerrada correctamente' };
  }

  @Get('perfil')
  @UseGuards(JwtCookieGuard)
  perfil(@UsuarioActual() usuario: UsuarioJwt) {
    return this.auth.perfil(usuario.sub);
  }
}