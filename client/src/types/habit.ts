export type Habit = {
  _id: string;
  title: string;
  description?: string;
  category: string;
  frequency: "Daily" | "Weekly" | string;
};

export type HabitCategory =
  | "All habits"
  | "Health"
  | "Learning"
  | "Productivity"
  | "Personal";

export type CreateHabitInput = {
  title: string;
  description: string;
  category: string;
  frequency: "Daily" | "Weekly";
};
