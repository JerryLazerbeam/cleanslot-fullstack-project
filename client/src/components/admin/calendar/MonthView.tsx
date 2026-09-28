import { toDateStr, type Booking } from "./calendarTypes";

type Props = {
  monthStart: Date; 
  bookings: Booking[];
  onSelectDay: (date: Date) => void;
};

function MonthView({ monthStart, bookings, onSelectDay }: Props) {
  const year = monthStart.getFullYear();
  const month = monthStart.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = Array.from(
    { length: daysInMonth },
    (_, i) => new Date(year, month, i + 1),
  );

  return (
    <div className="grid grid-cols-7 gap-1 min-w-420px">
      {days.map((day) => {
        const dateStr = toDateStr(day);
        const daySlots = bookings.filter((b) => b.date === dateStr);
        const booked = daySlots.filter((b) => b.user).length;

        return (
          <button
            key={dateStr}
            onClick={() => onSelectDay(day)}
            className="border border-gray-200 rounded p-2 text-left hover:bg-gray-100 dark:hover:bg-white/10"
          >
            <p className="text-sm">{day.getDate()}</p>
            {daySlots.length > 0 && (
              <p className="text-xs text-gray-500">
                {booked}/{daySlots.length} bokade
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}
export default MonthView;
