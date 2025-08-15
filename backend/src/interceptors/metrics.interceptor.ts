import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { PrometheusService } from '../metrics/prometheus.service';
import { CustomMetricsService } from '../metrics/custom-metrics.service';
import { TRACK_METRICS_KEY, MetricsConfig } from '../decorators/track-metrics.decorator';
import { TRACK_API_METRICS_KEY, ApiMetricsConfig } from '../decorators/track-api-metrics.decorator';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(
    private readonly prometheusService: PrometheusService,
    private readonly customMetricsService: CustomMetricsService,
    private readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    
    const startTime = Date.now();
    const method = request.method;
    const route = this.getRoute(context);

    // Get metrics configuration from decorator
    const metricsConfig = this.reflector.getAllAndOverride<MetricsConfig>(
      TRACK_METRICS_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Get API-specific metrics configuration
    const apiMetricsConfig = this.reflector.getAllAndOverride<ApiMetricsConfig>(
      TRACK_API_METRICS_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Increment requests in progress
    this.prometheusService.incrementRequestsInProgress(method, route);

    return next.handle().pipe(
      tap({
        next: (data) => {
          this.recordMetrics(method, route, response.statusCode, startTime, metricsConfig, apiMetricsConfig, request, 'success', data);
        },
        error: (error) => {
          const statusCode = error.status || 500;
          this.recordMetrics(method, route, statusCode, startTime, metricsConfig, apiMetricsConfig, request, 'error', null);
        },
      }),
    );
  }

  private recordMetrics(
    method: string,
    route: string,
    statusCode: number,
    startTime: number,
    metricsConfig?: MetricsConfig,
    apiMetricsConfig?: ApiMetricsConfig,
    request?: any,
    status: 'success' | 'error' = 'success',
    responseData?: any,
  ) {
    const duration = (Date.now() - startTime) / 1000; // Convert to seconds
    
    // Record basic HTTP metrics
    this.prometheusService.recordHttpRequest(method, route, statusCode, duration);
    this.prometheusService.decrementRequestsInProgress(method, route);

    // Record custom metrics if configured
    if (metricsConfig) {
      if (metricsConfig.operation) {
        this.customMetricsService.incrementUserOperation(metricsConfig.operation, status);
      }

      if (metricsConfig.searchType && metricsConfig.trackDuration) {
        this.customMetricsService.recordUserSearchDuration(metricsConfig.searchType, duration);
      }
    }

    // Record API-specific metrics if configured
    if (apiMetricsConfig) {
      if (apiMetricsConfig.trackResponseTime) {
        this.customMetricsService.recordApiResponseTime(
          apiMetricsConfig.endpoint,
          method,
          statusCode,
          duration
        );
      }

      if (apiMetricsConfig.trackCalls) {
        const userRole = apiMetricsConfig.trackByUserRole 
          ? request?.user?.role || 'anonymous'
          : undefined;
        this.customMetricsService.incrementApiCall(
          apiMetricsConfig.endpoint,
          method,
          userRole
        );
      }
    }
  }

  private getRoute(context: ExecutionContext): string {
    const request = context.switchToHttp().getRequest();
    
    // Try to get the route pattern from the handler
    const handler = context.getHandler();
    const controller = context.getClass();
    
    // Get route from metadata if available
    const controllerPath = Reflect.getMetadata('path', controller) || '';
    const handlerPath = Reflect.getMetadata('path', handler) || '';
    
    if (controllerPath || handlerPath) {
      return `${controllerPath}${handlerPath}`.replace(/\/+/g, '/');
    }
    
    // Fallback to request URL
    return request.route?.path || request.url || 'unknown';
  }
}
