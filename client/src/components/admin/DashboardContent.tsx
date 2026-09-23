import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatsCards from "./StatsCards";
import UpcomingBookings from "./UpcomingBookings";
import ReportsSummary from "./ReportsSummary";
import type { AdminStat, UpcomingBooking, Report } from "./adminTypes";
import { getReports } from "../../services/reportService";
import { getUsers } from "../../services/userService";
import { getBookings, getSlots } from "../../services/bookingService";


function DashboardContent() {
  const navigate = useNavigate();

  const [stats, setStats] = useState<AdminStat[]>([])

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

  useEffect(() => {
    Promise.all([getUsers(), getBookings(), getSlots()])
    .then(([ users, bookings, slots]) => {
      setStats ([
        { label: "Bokningar", value: bookings.length, route: "/admin/bookings" },
        { label: "Ledigt", value: slots.length - bookings.length, route: "/admin/bookings?view=ledigt" },
        { label: "Användare", value: users.length, route: "/admin/users" },
      ]);
    })
    .catch((error) => console.log(error))
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