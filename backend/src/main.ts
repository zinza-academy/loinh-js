import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validateEnv } from 'config/envConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  validateEnv();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
