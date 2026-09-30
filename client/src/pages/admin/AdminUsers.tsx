import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarAdmin from "../../components/navbar/navbarAdmin";
import type { User } from "../../components/admin/adminTypes";
import { getUsers, deleteUser } from "../../services/userService";
import CreateUserView from "../../components/admin/CreateUserView";
import { Trash } from "lucide-react";

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [showCreate, setShowCreate] = useState(false);

  function loadUsers() {
    getUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleDelete(userId: number) {
    const confirmed = window.confirm(
      "Är du säker på att du vill ta bort denna användare?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u.user_id !== userId));
    } catch (error) {
      console.error(error);
      alert("Kunde inte ta bort användaren");
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-[#f8f9fb] dark:bg-[#111C22]">
      <NavbarAdmin />
      <main className="flex-1 flex items-center justify-center p-4 py-10 sm:p-8 lg:pl-64">
        <div className="p-4 py-10 sm:p-8 sm:py-25 max-w-4xl w-full border rounded-lg  bg-white border-gray-300 shadow-sm">
          <Link to="/admin">Tillbaka</Link>

          <div className="flex items-center justify-between my-4">
            <h1 className="text-2xl font-bold">Användare</h1>
            <button
              onClick={() => setShowCreate(true)}
              className="rounded-md bg-[#1F5C73] px-4 py-2 text-white hover:bg-[#17485A]"
            >
              Skapa användare
            </button>
          </div>

          {users.length === 0 ? (
            <p className="text-gray-400 text-center">Inga användare än</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-420px">
                <thead>
                  <tr>
                    <th>Namn</th>
                    <th>Roll</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10"
                      key={u.user_id}
                    >
                      <td>{u.username}</td>
                      <td>{u.role}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(u.user_id)}
                          className="text-gray-400 transition delay-150 duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-98"
                        >
                          <Trash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {showCreate && (
        <CreateUserView
          onClose={() => setShowCreate(false)}
          onCreated={loadUsers}
        />
      )}
    </div>
  );
}
