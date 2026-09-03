import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Rules from "./pages/rules";
import Booking from "./pages/booking";
import Booked from "./pages/booked";
import Profile from "./pages/profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/booked" element={<Booked />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
