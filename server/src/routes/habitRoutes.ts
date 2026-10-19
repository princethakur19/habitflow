
import { Router } from "express";
import { createHabit } from "../controllers/habitController.js";

const router = Router();

router.post("/", createHabit);

export default router;
