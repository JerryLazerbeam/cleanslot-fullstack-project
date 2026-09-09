import { Request, Response } from "express";
import db from "../database";
import {
  getAvailableSlots,
  createBooking as saveBooking,
  getBookings,
  deleteBooking as removeBooking,
} from "../services/booking.service";
import { getUserOrganization } from "../services/user.service";

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
    SELECT booking_id
    FROM bookings
    WHERE user_id = ?
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
  removeBooking(bookingId);

  return res.json({
    message: "Bokningen är avbokad",
  });
}
