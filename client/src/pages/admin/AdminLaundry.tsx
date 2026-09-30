import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { WashingMachine } from "lucide-react";
import NavbarAdmin from "../../components/navbar/navbarAdmin";
import type { AdminEquipment } from "../../components/admin/adminTypes";
import {
  getAdminEquipment,
  setEquipmentAvailability,
} from "../../services/equipmentService";

export default function AdminLaundry() {
  const [equipment, setEquipment] = useState<AdminEquipment[]>([]);

  function loadEquipment() {
    getAdminEquipment()
      .then((data) => setEquipment(data))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    loadEquipment();
  }, []);

  async function handleToggle(item: AdminEquipment) {
    const makeAvailable = item.is_available === 0;

    try {
      await setEquipmentAvailability(item.equipment_id, makeAvailable);
      setEquipment((prev) =>
        prev.map((e) =>
          e.equipment_id === item.equipment_id
            ? { ...e, is_available: makeAvailable ? 1 : 0 }
            : e,
        ),
      );
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Kunde inte uppdatera maskinen",
      );
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-[#f8f9fb] dark:bg-[#111C22]">
      <NavbarAdmin />
      <main className="flex-1 flex items-center justify-center p-4 py-10 sm:p-8 lg:pl-64">
        <div className="p-4 py-10 sm:p-8 max-w-4xl w-full border rounded-lg  bg-white border-gray-300 shadow-sm">
          <Link to="/admin">Tillbaka</Link>

          <h1 className="text-2xl font-bold my-4">Tvättstugor</h1>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Markera en maskin som ur funktion när den redan är felanmäld. Då
            kan boende inte felanmäla den igen förrän du gör den tillgänglig.
          </p>

          {equipment.length === 0 ? (
            <p className="text-gray-400 text-center">Inga maskiner än</p>
          ) : (
            <ul className="space-y-3">
              {equipment.map((item) => {
                const isAvailable = item.is_available === 1;

                return (
                  <li
                    key={item.equipment_id}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <WashingMachine className="text-[#1F5C73]" />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          {item.open_reports > 0
                            ? `${item.open_reports} öppen felanmälan${item.open_reports > 1 ? "ar" : ""}`
                            : "Inga öppna felanmälningar"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          isAvailable
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {isAvailable ? "I drift" : "Ur funktion"}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleToggle(item)}
                        className="rounded-md border border-[#1F5C73] px-3 py-1.5 text-sm text-[#1F5C73] hover:bg-[#1F5C73] hover:text-white dark:text-[#C7CED1]"
                      >
                        {isAvailable ? "Markera ur funktion" : "Gör tillgänglig"}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
