import db from "../database";
import { createMessage } from "./message.service";

export const ALLOWED_REMINDERS = [1440, 60, 30];

export function getReminders(bookingId: number) {
  const rows = db
    .prepare(
      `
      SELECT minutes_before
      FROM booking_reminders
      WHERE booking_id = ?
    `,
    )
    .all(bookingId) as { minutes_before: number }[];

  return rows.map((row) => row.minutes_before);
}

// Ersätter bokningens påminnelser med de nya valen
export function setReminders(bookingId: number, minutes: number[]) {
  const replace = db.transaction(() => {
    db.prepare(`DELETE FROM booking_reminders WHERE booking_id = ?`).run(
      bookingId,
    );

    const insert = db.prepare(`
      INSERT INTO booking_reminders (booking_id, minutes_before)
      VALUES (?, ?)
    `);

    for (const minutesBefore of minutes) {
      insert.run(bookingId, minutesBefore);
    }
  });

  replace();
}

export function deleteRemindersForBooking(bookingId: number) {
  db.prepare(`DELETE FROM booking_reminders WHERE booking_id = ?`).run(
    bookingId,
  );
}

// Skickar påminnelser som har blivit aktuella som meddelanden till användaren
export function deliverDueReminders(userId: number) {
  const due = db
    .prepare(
      `
      SELECT
        booking_reminders.reminder_id,
        booking_reminders.minutes_before,
        washing_slots.date,
        washing_slots.start_time,
        washing_slots.end_time
      FROM booking_reminders
      JOIN bookings ON booking_reminders.booking_id = bookings.booking_id
      JOIN washing_slots ON bookings.slot_id = washing_slots.slot_id
      WHERE bookings.user_id = ?
        AND booking_reminders.sent = 0
        AND datetime(washing_slots.date || ' ' || washing_slots.start_time,
                     '-' || booking_reminders.minutes_before || ' minutes')
            <= datetime('now', 'localtime')
    `,
    )
    .all(userId) as {
    reminder_id: number;
    minutes_before: number;
    date: string;
    start_time: string;
    end_time: string;
  }[];

  const markSent = db.prepare(
    `UPDATE booking_reminders SET sent = 1 WHERE reminder_id = ?`,
  );

  const now = new Date();

  for (const reminder of due) {
    const slotStart = new Date(`${reminder.date}T${reminder.start_time}`);

    // Tiden har redan börjat – ingen idé att påminna
    if (slotStart > now) {
      createMessage(
        userId,
        `Du har en tvättid ${reminder.date} kl ${reminder.start_time}–${reminder.end_time}.`,
        "Påminnelse om tvättid",
      );
    }

    markSent.run(reminder.reminder_id);
  }
}
