import { Check, X } from "lucide-react";
import { MONTH_NAMES } from "./BookingCalendar";

import type { DayBookings, Slot } from "./BookingCalendar";

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
        <ul className="space-y-2">
          {slots.map((slot) => {
            const status = selectedBookings[`s${slot.id}`];

            const isMine = status === "mig";
            const isTaken = status === "annan";

            const isDisabled = isTaken || hasExistingBooking;

            return (
              <li key={slot.id}>
                <button
                  onClick={() => onToggleSlot(slot.id)}
                  disabled={isDisabled}
                  className={[
                    "w-full flex items-center justify-between px-3 py-2.5 border text-sm transition-colors",

                    isTaken
                      ? "line-through border-[#D8DEE2] bg-[#ff000077] text-[#000000] dark:bg-[#ff00007c] dark:border-[#1F5C73] cursor-not-allowed"
                      : hasExistingBooking
                        ? "border-[#D8DEE2] bg-gray-100 text-gray-400 cursor-not-allowed opacity-60 dark:bg-[#111C22] dark:border-gray-700 dark:text-gray-500"
                        : isMine
                          ? "border-[#1F5C73] bg-[#1F5C73] text-white"
                          : "border-[#D8DEE2] text-[#16242C] hover:border-[#1F5C73] dark:text-[#C7CED1] dark:border-[#1F5C73] dark:hover:border-[#D8DEE2]",
                  ].join(" ")}
                >
                  <span>
                    {slot.startTime}–{slot.endTime}
                  </span>

                  {isMine && <Check size={16} />}

                  {isTaken && <X size={16} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {hasSelectedSlot && !hasExistingBooking && (
        <button
          onClick={onBook}
          className="rounded-md bg-[#1F5C73] px-6 py-2 text-white hover:bg-gray-700 shadow-xl mt-4"
        >
          Boka
        </button>
      )}
    </div>
  );
}
