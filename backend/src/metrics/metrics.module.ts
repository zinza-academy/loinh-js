import { Module } from '@nestjs/common';
import { PrometheusService } from './prometheus.service';
import { MetricsController } from './metrics.controller';
import { CustomMetricsService } from './custom-metrics.service';
import { MetricsInterceptor } from '../interceptors/metrics.interceptor';

@Module({
  controllers: [MetricsController],
  providers: [PrometheusService, CustomMetricsService, MetricsInterceptor],
  exports: [PrometheusService, CustomMetricsService, MetricsInterceptor],
})
export class MetricsModule {}
