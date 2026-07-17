import { createServer, Server } from "node:http";
import { MetricsConfigs } from "../metrics.config";
import { MetricService } from "../register/prom-metric.service";

export class MetricsServer {
  private readonly port: number;
  private readonly path: string;
  private server?: Server;

  constructor(
    private readonly metricsService: MetricService,
    { port = 9090, path = "/metrics" }: MetricsConfigs = {},
  ) {
    this.port = port;
    this.path = path;
  }

  public async start(): Promise<void> {
    if (this.server) {
      return;
    }

    this.server = createServer(async (req, res) => {
      try {
        if (req.method !== "GET") {
          res.writeHead(405, {
            "Content-Type": "text/plain",
          });

          res.end("Method Not Allowed");
          return;
        }

        if (req.url !== this.path) {
          res.writeHead(404, {
            "Content-Type": "text/plain",
          });

          res.end("Not Found");
          return;
        }

        const metrics = await this.metricsService.metrics();

        res.writeHead(200, {
          "Content-Type": this.metricsService.contentType(),
        });

        res.end(metrics);
      } catch (err) {
        console.error("Failed to collect Prometheus metrics", err);

        res.writeHead(500, {
          "Content-Type": "text/plain",
        });

        res.end("Internal Server Error");
      }
    });

    await new Promise<void>((resolve) => {
      this.server!.listen(this.port, resolve);
    });

    console.info(
      `[metrics] Prometheus metrics available at ${this.port}${this.path}`,
    );
  }

  public async stop(): Promise<void> {
    if (!this.server) {
      return;
    }

    await new Promise<void>((resolve, reject) => {
      this.server!.close((err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });

    this.server = undefined;
  }
}
