import StoreForm from "../StoreForm";

export default function NewStorePage() {
  return (
    <div>
      <h1 className="text-2xl font-black text-brand-black mb-6">Add New Store</h1>
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <StoreForm />
      </div>
    </div>
  );
}
