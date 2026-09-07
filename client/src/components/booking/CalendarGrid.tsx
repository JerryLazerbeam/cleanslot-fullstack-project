import { dateKey } from "./BookingCalendar";
import type { Availability } from "./BookingCalendar";

const WEEKDAYS = ["MÅN", "TIS", "ONS", "TOR", "FRE", "LÖR", "SÖN"] as const;

interface CalendarGridProps {
  days: (Date | null)[];
  selected: Date;
  today: Date;
  onSelect: (date: Date) => void;
  isPast: (date: Date | null) => boolean;
  availabilityForDay: (date: Date | null) => Availability | null;
}

export default function CalendarGrid({
  days,
  selected,
  today,
  onSelect,
  isPast,
  availabilityForDay,
}: CalendarGridProps) {
  const selectedKey = dateKey(selected);

  return (
    <>
      {/* Weekdays */}
      <div className="grid grid-cols-7 font-body text-xs text-[#5A6B73] mb-2">
        {WEEKDAYS.map((weekday) => (
          <div key={weekday} className="text-center py-1">
            {weekday}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (!day) {
            return <div key={index} className="aspect-square" />;
          }

          const key = dateKey(day);

          const isSelected = key === selectedKey;

          const isToday = day.getTime() === today.getTime();

          const past = isPast(day);

          const availability = availabilityForDay(day);

          return (
            <button
              key={index}
              onClick={() => onSelect(day)}
              disabled={past}
              className={[
                "aspect-square relative flex flex-col items-center justify-center font-body text-sm transition-colors",
                past
                  ? "text-[#C7CED1] cursor-not-allowed"
                  : "text-[#16242C] hover:bg-[#EEF3F6] cursor-pointer",

                isSelected ? "bg-[#1F5C73] text-white hover:bg-[#1F5C73]" : "",

                isToday && !isSelected ? "font-semibold" : "",
              ].join(" ")}
            >
              <span>{day.getDate()}</span>

              {!past && availability && (
                <span
                  className={[
                    "absolute bottom-1.5 w-1.5 h-1.5 rounded-full",

                    availability === "full"
                      ? isSelected
                        ? "bg-white/50"
                        : "bg-[#C7CED1]"
                      : availability === "partial"
                        ? isSelected
                          ? "bg-white"
                          : "bg-[#E8A33D]"
                        : isSelected
                          ? "bg-white"
                          : "bg-[#3FA796]",
                  ].join(" ")}
                />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}
