import { Link } from "react-router-dom";
import NavbarAdmin from "../../components/navbar/navbarAdmin";
import type { User } from "../../components/admin/adminTypes";

const users: User[] = [];

export default function AdminUsers() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fb] dark:bg-[#111C22]">
      <NavbarAdmin />
      <main className="flex-1 flex items-center justify-center p-4 py-10 sm:p-8 lg:pl-64">
        <div className="p-4 py-10 sm:p-8 sm:py-25 max-w-4xl w-full border rounded-lg border-gray-300 shadow-sm">
          <Link to="/admin">Tillbaka</Link>
          <h1 className="text-2xl text-center font-bold my-4">Användare</h1>

          {users.length === 0 ? (
            <p className="text-gray-400 text-center">Inga användare än</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[420px]">
                <thead>
                  <tr>
                    <th>Namn</th>
                    <th>E-post</th>
                    <th>Roll</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
