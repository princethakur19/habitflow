import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = Number(process.env.PORT) || 5000;

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`HabitFlow API running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start HabitFlow:", error);
    process.exit(1);
  }
};

startServer();