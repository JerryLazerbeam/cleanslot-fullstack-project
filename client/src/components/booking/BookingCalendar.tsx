import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CalendarGrid from "./CalendarGrid";
import TimeSlots from "./TimeSlots";
import BookingLegend from "./BookingLegend";
export const MONTH_NAMES = [
  "Januari",
  "Februari",
  "Mars",
  "April",
  "Maj",
  "Juni",
  "Juli",
  "Augusti",
  "September",
  "Oktober",
  "November",
  "December",
] as const;

export interface Slot {
  id: string;
  label: string;
}

export const SLOT_TEMPLATE: Slot[] = [
  { id: "s1", label: "07:00–10:00" },
  { id: "s2", label: "10:00–13:00" },
  { id: "s3", label: "13:00–16:00" },
  { id: "s4", label: "16:00–19:00" },
  { id: "s5", label: "19:00–22:00" },
];

export type BookingOwner = "mig" | "annan";
export type DayBookings = Record<string, BookingOwner>;
export type BookingsByDate = Record<string, DayBookings>;
export type Availability = "open" | "partial" | "full";

export function dateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(d.getDate()).padStart(2, "0")}`;
}

function seedBookings(): BookingsByDate {
  const bookings: BookingsByDate = {};
  const today = new Date();

  const patterns: [number, string][] = [
    [1, "s2"],
    [1, "s4"],
    [3, "s1"],
    [4, "s3"],
    [4, "s5"],
    [6, "s2"],
    [8, "s1"],
    [8, "s2"],
    [8, "s3"],
  ];

  patterns.forEach(([offset, slot]) => {
    const d = new Date(today);
    d.setDate(d.getDate() + offset);

    const key = dateKey(d);

    if (!bookings[key]) {
      bookings[key] = {};
    }

    bookings[key][slot] = "annan";
  });

  return bookings;
}

export default function BookingCalendar() {
  const [viewDate, setViewDate] = useState<Date>(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const [selected, setSelected] = useState<Date>(() => new Date());

  const [bookings, setBookings] = useState<BookingsByDate>(seedBookings);

  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const days = useMemo<(Date | null)[]>(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const firstOfMonth = new Date(year, month, 1);

    const startOffset = (firstOfMonth.getDay() + 6) % 7;

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: (Date | null)[] = [];

    for (let i = 0; i < startOffset; i++) {
      cells.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(year, month, d));
    }

    while (cells.length % 7 !== 0) {
      cells.push(null);
    }

    return cells;
  }, [viewDate]);

  const selectedKey = dateKey(selected);

  const selectedBookings = bookings[selectedKey] || {};

  const isPast = (d: Date | null): boolean => !!d && d < today;

  function changeMonth(delta: number) {
    setViewDate((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + delta);
      return d;
    });
  }

  function toggleSlot(slotId: string) {
    if (isPast(selected)) return;

    setBookings((prev) => {
      const dayBookings: DayBookings = {
        ...(prev[selectedKey] || {}),
      };

      const current = dayBookings[slotId];

      if (current === "mig") {
        delete dayBookings[slotId];
      } else if (!current) {
        dayBookings[slotId] = "mig";
      } else {
        return prev;
      }

      return {
        ...prev,
        [selectedKey]: dayBookings,
      };
    });
  }

  function availabilityForDay(d: Date | null): Availability | null {
    if (!d) return null;

    const key = dateKey(d);
    const dayBookings = bookings[key] || {};

    const bookedCount = Object.keys(dayBookings).length;

    if (bookedCount === 0) return "open";

    if (bookedCount >= SLOT_TEMPLATE.length) {
      return "full";
    }

    return "partial";
  }

  return (
    <div className="w-full max-w-4xl bg-white-100 border border-[#D8DEE2]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');

        .font-display {
          font-family: 'Space Grotesk', sans-serif;
        }

        .font-body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between px-6 sm:px-8 py-6 border-b border-[#D8DEE2]">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl text-[#16242C] font-semibold tracking-tight">
            Tvättstugan
          </h1>

          <p className="font-body text-sm text-[#5A6B73] mt-1">
            Välj en dag för att se lediga tider
          </p>
        </div>

        <div className="flex items-center gap-1 font-body">
          <button
            onClick={() => changeMonth(-1)}
            aria-label="Föregående månad"
            className="w-9 h-9 flex items-center justify-center border border-[#D8DEE2] text-[#16242C] hover:bg-[#1F5C73]"
          >
            <ChevronLeft size={18} />
          </button>

          <span className="w-36 sm:w-40 text-center text-sm font-medium text-[#16242C]">
            {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
          </span>

          <button
            onClick={() => changeMonth(1)}
            aria-label="Nästa månad"
            className="w-9 h-9 flex items-center justify-center border border-[#D8DEE2] text-[#16242C] hover:bg-[#1F5C73]"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Calendar */}
        <div className="p-4 sm:p-8 md:flex-1 border-b md:border-b-0 md:border-r border-[#D8DEE2]">
          <CalendarGrid
            days={days}
            selected={selected}
            today={today}
            onSelect={setSelected}
            isPast={isPast}
            availabilityForDay={availabilityForDay}
          />

          <BookingLegend />
        </div>

        {/* Time slots */}
        <div className="md:w-80">
          <TimeSlots
            selected={selected}
            selectedBookings={selectedBookings}
            isPast={isPast(selected)}
            onToggleSlot={toggleSlot}
          />
        </div>
      </div>
    </div>
  );
}
