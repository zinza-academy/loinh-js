import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validateEnvConfig } from 'config/envConfig';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  validateEnvConfig();
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`🚀 Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
  });
}
bootstrap();
