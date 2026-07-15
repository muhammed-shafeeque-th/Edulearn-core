export type ObservabilityConfig =  {
    serviceName: string;
    version: string;
    environment: string;
    logging: {
        level: string;
        enableConsole: boolean;
    };
    tracing: {
        enabled: boolean;
        samplerRatio: number;
        exporterEndpoint: string;
    };
    metrics: {
        enabled: boolean;
        exporterEndpoint: string;
        collectDefault: boolean;
    };
}
