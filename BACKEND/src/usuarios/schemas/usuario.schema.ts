import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema({ timestamps: true, versionKey: false })
export class Usuario {
  @Prop({ required: true, trim: true, maxlength: 60 })
  nombre: string;

  @Prop({ required: true, trim: true, maxlength: 60 })
  apellido: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true, maxlength: 30 })
  username: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  /** select: false → nunca se devuelve salvo que lo pidas con '+passwordHash'. */
  @Prop({ required: true, select: false })
  passwordHash: string;

  // El TP pide que los roles sean específicamente 'usuario' o 'administrador'
  @Prop({ type: String, enum: ['usuario', 'administrador'], default: 'usuario' })
  rol: 'usuario' | 'administrador';

  @Prop({ required: true, type: Date })
  fechaNacimiento: Date;

  @Prop({ required: true, maxlength: 250 })
  descripcion: string;

  @Prop({ type: String, default: null })
  fotoPerfil: string | null;

  @Prop({ type: String, default: null })
  fotoPublicId: string | null;

  @Prop({ type: Boolean, default: true })
  activo: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);