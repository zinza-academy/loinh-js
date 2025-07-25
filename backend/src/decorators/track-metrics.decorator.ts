import { SetMetadata } from '@nestjs/common';

export const TRACK_METRICS_KEY = 'track_metrics';

export interface MetricsConfig {
  operation?: string;
  searchType?: string;
  trackDuration?: boolean;
}

export const TrackMetrics = (config: MetricsConfig = {}) =>
  SetMetadata(TRACK_METRICS_KEY, config);
