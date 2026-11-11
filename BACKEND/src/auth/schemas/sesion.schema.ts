import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SesionDocument = HydratedDocument<Sesion>;

/** Registro de sesiones: permite cerrar sesión de forma real (revocar el jti del JWT). */
@Schema({ timestamps: true, versionKey: false })
export class Sesion {
  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true, index: true })
  usuario: Types.ObjectId;

  @Prop({ type: String, required: true, unique: true })
  jti: string;

  @Prop({ type: Boolean, default: false })
  revocada: boolean;

  /** TTL: Mongo elimina el documento cuando expira. */
  @Prop({ type: Date, required: true, index: { expires: 0 } })
  expiraEn: Date;
}

export const SesionSchema = SchemaFactory.createForClass(Sesion);