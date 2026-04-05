import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import webpush from "web-push";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  // Require admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const { data: adminRow } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();
  if (!adminRow) return new NextResponse("Forbidden", { status: 403 });

  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  if (!publicKey || !privateKey) {
    return NextResponse.json(
      { error: "VAPID keys not configured. Set NEXT_PUBLIC_VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY." },
      { status: 500 }
    );
  }

  webpush.setVapidDetails("mailto:info@juniorssupermarket.com", publicKey, privateKey);

  let body: { title?: string; body?: string; url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const payload = JSON.stringify({
    title: body.title || "Junior's Supermarket",
    body: body.body || "New weekly deals are live!",
    url: body.url || "/weekly-ad",
    tag: "juniors-weekly-ad",
  });

  const { data: subscriptions } = await supabase
    .from("push_subscriptions")
    .select("endpoint, p256dh, auth");

  if (!subscriptions?.length) {
    return NextResponse.json({ sent: 0, message: "No subscribers" });
  }

  const results = await Promise.allSettled(
    subscriptions.map((sub) =>
      webpush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
        payload
      )
    )
  );

  const sent = results.filter((r) => r.status === "fulfilled").length;
  const failed = results.length - sent;

  // Remove subscriptions that returned 410 Gone (unsubscribed)
  const goneEndpoints: string[] = [];
  results.forEach((r, i) => {
    if (
      r.status === "rejected" &&
      (r.reason as { statusCode?: number })?.statusCode === 410
    ) {
      goneEndpoints.push(subscriptions[i].endpoint);
    }
  });
  if (goneEndpoints.length) {
    await supabase
      .from("push_subscriptions")
      .delete()
      .in("endpoint", goneEndpoints);
  }

  return NextResponse.json({ sent, failed, total: subscriptions.length });
}
