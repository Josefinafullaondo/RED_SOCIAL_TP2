import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CrearPublicacionDto {
  @IsString({ message: 'El texto de la publicación debe ser una cadena de texto' })
  @MinLength(1, { message: 'La publicación no puede estar vacía' })
  @MaxLength(1000, { message: 'La publicación no puede superar los 1000 caracteres' })
  texto: string;

  @IsOptional()
  imagen?: string;
}