interface ReminderModalProps {
  reminders: number[];
  onToggleReminder: (minutes: number) => void;
  onClose: () => void;
}

export default function ReminderModal({
  reminders,
  onToggleReminder,
  onClose,
}: ReminderModalProps) {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 text-[#16242C] shadow-2xl dark:bg-[#16242C] dark:text-[#C7CED1]">
        <div className="mb-5">
          <h2 className="text-2xl font-semibold">Påminn mig</h2>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Välj när du vill bli notifierad innan din bokade tvättid börjar.
          </p>
        </div>

        <div className="space-y-3">
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 hover:border-[#1F5C73] dark:border-gray-700">
            <input
              type="checkbox"
              checked={reminders.includes(1440)}
              onChange={() => onToggleReminder(1440)}
              className="h-4 w-4 accent-[#1F5C73]"
            />

            <span>1 dag innan</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 hover:border-[#1F5C73] dark:border-gray-700">
            <input
              type="checkbox"
              checked={reminders.includes(60)}
              onChange={() => onToggleReminder(60)}
              className="h-4 w-4 accent-[#1F5C73]"
            />

            <span>1 timme innan</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 hover:border-[#1F5C73] dark:border-gray-700">
            <input
              type="checkbox"
              checked={reminders.includes(30)}
              onChange={() => onToggleReminder(30)}
              className="h-4 w-4 accent-[#1F5C73]"
            />

            <span>30 minuter innan</span>
          </label>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-sm border border-gray-300 px-4 py-2 hover:border-[#1F5C73] dark:border-gray-700"
          >
            Avbryt
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-sm bg-[#1F5C73] px-4 py-2 text-white transition-colors hover:bg-[#17485A]"
          >
            Spara
          </button>
        </div>
      </div>
    </div>
  );
}
