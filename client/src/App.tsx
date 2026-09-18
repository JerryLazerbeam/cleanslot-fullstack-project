import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Rules from "./pages/rules";
import Booking from "./pages/booking";
import ServiceReport from "./pages/serviceReport";
import Profile from "./pages/profile";
import Admin from "./pages/admin/AdminDashboard";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminReports from "./pages/admin/AdminReports";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/ServiceReport" element={<ServiceReport />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/bookings" element={<AdminBookings />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/reports" element={<AdminReports />} />
    </Routes>
  );
}

export default App;
