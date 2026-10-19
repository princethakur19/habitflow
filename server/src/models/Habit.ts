import { Schema, model, type InferSchemaType } from "mongoose";

const habitSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Habit title is required"],
            trim: true,
            minlength: [2, "Title must be at least 2 characters"],
            maxlength: [80, "Title cannot exceed 80 characters"]
        },

        description:{
            type: String,
            trim: true,
            maxlength: [300, "Description cannot exceed 300 charcters"],
            default: "",
        },

        category: {
            type: String,
            enum: ["Health", "Learning", "Productivity", "Personal"],
            default: "Personal",
        },

        frequency: {
            type: String,
            enum: ["Daily", "Weekly"],
            default: "Daily",
        },

        isArchived: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export type HabitType = InferSchemaType<typeof habitSchema>;

const Habit = model("Habit", habitSchema);

export default Habit;