import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatsCards from "./StatsCards";
import UpcomingBookings from "./UpcomingBookings";
import ReportsSummary from "./ReportsSummary";
import type { AdminStat, UpcomingBooking, Report, ApiUpcomingBooking } from "./adminTypes";
import { getReports } from "../../services/reportService";
import { getUsers } from "../../services/userService";
import { getBookings, getSlots, getUpcomingBookings } from "../../services/bookingService";

function DashboardContent() {
  const navigate = useNavigate();

  const [stats, setStats] = useState<AdminStat[]>([]);

  const [upcomingBookings, setUpcomingBookings] = useState<UpcomingBooking[]>(
    [],
  );

  useEffect(() => {
    getUpcomingBookings()
      .then((data: ApiUpcomingBooking[]) =>
        setUpcomingBookings(
          data.map((b) => ({
            id: b.booking_id,
            date: new Date(b.date).toLocaleDateString("sv-SE", {
              weekday: "short",
              day: "numeric",
              month: "numeric",
            }),
            time: `${b.start_time}–${b.end_time}`,
            user: b.username,
          })),
        ),
      )
      .catch((error) => console.error(error));
  }, []);

  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    getReports()
      .then((data) => setReports(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    Promise.all([getUsers(), getBookings(), getSlots()])
      .then(([users, bookings, slots]) => {
        setStats([
          {
            label: "Bokningar",
            value: bookings.length,
            route: "/admin/bookings",
          },
          {
            label: "Ledigt",
            value: slots.length - bookings.length,
            route: "/admin/bookings?view=ledigt",
          },
          { label: "Användare", value: users.length, route: "/admin/users" },
        ]);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <main className="flex flex-col ">
        <div className="">
          <h1 className="text-4xl font-bold ml-4 mt-8 mb-5 drop-shadow-xl">
            Dashboard ✨
          </h1>
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
