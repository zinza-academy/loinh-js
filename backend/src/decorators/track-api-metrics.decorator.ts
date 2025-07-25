import { SetMetadata } from '@nestjs/common';

export const TRACK_API_METRICS_KEY = 'track_api_metrics';

export interface ApiMetricsConfig {
  endpoint: string;
  trackResponseTime: boolean;
  trackCalls: boolean;
  trackByUserRole?: boolean;
}

export const TrackApiMetrics = (config: ApiMetricsConfig) =>
  SetMetadata(TRACK_API_METRICS_KEY, config);
