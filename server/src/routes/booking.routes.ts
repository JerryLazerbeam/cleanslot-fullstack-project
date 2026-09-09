import { Router } from "express";
import { requireLogin } from "../middleware/auth.middleware";
import { getSlots, createBooking, getUserBookings, deleteBooking } from "../controllers/booking.controller";

const router = Router();

router.get("/slots", requireLogin, getSlots);
router.get("/bookings", requireLogin, getUserBookings);
router.post("/", requireLogin, createBooking);
router.delete("/:bookingId", requireLogin, deleteBooking);


export default router;