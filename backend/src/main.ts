import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validateEnvConfig } from 'config/envConfig';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { TransformInterceptor } from 'lib/shared/interceptor/transform.interceptor';
import { MetricsInterceptor } from './interceptors/metrics.interceptor';

async function bootstrap() {
  validateEnvConfig();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new TransformInterceptor());
  
  // Get MetricsInterceptor from app context
  const metricsInterceptor = app.get(MetricsInterceptor);
  app.useGlobalInterceptors(metricsInterceptor);

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(
      `🚀 Application is running on: http://localhost:${process.env.PORT ?? 3000}`,
    );
  });
}
bootstrap();
