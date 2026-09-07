import Navbar from "../components/navbar/navbar";
import BookingCalendar from "../components/booking/BookingCalendar";

function Booking() {
  return (
    <>
      <Navbar />
      <main className="lg:ml-64 min-h-screen bg-[#f8f9fb]">
        <div className="flex justify-center items-center min-h-screen bg-[#f8f9fb]">
          <BookingCalendar />
        </div>
      </main>
    </>
  );
}

export default Booking;
