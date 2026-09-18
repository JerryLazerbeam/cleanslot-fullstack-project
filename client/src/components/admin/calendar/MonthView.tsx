import type { Booking } from "./calendarTypes";

type Props = {
  monthStart: Date; // första dagen i månaden
  bookings: Booking[];
  onSelectDay: (date: Date) => void;
};

function MonthView({ monthStart, bookings, onSelectDay }: Props) {
  const year = monthStart.getFullYear();
  const month = monthStart.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));

  return (
    <div className="grid grid-cols-7 gap-1 min-w-[420px]">
      {days.map((day) => {
        const dateStr = day.toISOString().slice(0, 10);
        const count = bookings.filter((b) => b.date === dateStr).length;

        return (
          <button
            key={dateStr}
            onClick={() => onSelectDay(day)}
            className="border border-gray-200 rounded p-2 text-left hover:bg-gray-100"
          >
            <p className="text-sm">{day.getDate()}</p>
            {count > 0 && <p className="text-xs text-gray-500">•{count}</p>}
          </button>
        );
      })}
    </div>
  );
}
export default MonthView;