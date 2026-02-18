import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import WeeklyAdForm from "../WeeklyAdForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditWeeklyAdPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: ad } = await supabase.from("weekly_ads").select("*").eq("id", id).single();
  if (!ad) notFound();
  return (
    <div>
      <h1 className="text-2xl font-black text-fg mb-6">Edit Weekly Ad</h1>
      <div className="bg-card rounded-2xl border border-border p-6">
        <WeeklyAdForm ad={ad} />
      </div>
    </div>
  );
}
