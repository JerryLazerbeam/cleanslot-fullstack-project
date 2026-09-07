import express from "express";
import cors from "cors";
import session from "express-session";
import authRoutes from "./routes/auth.routes";
import { requireLogin } from "./middleware/auth.middleware";
import userRoutes from "./routes/user.routes";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.use(
  session({
    secret: "clean-slot-key",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use("/api", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
