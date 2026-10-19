import express from "express";
import cors from "cors";
import habitRoutes from "./routes/habitRoutes.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "HabitFlow API is running!",
  });
});

app.use("/api/habits", habitRoutes);

export default app;
