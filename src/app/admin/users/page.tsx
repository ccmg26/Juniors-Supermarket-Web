import { adminListAdminUsers } from "@/lib/actions";
import CreateUserForm from "./CreateUserForm";

export const metadata = { title: "Admin Users" };

export default async function AdminUsersPage() {
  const { data: users, error } = await adminListAdminUsers();

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-black text-fg">Admin Users</h1>
        <p className="text-muted-fg mt-1">
          Manage who can log in to this admin panel.
        </p>
      </div>

      {/* Create new user */}
      <CreateUserForm onCreated={async () => { "use server"; }} />

      {/* Existing users list */}
      <div>
        <h2 className="font-bold text-fg mb-3">Current Admins</h2>
        {error ? (
          <p className="text-red-600 text-sm">{error}</p>
        ) : users.length === 0 ? (
          <p className="text-muted-fg text-sm">No admin users found.</p>
        ) : (
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="text-left px-4 py-3 font-semibold text-fg">Email</th>
                  <th className="text-left px-4 py-3 font-semibold text-fg">Added</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u: { id: string; email: string; created_at: string }) => (
                  <tr key={u.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-fg font-medium">{u.email}</td>
                    <td className="px-4 py-3 text-muted-fg">
                      {new Date(u.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-accent rounded-2xl border border-border p-5 text-sm text-muted-fg space-y-2">
        <p className="font-semibold text-fg">Need to remove an admin?</p>
        <p>
          Go to your{" "}
          <span className="font-medium text-fg">Supabase dashboard → Authentication → Users</span>,
          find the user, and delete them. They will automatically be removed from the admin list.
        </p>
      </div>
    </div>
  );
}
