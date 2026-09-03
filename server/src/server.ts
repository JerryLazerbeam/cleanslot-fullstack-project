import express from "express";
import cors from "cors";
import session from "express-session";
import authRoutes from "./routes/auth.routes";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: "clean-slot-key",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use("/api", authRoutes);

app.get("/api/test-session", (req, res) => {
  req.session.userId = 1;

  res.json({
    message: "Session skapad",
    userId: req.session.userId,
  });
});

app.get("/api/me", (req, res) => {
  res.json({
    userId: req.session.userId,
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
