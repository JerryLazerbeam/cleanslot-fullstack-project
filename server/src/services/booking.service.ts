import db from "../database";

export function getAvailableSlots(organizationId: number) {
  const slots = db
    .prepare(
      `
      SELECT slot_id, date, start_time, end_time
      FROM washing_slots
      WHERE organization_id = ?
      ORDER BY date, start_time
    `,
    )
    .all(organizationId);

  console.log("Organization ID:", organizationId);
  console.log("Slots:", slots);

  return slots;
}
export function createBooking(userId: number, slotId: number) {
  const statement = db.prepare(`
    INSERT INTO bookings (user_id, slot_id)
    VALUES (?, ?)
  `);

  return statement.run(userId, slotId);
}
export function getBookings(organizationId: number) {
  const bookings = db
    .prepare(
      `
      SELECT
        bookings.booking_id,
        bookings.user_id,
        washing_slots.slot_id,
        washing_slots.date,
        washing_slots.start_time,
        washing_slots.end_time
      FROM bookings
      JOIN washing_slots
        ON bookings.slot_id = washing_slots.slot_id
      WHERE washing_slots.organization_id = ?
      ORDER BY washing_slots.date, washing_slots.start_time
    `,
    )
    .all(organizationId);

  return bookings;
}
export function deleteBooking(bookingId: number) {
  const statement = db.prepare(`
    DELETE FROM bookings
    WHERE booking_id = ?
  `);

  return statement.run(bookingId);
}
