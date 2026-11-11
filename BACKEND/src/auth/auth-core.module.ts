import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { DURACION_SEG } from './constants/auth.constants';
import { JwtCookieGuard } from './guards/jwt-cookie.guard';
import { Sesion, SesionSchema } from './schemas/sesion.schema';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: DURACION_SEG },
      }),
    }),
    MongooseModule.forFeature([{ name: Sesion.name, schema: SesionSchema }]),
  ],
  providers: [JwtCookieGuard],
  exports: [JwtModule, MongooseModule, JwtCookieGuard],
})
export class AuthCoreModule {}