import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import StoreForm from "../StoreForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditStorePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: store } = await supabase
    .from("stores")
    .select("*")
    .eq("id", id)
    .single();

  if (!store) notFound();

  return (
    <div>
      <h1 className="text-2xl font-black text-fg mb-6">Edit Store: {store.name}</h1>
      <div className="bg-card rounded-2xl border border-border p-6">
        <StoreForm store={store} />
      </div>
    </div>
  );
}
