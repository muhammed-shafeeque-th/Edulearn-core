import { HealthCheckProviders } from "../health.constants";
import { IHealthCheck } from "../interfaces/health-check-result";

export class ReadinessService {

  constructor(
     private readonly healthChecks: IHealthCheck[],
  ) {}

  async checkReadiness(): Promise<{
    status: "ready" | "not_ready";
    checks: Record<string, any>;
  }> {
    const results: Record<string, any> = {};
    let allUp = true;

    for (const check of this.healthChecks) {
      try {
        const result = await check.check();
        results[result.name] = {
          status: result.status,
          ...(result.error && { error: result.error }),
        };
        if (result.status === "down") {
          allUp = false;
        }
      } catch (error: any) {
        const name = (check as any).constructor?.name || "unknown";
        results[name] = { status: "down", error: error.message };
        allUp = false;
      }
    }

    return {
      status: allUp ? "ready" : "not_ready",
      checks: results,
    };
  }
}
