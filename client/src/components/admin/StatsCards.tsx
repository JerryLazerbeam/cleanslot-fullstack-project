import type { AdminStat } from "./adminTypes";

type Props = {
  stats: AdminStat[];
};

function StatsCards({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 justify-around my-10 mx-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col border rounded-lg border-gray-300 px-5"
        >
          <h1 className="py-5">{stat.value}</h1>
          <p className="py-5">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
export default StatsCards;
