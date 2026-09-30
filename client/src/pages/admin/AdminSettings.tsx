import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarAdmin from "../../components/navbar/navbarAdmin";
import { getRules, updateRules } from "../../services/rulesService";
import { broadcastMessage } from "../../services/messageService";
import { changePassword } from "../../services/userService";

const cardClass =
  "rounded-lg border border-gray-200 p-5 dark:border-gray-700 space-y-3";
const inputClass =
  "w-full rounded-md  bg-white border border-gray-300 p-2 dark:border-gray-600 dark:bg-[#111C22]";
const buttonClass =
  "rounded-md bg-[#1F5C73] px-4 py-2 text-white hover:bg-[#17485A]";

export default function AdminSettings() {
  const [rules, setRules] = useState("");
  const [messageTitle, setMessageTitle] = useState("");
  const [message, setMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    getRules()
      .then((data) => setRules(data?.content ?? ""))
      .catch((error) => console.error(error));
  }, []);

  async function handleSaveRules(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await updateRules(rules);
      alert("Ordningsreglerna är sparade");
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Kunde inte spara regler");
    }
  }

  async function handleBroadcast(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const result = await broadcastMessage(messageTitle, message);
      alert(result.message);
      setMessageTitle("");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Kunde inte skicka meddelandet",
      );
    }
  }

  async function handleChangePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await changePassword(newPassword);
      alert("Lösenordet är ändrat");
      setNewPassword("");
    } catch (error) {
      console.error(error);
      alert("Kunde inte ändra lösenord");
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-[#f8f9fb] dark:bg-[#111C22]">
      <NavbarAdmin />
      <main className="flex-1 flex items-center justify-center p-4 py-10 sm:p-8 lg:pl-64">
        <div className="p-4 py-10 sm:p-8 max-w-4xl w-full border rounded-lg border-gray-300 shadow-sm space-y-6">
          <Link to="/admin">Tillbaka</Link>

          <h1 className="text-2xl font-bold">Inställningar</h1>

          {/* Ordningsregler */}
          <form onSubmit={handleSaveRules} className={cardClass}>
            <h2 className="text-lg font-semibold">Ordningsregler</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Visas för boende under Regler. En regel per rad.
            </p>
            <textarea
              required
              value={rules}
              onChange={(e) => setRules(e.target.value)}
              className={`${inputClass} min-h-48`}
            />
            <button type="submit" className={buttonClass}>
              Spara regler
            </button>
          </form>

          {/* Meddelande till alla */}
          <form onSubmit={handleBroadcast} className={cardClass}>
            <h2 className="text-lg font-semibold">Meddelande till alla boende</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
            Meddelanden på varje boendes profil
            </p>
            <input
              type="text"
              required
              placeholder="Rubrik"
              value={messageTitle}
              onChange={(e) => setMessageTitle(e.target.value)}
              className={inputClass}
            />
            <textarea
              required
              placeholder="Meddelande"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${inputClass} min-h-24`}
            />
            <button type="submit" className={buttonClass}>
              Skicka till alla
            </button>
          </form>

          {/* Lösenord */}
          <form onSubmit={handleChangePassword} className={cardClass}>
            <h2 className="text-lg font-semibold">Byt ditt lösenord</h2>
            <input
              type="password"
              required
              placeholder="Nytt lösenord"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inputClass}
            />
            <button type="submit" className={buttonClass}>
              Byt lösenord (admin)
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
