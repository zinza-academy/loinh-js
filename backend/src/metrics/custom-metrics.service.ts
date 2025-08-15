import { Injectable } from '@nestjs/common';
import { Counter, Histogram, Gauge } from 'prom-client';

@Injectable()
export class CustomMetricsService {
  private readonly userOperations: Counter<string>;
  private readonly userSearchDuration: Histogram<string>;
  private readonly activeUsers: Gauge<string>;
  private readonly vaccinationRegistrations: Counter<string>;
  private readonly authenticationAttempts: Counter<string>;
  
  // API-specific response time metrics
  private readonly apiResponseTime: Histogram<string>;
  private readonly databaseQueryDuration: Histogram<string>;
  private readonly apiCallsPerEndpoint: Counter<string>;

  constructor() {
    // User operations counter
    this.userOperations = new Counter({
      name: 'user_operations_total',
      help: 'Total number of user operations',
      labelNames: ['operation', 'status'],
    });

    // User search duration
    this.userSearchDuration = new Histogram({
      name: 'user_search_duration_seconds',
      help: 'Duration of user search operations in seconds',
      labelNames: ['search_type'],
      buckets: [0.1, 0.5, 1, 2, 5],
    });

    // Active users gauge
    this.activeUsers = new Gauge({
      name: 'active_users_count',
      help: 'Number of currently active users',
    });

    // Vaccination registrations counter
    this.vaccinationRegistrations = new Counter({
      name: 'vaccination_registrations_total',
      help: 'Total number of vaccination registrations',
      labelNames: ['status', 'vaccine_type'],
    });

    // Authentication attempts counter
    this.authenticationAttempts = new Counter({
      name: 'authentication_attempts_total',
      help: 'Total number of authentication attempts',
      labelNames: ['method', 'status'],
    });

    // API-specific response time histogram
    this.apiResponseTime = new Histogram({
      name: 'api_endpoint_duration_seconds',
      help: 'Response time of specific API endpoints in seconds',
      labelNames: ['endpoint', 'method', 'status_code'],
      buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
    });

    // Database query duration
    this.databaseQueryDuration = new Histogram({
      name: 'database_query_duration_seconds',
      help: 'Duration of database queries in seconds',
      labelNames: ['operation', 'table'],
      buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1],
    });

    // API calls per endpoint counter
    this.apiCallsPerEndpoint = new Counter({
      name: 'api_calls_per_endpoint_total',
      help: 'Total number of API calls per endpoint',
      labelNames: ['endpoint', 'method', 'user_role'],
    });
  }

  // User operations metrics
  incrementUserOperation(operation: string, status: 'success' | 'error') {
    this.userOperations.inc({ operation, status });
  }

  // User search metrics
  recordUserSearchDuration(searchType: string, duration: number) {
    this.userSearchDuration.observe({ search_type: searchType }, duration);
  }

  // Active users metrics
  setActiveUsers(count: number) {
    this.activeUsers.set(count);
  }

  incrementActiveUsers() {
    this.activeUsers.inc();
  }

  decrementActiveUsers() {
    this.activeUsers.dec();
  }

  // Vaccination registration metrics
  incrementVaccinationRegistration(status: string, vaccineType: string) {
    this.vaccinationRegistrations.inc({ status, vaccine_type: vaccineType });
  }

  // Authentication metrics
  incrementAuthenticationAttempt(method: string, status: 'success' | 'failure') {
    this.authenticationAttempts.inc({ method, status });
  }

  // API-specific metrics
  recordApiResponseTime(endpoint: string, method: string, statusCode: number, duration: number) {
    this.apiResponseTime.observe(
      { endpoint, method, status_code: statusCode.toString() },
      duration
    );
  }

  recordDatabaseQuery(operation: string, table: string, duration: number) {
    this.databaseQueryDuration.observe({ operation, table }, duration);
  }

  incrementApiCall(endpoint: string, method: string, userRole?: string) {
    this.apiCallsPerEndpoint.inc({
      endpoint,
      method,
      user_role: userRole || 'anonymous'
    });
  }
}
