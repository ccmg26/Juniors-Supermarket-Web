import SpecialForm from "../SpecialForm";
export default function NewSpecialPage() {
  return (
    <div>
      <h1 className="text-2xl font-black text-fg mb-6">Add Special</h1>
      <div className="bg-card rounded-2xl border border-border p-6"><SpecialForm /></div>
    </div>
  );
}
