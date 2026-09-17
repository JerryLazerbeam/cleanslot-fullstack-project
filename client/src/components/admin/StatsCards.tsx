import type { AdminStat } from "./adminTypes";
import { useNavigate } from "react-router-dom";

type Props = {
  stats: AdminStat[];
};

function StatsCards({ stats }: Props) {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-around mx-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          onClick={() => navigate(stat.route)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") navigate(stat.route);
          }}
          className="flex flex-col border rounded-lg border-gray-300 drop-shadow-sm px-5 cursor-pointer bg-white hover:bg-gray-100"
        >
          <h1 className="py-5">{stat.value}</h1>
          <p className="py-5">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
export default StatsCards;
