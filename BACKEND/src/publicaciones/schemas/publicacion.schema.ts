import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PublicacionDocument = HydratedDocument<Publicacion>;

@Schema({ timestamps: true, versionKey: false })
export class Publicacion {
  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true, index: true })
  autor: Types.ObjectId;

  @Prop({ required: true, trim: true, maxlength: 500 })
  texto: string;

  @Prop({ type: String, default: null })
  imagenUrl: string | null;

  @Prop({ type: String, default: null })
  imagenPublicId: string | null;

  createdAt: Date;
  updatedAt: Date;
}

export const PublicacionSchema = SchemaFactory.createForClass(Publicacion);