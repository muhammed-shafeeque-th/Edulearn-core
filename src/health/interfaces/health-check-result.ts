export interface IHealthCheck {
  check(): Promise<HealthCheckResult>;
}

export interface HealthCheckResult {
  name: string;
  status: 'up' | 'down';
  details?: any;
  error?: string;
}
