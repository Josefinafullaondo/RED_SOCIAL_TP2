import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.use(cookieParser());
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // convierte query params (limit, offset) a números
    }),
  );

  app.enableCors({
    origin: config.get<string>('FRONTEND_URL'),
    credentials: true, // necesario para que el navegador envíe/reciba cookies
  });

  await app.listen(config.get<number>('PORT') ?? 3000);
  console.log(`API en http://localhost:${config.get('PORT') ?? 3000}/api`);
}
bootstrap();