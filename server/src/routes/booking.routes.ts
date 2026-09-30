import { Router } from "express";
import { requireLogin } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";
import {
  getSlots,
  createBooking,
  getUserBookings,
  deleteBooking,
  getUpcomingBookingsHandler,
  createSlotHandler,
  getAdminSlotsHandler,
  deleteSlotHandler,
  getBookingReminders,
  saveBookingReminders,
} from "../controllers/booking.controller";

const router = Router();

router.get("/slots", requireLogin, getSlots);
router.get("/bookings", requireLogin, getUserBookings);
router.post("/", requireLogin, createBooking);
router.delete("/:bookingId", requireLogin, deleteBooking);
router.get("/:bookingId/reminders", requireLogin, getBookingReminders);
router.put("/:bookingId/reminders", requireLogin, saveBookingReminders);

// Admin
router.get("/upcoming", requireLogin, requireAdmin, getUpcomingBookingsHandler);
router.get("/admin/slots", requireLogin, requireAdmin, getAdminSlotsHandler);
router.post("/slots", requireLogin, requireAdmin, createSlotHandler);
router.delete("/slots/:slotId", requireLogin, requireAdmin, deleteSlotHandler);

export default router;
