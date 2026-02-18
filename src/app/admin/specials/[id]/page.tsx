import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import SpecialForm from "../SpecialForm";

interface Props { params: Promise<{ id: string }>; }
export default async function EditSpecialPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: special } = await supabase.from("specials").select("*").eq("id", id).single();
  if (!special) notFound();
  return (
    <div>
      <h1 className="text-2xl font-black text-brand-black mb-6">Edit Special</h1>
      <div className="bg-white rounded-2xl border border-gray-100 p-6"><SpecialForm special={special} /></div>
    </div>
  );
}
