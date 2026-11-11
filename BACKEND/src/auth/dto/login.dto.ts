import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  // Cambiamos email por identificador para aceptar tanto correo como username
  @IsString()
  @IsNotEmpty()
  identificador: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;
}