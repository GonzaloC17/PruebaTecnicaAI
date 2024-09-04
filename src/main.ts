import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors(); // Permite solicitudes CORS desde el frontend
  app.useStaticAssets('public'); // Sirve archivos estáticos desde la carpeta `public`
  await app.listen(3000); // Escucha en el puerto 3000
}
bootstrap();