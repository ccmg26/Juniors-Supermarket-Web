import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  // Verify admin session
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const { data: adminRow } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();
  if (!adminRow) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const { data: subscribers, error } = await supabase
    .from("deals_club_subscribers")
    .select("email, phone, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return new NextResponse("Failed to fetch subscribers", { status: 500 });
  }

  const header = "Email,Phone,Joined\r\n";
  const rows = (subscribers ?? [])
    .map((s) => {
      const email = `"${s.email.replace(/"/g, '""')}"`;
      const phone = s.phone ? `"${s.phone.replace(/"/g, '""')}"` : "";
      const joined = new Date(s.created_at).toISOString().slice(0, 10);
      return `${email},${phone},${joined}`;
    })
    .join("\r\n");

  const csv = header + rows;
  const filename = `deals-club-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
