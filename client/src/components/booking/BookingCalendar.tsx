import { useMemo, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Bell } from "lucide-react";
import CalendarGrid from "./CalendarGrid";
import TimeSlots from "./TimeSlots";
import BookingLegend from "./BookingLegend";
import ReminderModal from "./modals/ReminderModal";
import BookingConfirmModal from "./modals/BookingConfirmModal";
import {
  getSlots,
  bookSlot,
  getBookings,
  deleteBooking,
} from "../../services/bookingService";
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

  const [showRulesModal, setShowRulesModal] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const [showBookingConfirm, setShowBookingConfirm] = useState(false);

  const [showReminderModal, setShowReminderModal] = useState(false);

  const [reminders, setReminders] = useState<number[]>([]);

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
        console.log("Bokningar från backend:", data);

        setBackendBookings(data);

        const convertedBookings: BookingsByDate = {};

        data.forEach(
          (booking: {
            booking_id: number;
            user_id: number;
            slot_id: number;
            date: string;
            start_time: string;
            end_time: string;
          }) => {
            if (!convertedBookings[booking.date]) {
              convertedBookings[booking.date] = {};
            }

            const slotId = `s${booking.slot_id}`;

            convertedBookings[booking.date][slotId] =
              booking.user_id === currentUserId ? "mig" : "annan";

            if (booking.user_id === currentUserId) {
              setMyBooking({
                date: booking.date,
                slotId: slotId,
              });
            }
          },
        );

        setBookings(convertedBookings);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentUserId]);

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

  useEffect(() => {
    const hideRules = localStorage.getItem("hideRules");

    if (hideRules !== "true") {
      setShowRulesModal(true);
    }
  }, []);

  function handleAcceptRules() {
    if (dontShowAgain) {
      localStorage.setItem("hideRules", "true");
    }

    setShowRulesModal(false);
  }

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
    // Har användaren redan en bokad tvättid?
    // Då får ingen annan tid väljas.
    if (myBooking) {
      return;
    }

    if (isPast(selected)) return;

    const slotKey = `s${slotId}`;

    setBookings((prev) => {
      const dayBookings: DayBookings = {
        ...(prev[selectedKey] || {}),
      };

      const current = dayBookings[slotKey];

      // Klickar man på sin valda tid innan bokningen är bekräftad
      // så avmarkeras den.
      if (current === "mig") {
        delete dayBookings[slotKey];
      } else if (!current) {
        // Ta bort eventuell tidigare vald tid samma dag
        Object.keys(dayBookings).forEach((id) => {
          if (dayBookings[id] === "mig") {
            delete dayBookings[id];
          }
        });

        // Markera den nya tiden
        dayBookings[slotKey] = "mig";
      } else {
        // Tiden är bokad av någon annan
        return prev;
      }

      return {
        ...prev,
        [selectedKey]: dayBookings,
      };
    });
  }
  async function handleBooking() {
    if (myBooking) {
      alert("Du har redan en bokad tvättid. Avboka den innan du bokar en ny.");
      return;
    }

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
  function toggleReminder(minutes: number) {
    setReminders((prev) =>
      prev.includes(minutes)
        ? prev.filter((item) => item !== minutes)
        : [...prev, minutes],
    );
  }
  const selectedSlotId = Object.keys(selectedBookings).find(
    (slotId) => selectedBookings[slotId] === "mig",
  );

  const selectedSlot = selectedSlots.find(
    (slot) => `s${slot.id}` === selectedSlotId,
  );

  const selectedTime = selectedSlot
    ? `${selectedSlot.startTime}–${selectedSlot.endTime}`
    : "";
  return (
    <>
      <div className="w-full max-w-4xl rounded-xl border border-gray-200 bg-white text-[#16242C] shadow-lg dark:border-none dark:bg-[#16242C] dark:text-[#C7CED1] dark:shadow-none">
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-6 border-b border-gray-200 dark:border-[#1F5C73]">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
              Tvättstugan
            </h1>

            <p className="font-body text-sm text-gray-500 mt-1 dark:text-gray-400">
              Välj en dag för att se lediga tider
            </p>
          </div>

          <div className="flex items-center gap-1 font-body">
            <button
              onClick={() => changeMonth(-1)}
              aria-label="Föregående månad"
              className="w-9 h-9 flex items-center justify-center border border-gray-300 text-[#16242C] hover:text-white hover:bg-[#1F5C73] dark:border-gray-600 dark:text-[#C7CED1] dark:hover:bg-[#1F5C73] transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="w-36 sm:w-40 text-center text-sm font-medium">
              {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
            </span>

            <button
              onClick={() => changeMonth(1)}
              aria-label="Nästa månad"
              className="w-9 h-9 flex items-center justify-center border border-gray-300 text-[#16242C] hover:text-white hover:bg-[#1F5C73] dark:border-gray-600 dark:text-[#C7CED1] dark:hover:bg-[#1F5C73] transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Calendar */}
          <div className="p-4 sm:p-8 md:flex-1 border-b md:border-b-0 md:border-r border-gray-200 dark:border-[#1F5C73]">
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
              <div className="mt-6 rounded-lg border border-gray-200 bg-[#f8f9fb] p-4 font-body dark:border-gray-700 dark:bg-[#111C22]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                      Din bokade tvättid
                    </p>

                    <h2 className="font-display text-lg font-semibold">
                      {new Date(myBooking.date).toLocaleDateString("sv-SE", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowReminderModal(true)}
                    aria-label="Ställ in påminnelse"
                    title="Ställ in påminnelse"
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 text-[#1F5C73] transition-colors hover:border-[#1F5C73] hover:bg-[#1F5C73] hover:text-white dark:border-[#1F5C73]"
                  >
                    <Bell size={19} />
                  </button>
                </div>

                <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
                  {(() => {
                    const slot = backendSlots.find(
                      (slot) =>
                        String(slot.id) === myBooking.slotId.replace("s", ""),
                    );

                    return slot ? `${slot.startTime}–${slot.endTime}` : "";
                  })()}
                </p>

                <button
                  onClick={async () => {
                    console.log("AVBOKA KLICKAD");
                    const booking = backendBookings.find(
                      (booking) =>
                        booking.slot_id ===
                          Number(myBooking.slotId.replace("s", "")) &&
                        booking.user_id === currentUserId,
                    );
                    if (!booking) {
                      alert("Kunde inte hitta bokningen");
                      return;
                    }

                    await deleteBooking(booking.booking_id);

                    setBackendBookings((prev) =>
                      prev.filter(
                        (item) => item.booking_id !== booking.booking_id,
                      ),
                    );

                    setBookings((prev) => {
                      const updatedDay = {
                        ...(prev[myBooking.date] || {}),
                      };

                      delete updatedDay[myBooking.slotId];

                      return {
                        ...prev,
                        [myBooking.date]: updatedDay,
                      };
                    });

                    setMyBooking(null);
                  }}
                  className="mt-4 rounded-md border border-red-500 px-4 py-2 text-sm text-red-500 hover:bg-red-500 hover:text-white transition-colors"
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
              onBook={() => {
                setShowBookingConfirm(true);
              }}
              slots={selectedSlots}
              hasExistingBooking={myBooking !== null}
            />
          </div>
        </div>
      </div>

      {showRulesModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 text-[#16242C] shadow-2xl dark:bg-[#16242C] dark:text-[#C7CED1]">
            <h2 className="font-display text-2xl font-semibold">
              Förhållningsregler
            </h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Läs igenom reglerna innan du bokar tvättstugan.
            </p>

            <div className="mt-6 space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p>• Respektera din bokade tvättid.</p>
              <p>• Lämna tvättstugan ren och städad.</p>
              <p>• Ta bort tvätt och tillhörigheter när din tid är slut.</p>
              <p>
                • Om du inte längre kan nyttja din bokade tid, vänligen avboka
                den i god tid så att andra kan använda den.
              </p>
              <p>• Felanmäl maskiner som inte fungerar.</p>
            </div>

            <label className="mt-6 flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="h-4 w-4 accent-[#1F5C73]"
              />

              <span className="text-sm text-gray-700 dark:text-gray-300">
                Visa inte igen
              </span>
            </label>

            <button
              onClick={handleAcceptRules}
              className="mt-6 w-full rounded-md bg-[#1F5C73] px-6 py-3 text-white transition-colors hover:bg-[#17485A]"
            >
              Godkänn
            </button>
          </div>
        </div>
      )}
      {showBookingConfirm && (
        <BookingConfirmModal
          selected={selected}
          selectedTime={selectedTime}
          onClose={() => setShowBookingConfirm(false)}
          onOpenReminder={() => setShowReminderModal(true)}
          onConfirm={async () => {
            await handleBooking();
            setShowBookingConfirm(false);
          }}
        />
      )}
      {showReminderModal && (
        <ReminderModal
          reminders={reminders}
          onToggleReminder={toggleReminder}
          onClose={() => setShowReminderModal(false)}
        />
      )}
    </>
  );
}
