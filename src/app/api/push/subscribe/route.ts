import { NextRequest, NextResponse } from "next/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";

const subscriptionSchema = z.object({
  endpoint: z.string().url().max(2048),
  keys: z.object({
    p256dh: z.string().min(20).max(512),
    auth: z.string().min(8).max(256),
  }),
});

function serviceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key
    ? createAdminClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })
    : null;
}

function allowed(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  return checkRateLimit(`push:${ip}`, 10, 60_000);
}

export async function POST(req: NextRequest) {
  if (!allowed(req)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  let body: { endpoint?: string; keys?: { p256dh?: string; auth?: string } };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = subscriptionSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid subscription" }, { status: 400 });
  const { endpoint, keys } = parsed.data;

  const supabase = serviceClient();
  if (!supabase) return NextResponse.json({ error: "Push service unavailable" }, { status: 503 });
  const { error } = await supabase.from("push_subscriptions").upsert(
    { endpoint, p256dh: keys.p256dh, auth: keys.auth },
    { onConflict: "endpoint" }
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  if (!allowed(req)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  let body: { endpoint?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.endpoint || !z.string().url().max(2048).safeParse(body.endpoint).success) {
    return NextResponse.json({ error: "Missing endpoint" }, { status: 400 });
  }

  const supabase = serviceClient();
  if (!supabase) return NextResponse.json({ error: "Push service unavailable" }, { status: 503 });
  const { error } = await supabase.from("push_subscriptions").delete().eq("endpoint", body.endpoint);
  if (error) return NextResponse.json({ error: "Unable to unsubscribe" }, { status: 503 });

  return NextResponse.json({ success: true });
}
