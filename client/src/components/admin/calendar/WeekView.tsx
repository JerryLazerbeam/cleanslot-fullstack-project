import { toDateStr, type Booking } from "./calendarTypes";

type Props = {
  weekStart: Date; 
  bookings: Booking[];
  onSelectDay: (date: string) => void;
  onDeleteSlot: (slot: Booking) => void;
};

const dayNames = ["Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"];

function WeekView({ weekStart, bookings, onSelectDay, onDeleteSlot }: Props) {
  const today = toDateStr(new Date());
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  return (
    <div className="grid grid-cols-7 border border-gray-300 min-w-700px">
      {days.map((day, i) => {
        const dateStr = toDateStr(day);
        const daySlots = bookings.filter((b) => b.date === dateStr);
        const isPast = dateStr < today;

        return (
          <div
            key={dateStr}
            className={`border-l border-gray-300 first:border-l-0 p-2 min-h-32 flex flex-col ${
              isPast ? "opacity-50" : ""
            }`}
          >
            <button
              type="button"
              disabled={isPast}
              onClick={() => onSelectDay(dateStr)}
              className="text-sm font-semibold mb-2 text-left hover:text-[#1F5C73] disabled:hover:text-inherit"
            >
              {dayNames[i]} {day.getDate()}
            </button>

            {daySlots.map((b) => (
              <div
                key={b.id}
                className={`relative text-xs rounded p-1 pr-5 mb-1 ${
                  b.user
                    ? "bg-[#1F5C73] text-white"
                    : "bg-gray-100 dark:bg-white/10"
                }`}
              >
                {b.time}
                <br />
                {b.user ?? "Ledig"}

                {!b.user && !isPast && (
                  <button
                    type="button"
                    onClick={() => onDeleteSlot(b)}
                    aria-label={`Ta bort tiden ${b.time}`}
                    title="Ta bort tiden"
                    className="absolute top-0.5 right-1 text-gray-400 hover:text-red-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            {daySlots.length === 0 && isPast && (
              <p className="text-xs text-gray-400">Inga tider</p>
            )}

            {!isPast && (
              <button
                type="button"
                onClick={() => onSelectDay(dateStr)}
                className="mt-auto text-xs text-[#1F5C73] text-left hover:underline dark:text-[#C7CED1]"
              >
                + Skapa tid
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
export default WeekView;
