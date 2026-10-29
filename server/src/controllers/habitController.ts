import type { Request, Response } from "express";
import Habit from "../models/Habit.js";
import mongoose from "mongoose";

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
      message:
          error instanceof Error ? error.message : "Unknown server error",
    });
  }
};

export const getHabits = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const habits = await Habit.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: habits.length,
      data: habits,
    });
  } catch (error) {
    console.error("Get habits error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch habits",
    });
  }
};


export const deleteHabit = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Check whether the ID is a valid MongoDB ObjectId
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid habit ID",
      });
      return;
    }

    // Find the habit and delete it from MongoDB
    const habit = await Habit.findByIdAndDelete(id);

    if (!habit) {
      res.status(404).json({
        success: false,
        message: "Habit not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Habit deleted successfully",
      data: habit,
    });
  } catch (error) {
    console.error("Delete habit error:", error);

    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete habit",
    });
  }
};
