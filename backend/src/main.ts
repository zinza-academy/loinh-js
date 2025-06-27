import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validateEnvConfig } from 'config/envConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  validateEnvConfig();
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`🚀 Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
  });
}
bootstrap();
