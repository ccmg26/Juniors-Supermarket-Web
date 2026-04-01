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
      <div className="flex items-center gap-3 mb-6">
        <a href="/admin/weekly-ads" className="text-muted-fg hover:text-fg text-sm">
          ← Weekly Ads
        </a>
        <span className="text-muted-fg">/</span>
        <h1 className="text-2xl font-black text-fg">Edit Ad</h1>
      </div>
      <WeeklyAdForm ad={ad} />
    </div>
  );
}
