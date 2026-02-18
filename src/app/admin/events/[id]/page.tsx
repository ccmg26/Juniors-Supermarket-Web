import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import EventForm from "../EventForm";

interface Props { params: Promise<{ id: string }>; }
export default async function EditEventPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: event } = await supabase.from("events").select("*").eq("id", id).single();
  if (!event) notFound();
  return (
    <div>
      <h1 className="text-2xl font-black text-brand-black mb-6">Edit Event</h1>
      <div className="bg-white rounded-2xl border border-gray-100 p-6"><EventForm event={event} /></div>
    </div>
  );
}
