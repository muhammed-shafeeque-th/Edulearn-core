export interface GrpcMetadata {
  get?: (key: string) => Array<unknown> | undefined;
  [key: string]: unknown;
}
/**
 * Extracts values from gRPC Metadata using a mapping object.
 *
 * @template T - A mapping from your result keys to metadata keys.
 * @param meta - The gRPC Metadata object.
 * @param def - An object whose keys are the field names you want
 *              and whose values are the corresponding metadata keys to fetch.
 * @returns An object mapping the original keys to their found string values (if present).
 *
 */
export const getMetadataValues = <T extends Record<string, string>>(
  meta: unknown,
  def: T,
): { [K in keyof T]?: string } => {
  const m = meta as GrpcMetadata | undefined;
  if (!m || typeof def !== 'object') return {};

  const result: { [K in keyof T]?: string } = {};

  for (const key in def) {
    if (!Object.prototype.hasOwnProperty.call(def, key)) continue;
    const metaKey = def[key];

    let value: string | undefined;

    if (m && typeof m.get === 'function') {
      const res = m.get(metaKey);
      if (Array.isArray(res) && res.length > 0) {
        value = String(res[0]);
      }
    }

    if (!value && m && typeof m === 'object' && metaKey in m) {
      value = String((m as any)[metaKey]);
    }

    if (!value && m && typeof m === 'object' && Object.keys(m).length) {
      const keys = Object.keys(m as Record<string, unknown>);
      const found = keys.find((k) => k.toLowerCase() === metaKey.toLowerCase());
      if (found) value = String((m as any)[found]);
    }

    if (value) {
      result[key] = value;
    }
  }

  return result;
};
