import { useState } from "react";
import { createSlot } from "../../services/bookingService";
import {
  TIME_SLOTS,
  toDateStr,
  type Booking,
} from "./calendar/calendarTypes";

type Props = {
  initialDate?: string;
  initialStart?: string;
  existingSlots: Booking[];
  onClose: () => void;
  onCreated: () => void;
};

function CreateSlotView({
  initialDate,
  initialStart,
  existingSlots,
  onClose,
  onCreated,
}: Props) {
  const today = toDateStr(new Date());
  const [date, setDate] = useState(initialDate ?? today);
  const [start, setStart] = useState(initialStart ?? "");

  
  const takenStarts = existingSlots
    .filter((s) => s.date === date)
    .map((s) => s.time.slice(0, 5));

  const allTaken = TIME_SLOTS.every((t) => takenStarts.includes(t.start));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    
    const toCreate =
      start === "all"
        ? TIME_SLOTS.filter((t) => !takenStarts.includes(t.start))
        : TIME_SLOTS.filter((t) => t.start === start);

    if (toCreate.length === 0) return;

    try {
      for (const slot of toCreate) {
        await createSlot({ date, startTime: slot.start, endTime: slot.end });
      }
      onCreated();
      onClose();
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Kunde inte skapa tvättid");
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-[#16242C] rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Skapa tider</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Datum</label>
            <input
              type="date"
              required
              min={today}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setStart("");
              }}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Tid</label>
            <select
              required
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Välj tid</option>
              <option value="all" disabled={allTaken}>
                Välj alla tider
              </option>
              {TIME_SLOTS.map((t) => {
                const taken = takenStarts.includes(t.start);
                return (
                  <option key={t.start} value={t.start} disabled={taken}>
                    {t.start}–{t.end}
                    {taken ? " (finns redan)" : ""}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-[#1F5C73] px-4 py-2 text-white hover:bg-[#17485A]"
          >
            Skapa
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateSlotView;
