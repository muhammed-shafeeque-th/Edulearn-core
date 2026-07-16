import { HealthService } from "../services/health.service";
import { ReadinessService } from "../services/readiness.service";
import { Server } from "http";
import { IHealthCheck } from "../interfaces/health-check-result";

export class HealthController {
  private readonly healthService: HealthService;
  private readonly readinessService: ReadinessService;
  constructor(
    private readonly healthServer: Server,
    checks: IHealthCheck[],
  ) {
    this.healthService = new HealthService();
    this.readinessService = new ReadinessService(checks);
  }
  execute = () => {
    this.healthServer.on("request", async (req, res) => {
      switch (req.url) {
        case "/healthz":
          const healthStat = this.healthService.getHealth();
          res.writeHead(healthStat.status == "up" ? 200 : 503, {
            "content-type": "application/json",
          });
          res.end(JSON.stringify(healthStat));
          return;

        case "/ready":
          const readStat = await this.readinessService.checkReadiness();
          res.writeHead(readStat.status == "ready" ? 200 : 503, {
            "content-type": "application/json",
          });
          res.end(JSON.stringify(readStat));
          return;

        default:
          res.writeHead(503, { "content-type": "application/json" });
          res.end();
          return;
      }
    });
  };
}
