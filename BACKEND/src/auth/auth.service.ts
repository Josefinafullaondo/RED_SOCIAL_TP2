import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { UsuariosService } from '../usuarios/usuarios.service';
import { ImagenesService } from '../imagenes/imagenes.service';
import { ACCESS_COOKIE, DURACION_SEG } from './constants/auth.constants';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Sesion, SesionDocument } from './schemas/sesion.schema';
import { UsuarioJwt } from '../common/interfaces/usuario-jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarios: UsuariosService,
    private readonly jwt: JwtService,
    private readonly imagenes: ImagenesService,
    @InjectModel(Sesion.name) private readonly sesiones: Model<SesionDocument>,
  ) {}

  async registrar(dto: RegisterDto, file?: Express.Multer.File) {
    // 1. Validar que el correo O el nombre de usuario sean únicos (Status 400 / 409)
    const existeEmail = await this.usuarios.existePorEmail(dto.email);
    // Asumimos que agregarás el método existePorUsername en UsuariosService
    const existeUsername = await this.usuarios.existePorUsername(dto.username); 

    if (existeEmail || existeUsername) {
      throw new BadRequestException('El correo o el nombre de usuario ya se encuentran registrados');
    }

  let fotoPerfilUrl = '';
if (file) {
  const subida = await this.imagenes.procesarYSubir(file, {
    carpeta: 'perfiles',
    ancho: 400,
    alto: 400,
    fit: 'cover',
  });
  fotoPerfilUrl = subida.url;
}
    // 3. Encriptar contraseña (exigencia del TP)
    const passwordHash = await bcrypt.hash(dto.password, 10);

    // 4. Asignar rol por defecto (exigencia del TP)
    const rol = dto.rol || 'usuario';

    // 5. Guardar el usuario con TODOS los datos exigidos
    return this.usuarios.crear({
      nombre: dto.nombre,
      apellido: dto.apellido, // Nuevo campo
      email: dto.email,
      username: dto.username, // Nuevo campo
      fechaNacimiento: dto.fechaNacimiento, // Nuevo campo
      descripcion: dto.descripcion, // Nuevo campo
      rol,
      fotoPerfil: fotoPerfilUrl,
      passwordHash,
    });
  }

  async login(dto: LoginDto) {
    // El TP exige que el login sea por correo O usuario
    // Tenés que crear/adaptar este método en UsuariosService para que busque por ambos
   const usuario = await this.usuarios.buscarPorEmailOUsernameConPassword(dto.identificador);
    
    const credencialesOk = !!usuario && (await bcrypt.compare(dto.password, usuario.passwordHash));

    if (!usuario || !credencialesOk || !usuario.activo) {
      throw new UnauthorizedException('Credenciales inválidas'); // Devuelve 401 Unauthorized automáticamente
    }

    const jti = randomUUID();
    await this.sesiones.create({
      usuario: usuario._id,
      jti,
      expiraEn: new Date(Date.now() + DURACION_SEG * 1000),
    });

    const token = await this.jwt.signAsync({
      sub: usuario._id.toString(),
      rol: usuario.rol,
      jti,
    } satisfies UsuarioJwt);

    return { token, usuario: UsuariosService.sinPassword(usuario) };
  }

  async cerrarSesion(token?: string): Promise<void> {
    if (!token) return;
    const payload = this.jwt.decode<UsuarioJwt | null>(token);
    if (payload?.jti) {
      await this.sesiones.updateOne({ jti: payload.jti }, { $set: { revocada: true } });
    }
  }

  async perfil(usuarioId: string) {
    const usuario = await this.usuarios.buscarPorId(usuarioId);
    if (!usuario) throw new UnauthorizedException('Usuario no encontrado');
    return UsuariosService.sinPassword(usuario);
  }
}