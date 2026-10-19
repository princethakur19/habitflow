
import type { Request, Response } from "express";
import Habit from "../models/Habit.js";

export const createHabit = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, description, category, frequency } = req.body;

    if (typeof title !== "string" || !title.trim()) {
      res.status(400).json({
        success: false,
        message: "Habit title is required",
      });
      return;
    }

    const habit = await Habit.create({
      title,
      description,
      category,
      frequency,
    });

    res.status(201).json({
      success: true,
      message: "Habit created successfully",
      data: habit,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "ValidationError") {
      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }

    console.error("Create habit error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create habit",
    });
  }
};
