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
import type { ApiAdminSlot } from "../../components/admin/adminTypes";
import CreateSlotView from "../../components/admin/CreateSlotView";
import { getAdminSlots, deleteSlot } from "../../services/bookingService";

function getWeekStart(date: Date): Date {
  const weekStart = new Date(date);
  const day = weekStart.getDay();
  const daysFromMonday = (day + 6) % 7;

  weekStart.setDate(weekStart.getDate() - daysFromMonday);
  weekStart.setHours(0, 0, 0, 0);
  return weekStart;
}

type CreateState = { date?: string; start?: string } | null;

function AdminBookings() {
  const [view, setView] = useState<CalendarView>("week");
  const [current, setCurrent] = useState(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [create, setCreate] = useState<CreateState>(null);

  function loadBookings() {
    getAdminSlots()
      .then((data: ApiAdminSlot[]) =>
        setBookings(
          data.map((s) => ({
            id: s.slot_id,
            date: s.date,
            time: `${s.start_time}–${s.end_time}`,
            user: s.username,
          })),
        ),
      )
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function handleDeleteSlot(slot: Booking) {
    const confirmed = window.confirm(
      `Ta bort tvättiden ${slot.date} kl ${slot.time}?`,
    );

    if (!confirmed) return;

    try {
      await deleteSlot(slot.id);
      setBookings((prev) => prev.filter((b) => b.id !== slot.id));
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Kunde inte ta bort tvättiden",
      );
    }
  }

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
    <div className="flex-1 flex flex-col bg-[#f8f9fb] dark:bg-[#111C22]">
      <NavbarAdmin />
      <main className="flex-1 flex items-center justify-center p-4 py-10 sm:p-8 lg:pl-64">
        <div className="p-4 py-10 sm:p-8 sm:py-25 max-w-4xl w-full border rounded-lg bg-white border-gray-300 shadow-sm">
          <Link to="/admin">Tillbaka</Link>

          <div className="flex flex-wrap items-center justify-between gap-4 my-4">
            <div className="flex items-center gap-4">
              <button onClick={goPrev}>‹</button>
              <span>{current.toLocaleDateString("sv-SE")}</span>
              <button onClick={goNext}>›</button>
            </div>
            <ViewToggle view={view} onChange={setView} />
            <button
              onClick={() => setCreate({})}
              className="rounded-md bg-[#1F5C73] px-4 py-2 text-white hover:bg-[#17485A]"
            >
              Skapa tider
            </button>
          </div>

          <div className="overflow-x-auto">
            {view === "week" && (
              <WeekView
                weekStart={getWeekStart(current)}
                bookings={bookings}
                onSelectDay={(date) => setCreate({ date })}
                onDeleteSlot={handleDeleteSlot}
              />
            )}
            {view === "day" && (
              <DayView
                date={current}
                bookings={bookings}
                onAddSlot={(date, start) => setCreate({ date, start })}
                onDeleteSlot={handleDeleteSlot}
              />
            )}
            {view === "month" && (
              <MonthView
                monthStart={
                  new Date(current.getFullYear(), current.getMonth(), 1)
                }
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
      {create && (
        <CreateSlotView
          initialDate={create.date}
          initialStart={create.start}
          existingSlots={bookings}
          onClose={() => setCreate(null)}
          onCreated={loadBookings}
        />
      )}
    </div>
  );
}
export default AdminBookings;
