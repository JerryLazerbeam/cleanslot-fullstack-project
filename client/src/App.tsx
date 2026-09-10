import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Rules from "./pages/rules";
import Booking from "./pages/booking";
import ServiceReport from "./pages/serviceReport";
import Profile from "./pages/profile";
import Admin from "./pages/admin/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/serviceReport" element={<ServiceReport />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
