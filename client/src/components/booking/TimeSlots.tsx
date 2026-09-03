import { Check, X } from "lucide-react";
import { MONTH_NAMES, SLOT_TEMPLATE } from "./BookingCalendar";

import type { DayBookings } from "./BookingCalendar";

interface TimeSlotsProps {
  selected: Date;
  selectedBookings: DayBookings;
  isPast: boolean;
  onToggleSlot: (slotId: string) => void;
}

export default function TimeSlots({
  selected,
  selectedBookings,
  isPast,
  onToggleSlot,
}: TimeSlotsProps) {
  return (
    <div className="p-4 sm:p-8 font-body">
      <p className="text-xs text-[#5A6B73] mb-1">
        {selected.toLocaleDateString("sv-SE", { weekday: "long" })}
      </p>

      <h2 className="font-display text-lg text-[#16242C] font-semibold mb-5">
        {selected.getDate()} {MONTH_NAMES[selected.getMonth()]}
      </h2>

      {isPast ? (
        <p className="text-sm text-[#5A6B73]">
          Det går inte att boka en tid som redan passerat.
        </p>
      ) : (
        <ul className="space-y-2">
          {SLOT_TEMPLATE.map((slot) => {
            const status = selectedBookings[slot.id];

            const isMine = status === "mig";

            const isTaken = status === "annan";

            return (
              <li key={slot.id}>
                <button
                  onClick={() => onToggleSlot(slot.id)}
                  disabled={isTaken}
                  className={[
                    "w-full flex items-center justify-between px-3 py-2.5 border text-sm transition-colors",

                    isTaken
                      ? "border-[#D8DEE2] bg-[#F4F6F7] text-[#B3BCC2] cursor-not-allowed"
                      : isMine
                        ? "border-[#1F5C73] bg-[#1F5C73] text-white"
                        : "border-[#D8DEE2] text-[#16242C] hover:border-[#1F5C73]",
                  ].join(" ")}
                >
                  <span>{slot.label}</span>

                  {isMine && <Check size={16} />}

                  {isTaken && <X size={16} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <p className="text-xs text-[#5A6B73] mt-5 leading-relaxed">
        Klicka på en ledig tid för att boka den. Klicka igen på din egen bokning
        för att avboka.
      </p>
    </div>
  );
}
