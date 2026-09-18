import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import NavbarAdmin from "../../components/navbar/navbarAdmin";
import ViewToggle from "../../components/admin/calendar/ViewToggle";
import WeekView from "../../components/admin/calendar/WeekView";
import DayView from "../../components/admin/calendar/DayView";
import MonthView from "../../components/admin/calendar/MonthView";
import type {
  CalendarView,
  Booking,
} from "../../components/admin/calendar/calendarTypes";




function getWeekStart(date: Date): Date {
  const weekStart = new Date(date);
  const day = weekStart.getDay();
  const daysFromMonday = (day + 6) % 7;

  weekStart.setDate(weekStart.getDate() - daysFromMonday);
  weekStart.setHours(0, 0, 0, 0);
  return weekStart;
}

function AdminBookings() {
  const [view, setView] = useState<CalendarView>("week");
  const [current, setCurrent] = useState(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);

   useEffect(() => {
    fetch("http://localhost:3000/api/admin/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  function goPrev() {
    const d = new Date(current);
    if (view === "day") d.setDate(d.getDate() - 1);
    if (view === "week") d.setDate(d.getDate() - 7);
    if (view === "month") d.setMonth(d.getMonth() - 1);
    setCurrent(d);
  }

  function goNext() {
    const d = new Date(current);
    if (view === "day") d.setDate(d.getDate() + 1);
    if (view === "week") d.setDate(d.getDate() + 7);
    if (view === "month") d.setMonth(d.getMonth() + 1);
    setCurrent(d);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fb] dark:bg-[#111C22]">
      <NavbarAdmin />
      <main className="flex-1 flex items-center justify-center p-4 py-10 sm:p-8 lg:pl-64">
        <div className="p-4 py-10 sm:p-8 sm:py-25 max-w-4xl w-full border rounded-lg border-gray-300 shadow-sm">
          <Link to="/admin">Tillbaka</Link>

          <div className="flex flex-wrap items-center justify-between gap-4 my-4">
            <div className="flex items-center gap-4">
              <button onClick={goPrev}>‹</button>
              <span>{current.toLocaleDateString("sv-SE")}</span>
              <button onClick={goNext}>›</button>
            </div>
            <ViewToggle view={view} onChange={setView} />
          </div>

          <div className="overflow-x-auto">
            {view === "week" && (
              <WeekView weekStart={getWeekStart(current)} bookings={bookings} />
            )}
            {view === "day" && <DayView date={current} bookings={bookings} />}
            {view === "month" && (
              <MonthView
                monthStart={new Date(current.getFullYear(), current.getMonth(), 1)}
                bookings={bookings}
                onSelectDay={(d) => {
                  setCurrent(d);
                  setView("day");
                }}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
export default AdminBookings;
