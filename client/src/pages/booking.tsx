import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import BookingCalendar from "../components/booking/BookingCalendar";

function Booking() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fb] dark:bg-[#111C22] ">
      <Navbar />

      <main className="flex-1 lg:ml-64 flex justify-center items-center">
        <BookingCalendar />
      </main>
      <Footer />
    </div>
  );
}

export default Booking;
