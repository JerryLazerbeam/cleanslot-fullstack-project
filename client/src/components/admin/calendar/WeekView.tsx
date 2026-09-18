import type { Booking } from "./calendarTypes";

type Props = {
  weekStart: Date; // måndag i vald vecka
  bookings: Booking[];
};

const dayNames = ["Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"];

function WeekView({ weekStart, bookings }: Props) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  return (
    <div className="grid grid-cols-7 border border-gray-300 min-w-[700px]">
      {days.map((day, i) => {
        const dateStr = day.toISOString().slice(0, 10);
        const dayBookings = bookings.filter((b) => b.date === dateStr);

        return (
          <div key={dateStr} className="border-l border-gray-300 first:border-l-0 p-2">
            <p className="text-sm font-semibold mb-2">
              {dayNames[i]} {day.getDate()}
            </p>
            {dayBookings.length === 0 ? (
              <p className="text-xs text-gray-400">Ledigt</p>
            ) : (
              dayBookings.map((b) => (
                <div key={b.id} className="text-xs bg-gray-100 rounded p-1 mb-1">
                  {b.time} – {b.user}
                </div>
              ))
            )}
          </div>
        );
      })}
    </div>
  );
}
export default WeekView;