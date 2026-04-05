/**
 * Validated environment variables.
 * Throws at startup with a clear message if required vars are missing.
 * Import from here instead of using process.env directly.
 */

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}\n` +
      `Add it to .env.local (development) or your Vercel project settings (production).\n` +
      `See .env.local.example for the full list.`
    );
  }
  return value;
}

// ── Supabase (required for all DB + auth operations) ─────────────────────────
export const SUPABASE_URL              = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
export const SUPABASE_ANON_KEY         = requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
export const SUPABASE_SERVICE_ROLE_KEY = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

// ── Web Push VAPID (optional — only required when push notifications are used) ─
export function getVapidKeys(): { publicKey: string; privateKey: string } {
  const publicKey  = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  if (!publicKey || !privateKey) {
    throw new Error(
      "Missing VAPID keys: NEXT_PUBLIC_VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY are required for push notifications.\n" +
      "Generate them with: npx web-push generate-vapid-keys"
    );
  }
  return { publicKey, privateKey };
}
