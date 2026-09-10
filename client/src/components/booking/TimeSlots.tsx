import { Check, X, Bell, BellRing } from "lucide-react";
import { MONTH_NAMES } from "./BookingCalendar";

import type { DayBookings, Slot } from "./BookingCalendar";
import { useState } from "react";

interface TimeSlotsProps {
  selected: Date;
  selectedBookings: DayBookings;
  isPast: boolean;
  onToggleSlot: (slotId: number) => void;
  onBook: () => void;
  slots: Slot[];
  hasExistingBooking: boolean;
}

export default function TimeSlots({
  selected,
  selectedBookings,
  isPast,
  onToggleSlot,
  onBook,
  slots,
  hasExistingBooking,
}: TimeSlotsProps) {
  const [watchedSlots, setWatchedSlots] = useState<number[]>([]);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  function toggleWatch(slotId: number) {
    const isAlreadyWatched = watchedSlots.includes(slotId);

    setWatchedSlots((prev) =>
      isAlreadyWatched ? prev.filter((id) => id !== slotId) : [...prev, slotId],
    );

    if (!isAlreadyWatched) {
      setShowNotificationPopup(true);
    }
  }
  const hasSelectedSlot = Object.values(selectedBookings).includes("mig");

  return (
    <div className="p-4 sm:p-8 font-body">
      <p className="text-xs text-[#5A6B73] mb-1 dark:text-[#C7CED1]">
        {selected.toLocaleDateString("sv-SE", { weekday: "long" })}
      </p>

      <h2 className="font-display text-lg text-[#16242C] font-semibold mb-5 dark:text-[#C7CED1]">
        {selected.getDate()} {MONTH_NAMES[selected.getMonth()]}
      </h2>

      {hasExistingBooking && (
        <p className="mb-4 text-sm text-[#5A6B73] dark:text-[#C7CED1]">
          Du har redan en bokad tvättid. Avboka den innan du bokar en ny.
        </p>
      )}

      {isPast ? (
        <p className="text-sm text-[#5A6B73] dark:text-[#C7CED1]">
          Det går inte att boka en tid som redan passerat.
        </p>
      ) : (
        <ul className="space-y-2 ">
          {slots.map((slot) => {
            const status = selectedBookings[`s${slot.id}`];

            const isMine = status === "mig";
            const isTaken = status === "annan";
            const isWatched = watchedSlots.includes(slot.id);

            const isDisabled = isTaken || hasExistingBooking;

            return (
              <li key={slot.id} className="flex items-center gap-2">
                <button
                  onClick={() => onToggleSlot(slot.id)}
                  disabled={isDisabled}
                  className={[
                    "flex flex-1 items-center justify-between border px-3 py-2.5 text-sm transition-colors",

                    isTaken
                      ? "line-through border-[#D8DEE2] bg-[#ff000077] text-black cursor-not-allowed dark:bg-[#ff00007c] dark:border-[#1F5C73]"
                      : hasExistingBooking
                        ? "border-[#D8DEE2] bg-gray-100 text-gray-400 cursor-not-allowed opacity-60 dark:bg-[#111C22] dark:border-gray-700 "
                        : isMine
                          ? "border-[#1F5C73] bg-[#1F5C73] text-white "
                          : "border-[#D8DEE2] text-[#16242C] hover:border-[#1F5C73] dark:text-[#C7CED1] dark:border-[#1F5C73] hover:bg-[#17485A] hover:text-white",
                  ].join(" ")}
                >
                  <span>
                    {slot.startTime}–{slot.endTime}
                  </span>

                  {isMine && <Check size={16} />}
                  {isTaken && <X size={16} />}
                </button>

                {isTaken && (
                  <button
                    type="button"
                    onClick={() => toggleWatch(slot.id)}
                    aria-label={
                      isWatched
                        ? "Sluta bevaka tvättiden"
                        : "Meddela mig om tvättiden blir ledig"
                    }
                    title={
                      isWatched
                        ? "Du bevakar denna tid"
                        : "Meddela mig om tiden blir ledig"
                    }
                    className={[
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border transition-colors",

                      isWatched
                        ? "border-[#1F5C73] bg-[#1F5C73] text-white"
                        : "border-gray-300 bg-white text-[#5A6B73] hover:border-[#1F5C73] hover:text-[#1F5C73] dark:border-[#1F5C73] dark:bg-[#16242C] dark:text-[#C7CED1]",
                    ].join(" ")}
                  >
                    {isWatched ? <BellRing size={18} /> : <Bell size={18} />}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {hasSelectedSlot && !hasExistingBooking && (
        <button
          onClick={onBook}
          className="rounded-sm bg-[#1F5C73] px-6 py-2 text-white hover:bg-[#17485A] shadow-xl mt-4"
        >
          Boka
        </button>
      )}

      {showNotificationPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-xl dark:bg-[#16242C] dark:text-[#C7CED1]">
            <BellRing size={32} className="mx-auto mb-4 text-[#1F5C73]" />

            <h2 className="text-lg font-semibold">Bevakning aktiverad</h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Du blir meddelad om tiden blir tillgänglig.
            </p>

            <button
              type="button"
              onClick={() => setShowNotificationPopup(false)}
              className="mt-6 rounded-sm bg-[#1F5C73] px-6 py-2 text-white hover:bg-[#17485A]"
            >
              Okej
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
