import { Module } from '@nestjs/common';
import { AuthCoreModule } from './auth-core.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { ImagenesModule } from '../imagenes/imagenes.module';

@Module({
  imports: [AuthCoreModule, UsuariosModule, ImagenesModule,],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, AuthCoreModule],
})
export class AuthModule {}