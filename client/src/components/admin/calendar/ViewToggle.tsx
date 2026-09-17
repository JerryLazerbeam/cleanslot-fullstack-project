import type { CalendarView } from "./calendarTypes";

type Props = {
  view: CalendarView;
  onChange: (view: CalendarView) => void;
};

const options: { label: string; value: CalendarView }[] = [
  { label: "Dag", value: "day" },
  { label: "Vecka", value: "week" },
  { label: "Månad", value: "month" },
];

function ViewToggle({ view, onChange }: Props) {
  return (
    <div className="flex border border-gray-300 rounded-lg overflow-hidden">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-2 ${
            view === opt.value
              ? "bg-[#1F5C73] text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default ViewToggle;