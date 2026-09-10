import StatsCards from "./StatsCards";
import UpcomingBookings from "./UpcomingBookings";
import ReportsSummary from "./ReportsSummary";
import QuickActions from "./QuickActions";
import type {
  AdminStat,
  UpcomingBooking,
  ReportSummaryItem,
  QuickAction,
} from "./adminTypes";

function DashboardContent() {
  // Mockdata – ersätts senare med useState + anrop till adminService
  const stats: AdminStat[] = [
    { label: "Bokningar", value: 12 },
    { label: "Ledigt", value: 8 },
    { label: "Användare", value: 2 },
  ];

  const upcomingBookings: UpcomingBooking[] = [
    { id: 1, date: "10/09", time: "10:00–13:00", user: "Anna" },
    { id: 2, date: "10/09", time: "13:00–16:00", user: "Erik" },
  ];

  const reports: ReportSummaryItem[] = [
    { id: 1, machine: "Tvättmaskin 2", status: "Ny" },
    { id: 2, machine: "Tvättmaskin 4", status: "Pågående" },
  ];

  const quickActions: QuickAction[] = [
    { label: "Bokningar", onClick: () => console.log("Bokningar") },
    { label: "Användare", onClick: () => console.log("Användare") },
    { label: "Blockera", onClick: () => console.log("Blockera") },
    { label: "Maskiner", onClick: () => console.log("Maskiner") },
  ];

  return (
    <div>
      <main className="flex flex-col">
        <div className="border-b border-gray-300">
          <h1 className="text-2xl font-bold m-8">Dashboard ✨</h1>
        </div>

        <StatsCards stats={stats} />

        <UpcomingBookings bookings={upcomingBookings} />

        <ReportsSummary
          reports={reports}
          onManage={() => console.log("Hantera felanmälningar")}
        />

        <QuickActions actions={quickActions} />
      </main>
    </div>
  );
}

export default DashboardContent;