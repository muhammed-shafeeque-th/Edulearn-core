export interface IMetrics {
  counter(name: string, value?: number): void;
  histogram(name: string, value: number): void;
}

