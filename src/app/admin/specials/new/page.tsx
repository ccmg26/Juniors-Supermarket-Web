import Link from "next/link";
import SpecialForm from "../SpecialForm";

export default function NewSpecialPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/specials" className="text-muted-fg hover:text-fg text-sm">
          ← Specials
        </Link>
        <span className="text-muted-fg">/</span>
        <h1 className="text-2xl font-black text-fg">Add Special</h1>
      </div>
      <SpecialForm />
    </div>
  );
}
