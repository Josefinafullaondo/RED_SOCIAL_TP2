import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ImagenesService } from '../imagenes/imagenes.service';
import { Usuario, UsuarioDocument } from './schemas/usuario.schema';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private readonly model: Model<UsuarioDocument>,
    private readonly imagenes: ImagenesService,
  ) {}

  /** Quita passwordHash de cualquier objeto de usuario antes de devolverlo. */
  static sinPassword<T extends { passwordHash?: string }>(doc: T): Omit<T, 'passwordHash'> {
    const { passwordHash, ...publico } = doc;
    return publico;
  }

  // 1. Buscador por email
  existePorEmail(email: string) {
    return this.model.exists({ email });
  }

  // 2. Buscador por nombre de usuario (Nuevo para el TP)
  existePorUsername(username: string) {
    return this.model.exists({ username });
  }

 // 3. Método crear actualizado para recibir todos los campos del TP
  async crear(datos: {
    nombre: string;
    apellido: string;
    email: string;
    username: string;
    fechaNacimiento: string;
    descripcion: string;
    rol: string;
    fotoPerfil: string;
    passwordHash: string;
  }) {
    const doc = await this.model.create({
      ...datos,
      fechaNacimiento: new Date(datos.fechaNacimiento),
      rol: datos.rol as 'usuario' | 'administrador', // Le aclaramos el tipo exacto al Schema
    });

    // Le ponemos 'as any' para que TypeScript no pelee con los tipos internos de Mongoose
    return UsuariosService.sinPassword(doc.toObject() as any);
  }

  // 4. Buscador por email O username para el Login (Nuevo para el TP)
  /** Incluye passwordHash: solo para validar credenciales en AuthService. */
  buscarPorEmailOUsernameConPassword(identificador: string) {
    return this.model
      .findOne({
        $or: [{ email: identificador.toLowerCase() }, { username: identificador.toLowerCase() }],
      })
      .select('+passwordHash')
      .lean();
  }

  buscarPorId(id: string) {
    return this.model.findById(id).lean();
  }

  async actualizarFoto(id: string, foto: Express.Multer.File) {
    const previo = await this.model.findById(id).select('fotoPublicId').lean();

    const subida = await this.imagenes.procesarYSubir(foto, {
      carpeta: 'perfiles',
      ancho: 400,
      alto: 400,
      fit: 'cover',
    });

    const actualizado = await this.model
      .findByIdAndUpdate(
        new Types.ObjectId(id),
        { $set: { fotoPerfil: subida.url, fotoPublicId: subida.publicId } },
        { new: true },
      )
      .select('-passwordHash')
      .lean();

    if (previo?.fotoPublicId) await this.imagenes.eliminar(previo.fotoPublicId);
    return actualizado;
  }
}