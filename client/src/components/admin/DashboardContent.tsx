import { useNavigate } from "react-router-dom";
import StatsCards from "./StatsCards";
import UpcomingBookings from "./UpcomingBookings";
import ReportsSummary from "./ReportsSummary";
import type {
  AdminStat,
  UpcomingBooking,
  ReportSummaryItem,
} from "./adminTypes";


function DashboardContent() {
  const navigate = useNavigate();

  const stats: AdminStat[] = [
    { label: "Bokningar", value: 12, route: "/admin/bookings" },
    { label: "Ledigt", value: 8, route: "/admin/bookings?view=ledigt" },
    { label: "Användare", value: 2, route: "/admin/users" },
  ];

  
  // Till back end 
  // const [stats, setStats] = useState<AdminStat[]>([
  //   { label: "Bokningar", value: 0, route: "/admin/bookings" },
  //   { label: "Ledigt", value: 0, route: "/admin/bookings?view=ledigt" },
  //   { label: "Användare", value: 0, route: "/admin/users" },
  // ]);

  // useEffect(() => {
  //   fetch("http://localhost:3000/api/admin/stats")
  //     .then((res) => res.json())
  //     .then((data) => setStats(data));
  // }, []);

  const upcomingBookings: UpcomingBooking[] = [
    { id: 1, date: "10/09", time: "10:00–13:00", user: "Anna" },
    { id: 2, date: "10/09", time: "13:00–16:00", user: "Erik" },
  ];

  const reports: ReportSummaryItem[] = [
    { id: 1, machine: "Tvättmaskin 2", status: "Ny" },
    { id: 2, machine: "Tvättmaskin 4", status: "Pågående" },
  ];


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