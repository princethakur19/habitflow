import { Router } from "express";
import {
  createHabit,
  getHabits,
  deleteHabit,
} from "../controllers/habitController.js";

const router = Router();

router.post("/", createHabit);
router.get("/", getHabits);
router.delete("/:id", deleteHabit);

export default router;
