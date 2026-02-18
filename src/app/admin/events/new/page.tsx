import EventForm from "../EventForm";
export default function NewEventPage() {
  return (
    <div>
      <h1 className="text-2xl font-black text-fg mb-6">Add Event</h1>
      <div className="bg-card rounded-2xl border border-border p-6"><EventForm /></div>
    </div>
  );
}
