import { createCounter, createHistogram } from '../metric.factory';

export const dbMetrics = {
  queriesTotal: createCounter('database_queries_total', 'Total number of database queries', ['operation']),
  queryDuration: createHistogram(
    'database_query_duration_seconds',
    'Duration of database queries in seconds',
    ['operation']
  ),
};