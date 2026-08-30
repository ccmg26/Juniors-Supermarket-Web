type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

/** Best-effort per-instance limiter. Production should also enforce limits at the edge. */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
  now = Date.now()
): boolean {
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (current.count >= limit) return false;
  current.count += 1;
  return true;
}

export function resetRateLimitsForTests() {
  buckets.clear();
}
