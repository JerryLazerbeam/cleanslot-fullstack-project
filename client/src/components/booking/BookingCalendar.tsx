import { useMemo, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CalendarGrid from "./CalendarGrid";
import TimeSlots from "./TimeSlots";
import BookingLegend from "./BookingLegend";
import { getSlots, bookSlot, getBookings } from "../../services/bookingService";
import { getProfile } from "../../services/userService";

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
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

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

  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const [selected, setSelected] = useState<Date>(() => new Date());

  const [bookings, setBookings] = useState<BookingsByDate>({});

  const [backendSlots, setBackendSlots] = useState<Slot[]>([]);

  const [backendBookings, setBackendBookings] = useState<
    {
      booking_id: number;
      user_id: number;
      slot_id: number;
      date: string;
      start_time: string;
      end_time: string;
    }[]
  >([]);

  useEffect(() => {
    getProfile()
      .then((data) => {
        setCurrentUserId(data.userId);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (!currentUserId) return;

    getBookings()
      .then((data) => {
        const backendBookings: BookingsByDate = {};

        data.forEach(
          (booking: {
            booking_id: number;
            user_id: number;
            slot_id: number;
            date: string;
            start_time: string;
            end_time: string;
          }) => {
            if (!backendBookings[booking.date]) {
              backendBookings[booking.date] = {};
            }

            const slotId = `s${booking.slot_id}`;

            backendBookings[booking.date][slotId] =
              booking.user_id === currentUserId ? "mig" : "annan";
          },
        );

        console.log("Omvandlade bokningar:", backendBookings);

        setBookings(backendBookings);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentUserId]);

  useEffect(() => {
    getBookings()
      .then((data) => {
        console.log("Bokningar från backend:", data);
        setBackendBookings(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const convertedBookings: BookingsByDate = {};

    backendBookings.forEach((booking) => {
      if (!convertedBookings[booking.date]) {
        convertedBookings[booking.date] = {};
      }

      convertedBookings[booking.date][`s${booking.slot_id}`] = "annan";
    });

    setBookings(convertedBookings);
  }, [backendBookings]);

  const [myBooking, setMyBooking] = useState<{
    date: string;
    slotId: string;
  } | null>(null);

  useEffect(() => {
    getSlots()
      .then((data) => {
        const slots: Slot[] = data.map(
          (slot: {
            slot_id: number;
            date: string;
            start_time: string;
            end_time: string;
          }) => ({
            id: slot.slot_id,
            date: slot.date,
            startTime: slot.start_time,
            endTime: slot.end_time,
          }),
        );

        console.log("Slots från backend:", slots);
        setBackendSlots(slots);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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

  const selectedSlots = backendSlots.filter(
    (slot) => slot.date === selectedKey,
  );

  const isPast = (d: Date | null): boolean => !!d && d < today;

  function changeMonth(delta: number) {
    setViewDate((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + delta);
      return d;
    });
  }

  function toggleSlot(slotId: number) {
    if (isPast(selected)) return;

    setBookings((prev) => {
      const dayBookings: DayBookings = {
        ...(prev[selectedKey] || {}),
      };

      const current = dayBookings[slotId];

      // Om man klickar på sin redan valda tid → avmarkera den
      if (current === "mig") {
        delete dayBookings[slotId];
      } else if (!current) {
        // Ta bort eventuell tidigare vald tid
        Object.keys(dayBookings).forEach((id) => {
          if (dayBookings[id] === "mig") {
            delete dayBookings[id];
          }
        });

        // Markera den nya tiden
        dayBookings[slotId] = "mig";
      } else {
        // Tiden är redan bokad av någon annan
        return prev;
      }

      return {
        ...prev,
        [selectedKey]: dayBookings,
      };
    });
  }
  async function handleBooking() {
    const dayBookings = bookings[selectedKey] || {};

    const mySlot = Object.keys(dayBookings).find(
      (slotId) => dayBookings[slotId] === "mig",
    );

    if (!mySlot) {
      alert("Välj en tid först.");
      return;
    }

    try {
      await bookSlot(Number(mySlot.replace("s", "")));

      setMyBooking({
        date: selectedKey,
        slotId: mySlot,
      });
      const updatedBookings = await getBookings();
      setBackendBookings(updatedBookings);

      alert("Tvättiden är bokad!");
    } catch (error) {
      console.error(error);
      alert("Kunde inte boka tvättiden.");
    }
  }

  function availabilityForDay(d: Date | null): Availability | null {
    if (!d) return null;

    const key = dateKey(d);
    const dayBookings = bookings[key] || {};

    const bookedCount = Object.keys(dayBookings).length;

    if (bookedCount === 0) return "open";

    if (bookedCount >= backendSlots.length) {
      return "full";
    }

    return "partial";
  }

  return (
    <>
      <div className="w-full max-w-4xl bg-white-100 border border-[#1F5C73]">
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
        <div className="flex items-center justify-between px-6 sm:px-8 py-6 border-b border-[#1F5C73]">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl text-[#16242C] font-semibold tracking-tight dark:text-[#C7CED1]">
              Tvättstugan
            </h1>

            <p className="font-body text-sm text-[#5A6B73] mt-1 dark:text-[#C7CED1]">
              Välj en dag för att se lediga tider
            </p>
          </div>

          <div className="flex items-center gap-1 font-body">
            <button
              onClick={() => changeMonth(-1)}
              aria-label="Föregående månad"
              className="w-9 h-9 flex items-center justify-center border border-[#D8DEE2] text-[#16242C] hover:text-white hover:bg-[#1F5C73] dark:border-[#5A6B73] dark:text-[#C7CED1] dark:hover:bg-[#1F5C73] transition-colors "
            >
              <ChevronLeft size={18} />
            </button>

            <span className="w-36 sm:w-40 text-center text-sm font-medium text-[#16242C] dark:text-[#C7CED1]">
              {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
            </span>

            <button
              onClick={() => changeMonth(1)}
              aria-label="Nästa månad"
              className="w-9 h-9 flex items-center justify-center border border-[#D8DEE2] text-[#16242C] hover:text-white hover:bg-[#1F5C73] dark:border-[#5A6B73] dark:text-[#C7CED1] dark:hover:bg-[#1F5C73] transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Calendar */}
          <div className="p-4 sm:p-8 md:flex-1 border-b md:border-b-0 md:border-r border-[#1F5C73]">
            <CalendarGrid
              days={days}
              selected={selected}
              today={today}
              onSelect={setSelected}
              isPast={isPast}
              availabilityForDay={availabilityForDay}
            />

            <BookingLegend />
            {myBooking && (
              <div className="mt-6 border border-[#1F5C73] p-4 font-body">
                <p className="text-xs text-[#5A6B73] mb-1 dark:text-[#C7CED1]">
                  Din bokade tvättid
                </p>

                <h2 className="font-display text-lg font-semibold text-[#16242C] dark:text-[#C7CED1]">
                  {new Date(myBooking.date).toLocaleDateString("sv-SE", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </h2>

                <p className="text-sm text-[#5A6B73] mt-1 dark:text-[#C7CED1]">
                  {
                    SLOT_TEMPLATE.find((slot) => slot.id === myBooking.slotId)
                      ?.label
                  }
                </p>

                <button
                  onClick={() => {
                    // Ta bort bokningen
                    setBookings((prev) => {
                      const updatedDay = { ...(prev[myBooking.date] || {}) };

                      delete updatedDay[myBooking.slotId];

                      return {
                        ...prev,
                        [myBooking.date]: updatedDay,
                      };
                    });

                    // Ta bort informationen om min bokning
                    setMyBooking(null);
                  }}
                  className="mt-4 border border-red-500 px-4 py-2 text-sm text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                >
                  Avboka
                </button>
              </div>
            )}
          </div>

          {/* Time slots */}
          <div className="md:w-80">
            <TimeSlots
              selected={selected}
              selectedBookings={selectedBookings}
              isPast={isPast(selected)}
              onToggleSlot={toggleSlot}
              onBook={handleBooking}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Calendar */}
        <div className="p-4 sm:p-8 md:flex-1 border-b md:border-b-0 md:border-r border-[#1F5C73]">
          <CalendarGrid
            days={days}
            selected={selected}
            today={today}
            onSelect={setSelected}
            isPast={isPast}
            availabilityForDay={availabilityForDay}
          />

          <BookingLegend />
          {myBooking && (
            <div className="mt-6 border border-[#1F5C73] p-4 font-body">
              <p className="text-xs text-[#5A6B73] mb-1 dark:text-[#C7CED1]">
                Din bokade tvättid
              </p>

              <h2 className="font-display text-lg font-semibold text-[#16242C] dark:text-[#C7CED1]">
                {new Date(myBooking.date).toLocaleDateString("sv-SE", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </h2>

              <p className="text-sm text-[#5A6B73] mt-1 dark:text-[#C7CED1]">
                {(() => {
                  const slot = backendSlots.find(
                    (slot) => String(slot.id) === myBooking.slotId,
                  );

                  return slot ? `${slot.startTime}–${slot.endTime}` : "";
                })()}
              </p>

              <button
                onClick={() => {
                  // Ta bort bokningen
                  setBookings((prev) => {
                    const updatedDay = { ...(prev[myBooking.date] || {}) };

                    delete updatedDay[myBooking.slotId];

                    return {
                      ...prev,
                      [myBooking.date]: updatedDay,
                    };
                  });

                  // Ta bort informationen om min bokning
                  setMyBooking(null);
                }}
                className="mt-4 border border-red-500 px-4 py-2 text-sm text-red-500 hover:bg-red-500 hover:text-white transition-colors"
              >
                Avboka
              </button>
            </div>

        {/* Time slots */}
        <div className="md:w-80">
          <TimeSlots
            selected={selected}
            selectedBookings={selectedBookings}
            isPast={isPast(selected)}
            onToggleSlot={toggleSlot}
            onBook={handleBooking}
            slots={selectedSlots}
          />
        </div>
      )}
    </>
  );
}
