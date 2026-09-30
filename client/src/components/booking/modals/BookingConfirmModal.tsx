import { Bell } from "lucide-react";

interface BookingConfirmModalProps {
  selected: Date;
  selectedTime: string;
  onClose: () => void;
  onConfirm: () => void;
  onOpenReminder: () => void;
}

export default function BookingConfirmModal({
  selected,
  selectedTime,
  onClose,
  onConfirm,
  onOpenReminder,
}: BookingConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 text-[#16242C] shadow-2xl dark:bg-[#16242C] dark:text-[#C7CED1]">
        <h2 className="text-2xl font-semibold">Bekräfta bokning</h2>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Kontrollera din valda tvättid innan du bokar.
        </p>

        <div className="mt-6 rounded-lg border border-gray-200 bg-[#f8f9fb] p-4 dark:border-gray-700 dark:bg-[#111C22]">
          <div className="flex items-start justify-between">
            <div>
              <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                Din valda tvättid
              </p>

              <h3 className="text-lg font-semibold">
                {selected.toLocaleDateString("sv-SE", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </h3>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {selectedTime}
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenReminder}
              aria-label="Ställ in påminnelse"
              title="Ställ in påminnelse"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#1F5C73] transition-colors hover:border-[#1F5C73] hover:bg-[#1F5C73] hover:text-white dark:border-[#1F5C73]"
            >
              <Bell size={19} />
            </button>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-sm border border-red-500 px-4 py-2 text-sm text-red-500 transition-colors hover:bg-red-500 hover:text-white"
          >
            Avboka
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-sm bg-[#1F5C73] px-4 py-2 text-white transition-colors hover:bg-[#17485A]"
          >
            Godkänn
          </button>
        </div>
      </div>
    </div>
  );
}
