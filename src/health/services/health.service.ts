import { HealthCheckResult } from '../interfaces/health-check-result';

export class HealthService {
  getHealth(): {
    status: string;
    timestamp: string;
    service: string;
    version: string;
  } {
    return {
      status: 'up',
      timestamp: new Date().toISOString(),
      service: process.env.SERVICE_NAME || 'unknown',
      version: process.env.npm_package_version || '1.0.0',
    };
  }
}
