import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatsCards from "./StatsCards";
import UpcomingBookings from "./UpcomingBookings";
import ReportsSummary from "./ReportsSummary";
import type { AdminStat, UpcomingBooking, Report } from "./adminTypes";
import { getReports } from "../../services/reportService";

function DashboardContent() {
  const navigate = useNavigate();

  const stats: AdminStat[] = [
    { label: "Bokningar", value: 12, route: "/admin/bookings" },
    { label: "Ledigt", value: 8, route: "/admin/bookings?view=ledigt" },
    { label: "Användare", value: 2, route: "/admin/users" },
  ];

  const upcomingBookings: UpcomingBooking[] = [
    { id: 1, date: "10/09", time: "10:00–13:00", user: "Anna" },
    { id: 2, date: "10/09", time: "13:00–16:00", user: "Erik" },
  ];

  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    getReports()
      .then((data) => setReports(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <main className="flex flex-col ">
        <div className="">
          <h1 className="text-4xl font-bold ml-4 mt-8 mb-5 drop-shadow-xl">Dashboard ✨</h1>
        </div>

        <StatsCards stats={stats} />

        <UpcomingBookings bookings={upcomingBookings} />

        <ReportsSummary
          reports={reports}
          onManage={() => navigate("/admin/reports")}
        />
      </main>
    </div>
  );
}

export default DashboardContent;