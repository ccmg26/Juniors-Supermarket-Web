import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import JobForm from "../JobForm";

interface Props { params: Promise<{ id: string }>; }
export default async function EditJobPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: job } = await supabase.from("jobs").select("*").eq("id", id).single();
  if (!job) notFound();
  return (
    <div>
      <h1 className="text-2xl font-black text-fg mb-6">Edit Job</h1>
      <div className="bg-card rounded-2xl border border-border p-6"><JobForm job={job} /></div>
    </div>
  );
}
