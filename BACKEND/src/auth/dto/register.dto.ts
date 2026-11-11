import { Transform } from 'class-transformer';
import { 
  IsEmail, 
  IsNotEmpty, 
  IsString, 
  MaxLength, 
  MinLength, 
  Matches, 
  IsOptional, 
  IsDateString 
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  apellido: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  username: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(72) // límite de bcrypt
  @Matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, { 
    message: 'La contraseña debe poseer al menos 8 caracteres, una mayúscula y un número' 
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  passwordConfirm: string; // El TP pide el campo. La validación de que sean iguales suele hacerse en el front, o con un decorador custom acá.

  @IsNotEmpty()
  @IsDateString({}, { message: 'Debe ser una fecha válida (YYYY-MM-DD)' })
  fechaNacimiento: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  descripcion: string;

  @IsOptional()
  @IsString()
  rol?: string; // Para permitir que desde el front se envíe si es 'usuario' o 'administrador'
}