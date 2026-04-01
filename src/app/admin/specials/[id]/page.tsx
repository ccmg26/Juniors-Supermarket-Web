import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import SpecialForm from "../SpecialForm";

interface Props { params: Promise<{ id: string }>; }

export default async function EditSpecialPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: special } = await supabase.from("specials").select("*").eq("id", id).single();
  if (!special) notFound();
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/specials" className="text-muted-fg hover:text-fg text-sm">
          ← Specials
        </Link>
        <span className="text-muted-fg">/</span>
        <h1 className="text-2xl font-black text-fg">Edit Special</h1>
      </div>
      <SpecialForm special={special} />
    </div>
  );
}
