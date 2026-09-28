import { TIME_SLOTS, toDateStr, type Booking } from "./calendarTypes";

type Props = {
  date: Date;
  bookings: Booking[];
  onAddSlot: (date: string, start: string) => void;
  onDeleteSlot: (slot: Booking) => void;
};

function DayView({ date, bookings, onAddSlot, onDeleteSlot }: Props) {
  const dateStr = toDateStr(date);
  const isPast = dateStr < toDateStr(new Date());
  const daySlots = bookings.filter((b) => b.date === dateStr);

  return (
    <div className="border border-gray-300 divide-y divide-gray-200">
      {TIME_SLOTS.map((t) => {
        const slot = daySlots.find((b) => b.time.startsWith(t.start));

        return (
          <div key={t.start} className="flex items-center px-3 py-3 text-sm">
            <span className="w-28 text-gray-400">
              {t.start}–{t.end}
            </span>

            {slot ? (
              <>
                <span
                  className={slot.user ? "font-semibold" : "text-gray-500"}
                >
                  {slot.user ? `Bokad av ${slot.user}` : "Ledig (kan bokas)"}
                </span>

                {!slot.user && !isPast && (
                  <button
                    type="button"
                    onClick={() => onDeleteSlot(slot)}
                    className="ml-auto text-red-600 hover:underline"
                  >
                    Ta bort
                  </button>
                )}
              </>
            ) : isPast ? (
              <span className="text-gray-300">–</span>
            ) : (
              <button
                type="button"
                onClick={() => onAddSlot(dateStr, t.start)}
                className="text-[#1F5C73] hover:underline"
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
export default DayView;
