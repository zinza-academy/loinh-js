import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  collectDefaultMetrics,
  register,
  Histogram,
  Counter,
  Gauge,
} from 'prom-client';

@Injectable()
export class PrometheusService implements OnModuleInit {
  private readonly httpRequestDuration: Histogram<string>;
  private readonly httpRequestsTotal: Counter<string>;
  private readonly httpRequestsInProgress: Gauge<string>;

  constructor() {
    // Clear registry first to avoid duplicate registration
    register.clear();
    
    // HTTP request duration histogram
    this.httpRequestDuration = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status_code'],
      buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
    });

    // HTTP requests total counter
    this.httpRequestsTotal = new Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status_code'],
    });

    // HTTP requests in progress gauge
    this.httpRequestsInProgress = new Gauge({
      name: 'http_requests_in_progress',
      help: 'Number of HTTP requests currently being processed',
      labelNames: ['method', 'route'],
    });
  }

  onModuleInit() {
    // Only collect default metrics, don't call it manually to avoid conflicts
    if (register.getSingleMetric('process_cpu_user_seconds_total') === undefined) {
      collectDefaultMetrics();
    }
  }

  getMetrics(): Promise<string> {
    return register.metrics();
  }

  recordHttpRequest(
    method: string,
    route: string,
    statusCode: number,
    duration: number,
  ) {
    const labels = { method, route, status_code: statusCode.toString() };
    
    this.httpRequestDuration.observe(labels, duration);
    this.httpRequestsTotal.inc(labels);
  }

  incrementRequestsInProgress(method: string, route: string) {
    this.httpRequestsInProgress.inc({ method, route });
  }

  decrementRequestsInProgress(method: string, route: string) {
    this.httpRequestsInProgress.dec({ method, route });
  }

  clearRegistry() {
    register.clear();
  }
}
