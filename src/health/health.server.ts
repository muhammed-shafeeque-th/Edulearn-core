import { HealthController } from "./controllers/health.controller";
import { IHealthCheck } from "./interfaces/health-check-result";
import { createServer, Server } from "http";

export class HealthServer {
  private readonly server: Server;
  private readonly controller: HealthController;
  constructor(config: { port: number }, checks: IHealthCheck[]) {
    this.server = createServer().listen(config.port, () => {
      console.info(`[health-server] listening on port ${config.port}`, {
        ctx: "HealthServer",
      });
    });

    this.controller = new HealthController(this.server, checks);
  }
  register() {
    this.controller.execute();
  }
}
