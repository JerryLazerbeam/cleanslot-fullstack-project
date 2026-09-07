export default function BookingLegend() {
  return (
    <div className="flex items-center gap-4 mt-6 font-body text-xs text-[#5A6B73]">
      <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#3FA796]" />
        Lediga tider
      </span>

      <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#E8A33D]" />
        Delvis bokad
      </span>

      <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C7CED1]" />
        Fullbokad
      </span>
    </div>
  );
}
