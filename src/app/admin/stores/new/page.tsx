import StoreForm from "../StoreForm";

export default function NewStorePage() {
  return (
    <div>
      <h1 className="text-2xl font-black text-fg mb-6">Add New Store</h1>
      <div className="bg-card rounded-2xl border border-border p-6">
        <StoreForm />
      </div>
    </div>
  );
}
