import { Request, Response } from "express";
import db from "../database";
import {
  getAvailableSlots,
  createBooking as saveBooking,
  getBookings,
  deleteBooking as removeBooking,
  getUpcomingBookings,
  createSlot,
  findOverlappingSlot,
  getSlotsWithBookings,
  deleteSlot,
} from "../services/booking.service";
import { getUserOrganization } from "../services/user.service";
import {
  ALLOWED_REMINDERS,
  getReminders,
  setReminders,
  deleteRemindersForBooking,
} from "../services/reminder.service";

export function getSlots(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Du måste vara inloggad",
    });
  }

  const user = getUserOrganization(req.session.userId);

  console.log("User från getUserOrganization:", user);

  if (!user) {
    return res.status(404).json({
      message: "Användaren hittades inte",
    });
  }
  const slots = getAvailableSlots(user.organization_id);

  console.log("Slots från getAvailableSlots:", slots);

  res.json(slots);
}

export function getUserBookings(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Du måste vara inloggad",
    });
  }

  const user = getUserOrganization(req.session.userId);

  if (!user) {
    return res.status(404).json({
      message: "Användaren hittades inte",
    });
  }

  const bookings = getBookings(user.organization_id);

  res.json(bookings);
}

export function createBooking(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Du måste vara inloggad",
    });
  }

  const { slotId } = req.body;

  if (!slotId) {
    return res.status(400).json({
      message: "Slot saknas",
    });
  }

  const user = getUserOrganization(req.session.userId);

  if (!user) {
    return res.status(404).json({
      message: "Användaren hittades inte",
    });
  }
  const existingBooking = db
    .prepare(
      `
    SELECT bookings.booking_id
    FROM bookings
    JOIN washing_slots ON bookings.slot_id = washing_slots.slot_id
    WHERE bookings.user_id = ?
      AND washing_slots.date >= date('now', 'localtime')
  `,
    )
    .get(req.session.userId) as
    | {
        booking_id: number;
      }
    | undefined;

  if (existingBooking) {
    return res.status(409).json({
      message: "Du har redan en bokad tvättid",
    });
  }

  const slot = db
    .prepare(
      `
      SELECT slot_id, organization_id
      FROM washing_slots
      WHERE slot_id = ?
    `,
    )
    .get(slotId) as
    | {
        slot_id: number;
        organization_id: number;
      }
    | undefined;

  if (!slot) {
    return res.status(404).json({
      message: "Tvättiden hittades inte",
    });
  }

  if (slot.organization_id !== user.organization_id) {
    return res.status(403).json({
      message: "Du kan inte boka en tid från en annan förening",
    });
  }

  try {
    saveBooking(req.session.userId, slotId);

    return res.status(201).json({
      message: "Tvättiden är bokad",
    });
  } catch (error) {
    return res.status(409).json({
      message: "Tvättiden är redan bokad",
    });
  }
}
export function deleteBooking(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Du måste vara inloggad",
    });
  }

  const bookingId = Number(req.params.bookingId);

  if (!bookingId) {
    return res.status(400).json({
      message: "Booking ID saknas",
    });
  }

  const booking = db
    .prepare(
      `
    SELECT booking_id, user_id
    FROM bookings
    WHERE booking_id = ?
  `,
    )
    .get(bookingId) as
    | {
        booking_id: number;
        user_id: number;
      }
    | undefined;

  if (!booking) {
    return res.status(404).json({
      message: "Bokningen hittades inte",
    });
  }

  if (booking.user_id !== req.session.userId) {
    return res.status(403).json({
      message: "Du kan inte avboka någon annans bokning",
    });
  }
  deleteRemindersForBooking(bookingId);
  removeBooking(bookingId);

  return res.json({
    message: "Bokningen är avbokad",
  });
}
//---------- ADMIN: tvättider ------------
const ALLOWED_TIMES = [
  { start: "07:00", end: "10:00" },
  { start: "10:00", end: "13:00" },
  { start: "13:00", end: "16:00" },
  { start: "16:00", end: "19:00" },
  { start: "19:00", end: "22:00" },
];

export function createSlotHandler(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Du måste vara inloggad" });
  }

  const { date, startTime, endTime } = req.body;

  if (!date || !startTime || !endTime) {
    return res
      .status(400)
      .json({ message: "Datum och tid måste väljas" });
  }

  const isAllowedTime = ALLOWED_TIMES.some(
    (t) => t.start === startTime && t.end === endTime,
  );

  if (!isAllowedTime) {
    return res.status(400).json({ message: "Ogiltig tid" });
  }

  const today = new Date().toLocaleDateString("sv-SE");

  if (date < today) {
    return res
      .status(400)
      .json({ message: "Du kan inte lägga till en tid bakåt i tiden" });
  }

  const admin = getUserOrganization(req.session.userId);

  if (!admin) {
    return res.status(404).json({ message: "Användaren hittades inte" });
  }

  if (findOverlappingSlot(admin.organization_id, date, startTime, endTime)) {
    return res
      .status(409)
      .json({ message: "Det finns redan en tvättid den tiden" });
  }

  createSlot(admin.organization_id, date, startTime, endTime);

  return res.status(201).json({ message: "Tvättiden är skapad" });
}

export function deleteSlotHandler(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Du måste vara inloggad" });
  }

  const slotId = Number(req.params.slotId);

  if (Number.isNaN(slotId)) {
    return res.status(400).json({ message: "Ogiltigt id" });
  }

  const admin = getUserOrganization(req.session.userId);

  if (!admin) {
    return res.status(404).json({ message: "Användaren hittades inte" });
  }

  const booking = db
    .prepare(`SELECT booking_id FROM bookings WHERE slot_id = ?`)
    .get(slotId);

  if (booking) {
    return res.status(409).json({
      message: "Tiden är redan bokad av en boende och kan inte tas bort",
    });
  }

  const result = deleteSlot(slotId, admin.organization_id);

  if (result.changes === 0) {
    return res.status(404).json({ message: "Tvättiden hittades inte" });
  }

  return res.json({ message: "Tvättiden är borttagen" });
}

export function getAdminSlotsHandler(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Du måste vara inloggad" });
  }

  const admin = getUserOrganization(req.session.userId);

  if (!admin) {
    return res.status(404).json({ message: "Användaren hittades inte" });
  }

  res.json(getSlotsWithBookings(admin.organization_id));
}

export function getUpcomingBookingsHandler(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Du måste vara inloggad" });
  }

  const admin = getUserOrganization(req.session.userId);

  if (!admin) {
    return res.status(404).json({ message: "Användaren hittades inte" });
  }

  res.json(getUpcomingBookings(admin.organization_id));
}

//---------- Påminnelser ------------
function findOwnBooking(bookingId: number, userId: number) {
  return db
    .prepare(`SELECT booking_id FROM bookings WHERE booking_id = ? AND user_id = ?`)
    .get(bookingId, userId) as { booking_id: number } | undefined;
}

export function getBookingReminders(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Du måste vara inloggad" });
  }

  const bookingId = Number(req.params.bookingId);

  if (!findOwnBooking(bookingId, req.session.userId)) {
    return res.status(404).json({ message: "Bokningen hittades inte" });
  }

  res.json(getReminders(bookingId));
}

export function saveBookingReminders(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Du måste vara inloggad" });
  }

  const bookingId = Number(req.params.bookingId);
  const { minutes } = req.body;

  if (
    !Array.isArray(minutes) ||
    !minutes.every((m: number) => ALLOWED_REMINDERS.includes(m))
  ) {
    return res.status(400).json({ message: "Ogiltiga påminnelser" });
  }

  if (!findOwnBooking(bookingId, req.session.userId)) {
    return res.status(404).json({ message: "Bokningen hittades inte" });
  }

  setReminders(bookingId, minutes);

  res.json({ message: "Påminnelser sparade" });
}
