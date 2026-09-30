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
export function getUpcomingBookings(organizationId: number) {
  return db
    .prepare(
      `
      SELECT
        bookings.booking_id,
        users.username,
        washing_slots.date,
        washing_slots.start_time,
        washing_slots.end_time
      FROM bookings
      JOIN washing_slots ON bookings.slot_id = washing_slots.slot_id
      JOIN users ON bookings.user_id = users.user_id
      WHERE washing_slots.organization_id = ?
        AND washing_slots.date BETWEEN date('now', 'localtime')
                                   AND date('now', 'localtime', '+6 days')
      ORDER BY washing_slots.date, washing_slots.start_time
    `,
    )
    .all(organizationId);
}
export function getSlotsWithBookings(organizationId: number) {
  return db
    .prepare(
      `
      SELECT
        washing_slots.slot_id,
        washing_slots.date,
        washing_slots.start_time,
        washing_slots.end_time,
        bookings.booking_id,
        users.username
      FROM washing_slots
      LEFT JOIN bookings ON bookings.slot_id = washing_slots.slot_id
      LEFT JOIN users ON bookings.user_id = users.user_id
      WHERE washing_slots.organization_id = ?
      ORDER BY washing_slots.date, washing_slots.start_time
    `,
    )
    .all(organizationId);
}
export function findOverlappingSlot(
  organizationId: number,
  date: string,
  startTime: string,
  endTime: string,
) {
  return db
    .prepare(
      `
      SELECT slot_id
      FROM washing_slots
      WHERE organization_id = ?
        AND date = ?
        AND start_time < ?
        AND end_time > ?
    `,
    )
    .get(organizationId, date, endTime, startTime);
}
export function createSlot(
  organizationId: number,
  date: string,
  startTime: string,
  endTime: string,
) {
  return db
    .prepare(
      `
      INSERT INTO washing_slots (organization_id, date, start_time, end_time)
      VALUES (?, ?, ?, ?)
    `,
    )
    .run(organizationId, date, startTime, endTime);
}
export function deleteSlot(slotId: number, organizationId: number) {
  return db
    .prepare(
      `
      DELETE FROM washing_slots
      WHERE slot_id = ?
        AND organization_id = ?
    `,
    )
    .run(slotId, organizationId);
}
