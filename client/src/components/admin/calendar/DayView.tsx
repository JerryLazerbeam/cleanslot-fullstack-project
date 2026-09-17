import type { Booking } from "./calendarTypes";

type Props = {
  date: Date;
  bookings: Booking[];
};

const hours = Array.from({ length: 14 }, (_, i) => 8 + i); // 08–21

function DayView({ date, bookings }: Props) {
  const dateStr = date.toISOString().slice(0, 10);
  const dayBookings = bookings.filter((b) => b.date === dateStr);

  return (
    <div className="border border-gray-300 divide-y divide-gray-200">
      {hours.map((h) => {
        const booking = dayBookings.find((b) => b.time.startsWith(String(h)));
        return (
          <div key={h} className="flex px-3 py-2 text-sm">
            <span className="w-16 text-gray-400">{h}:00</span>
            <span>{booking ? booking.user : "Ledigt"}</span>
          </div>
        );
      })}
    </div>
  );
}
export default DayView;