import type { UpcomingBooking } from "./adminTypes";

type Props = {
  bookings: UpcomingBooking[];
};

function UpcomingBookings({ bookings }: Props) {
  return (
    <div className="mx-4 mt-8">
      <h2 className="mb-4 text-lg font-semibold">Kommande bokningar</h2>

      <div className="border border-gray-300">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 p-3 text-left">Datum</th>
              <th className="border border-gray-300 p-3 text-left">Tid</th>
              <th className="border border-gray-300 p-3 text-left">Användare</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="border border-gray-300 p-3">{booking.date}</td>
                <td className="border border-gray-300 p-3">{booking.time}</td>
                <td className="border border-gray-300 p-3">{booking.user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UpcomingBookings;