import type { HabitCategory } from "../types/habit";

export const HABIT_CATEGORIES: HabitCategory[] = [
  "All habits",
  "Health",
  "Learning",
  "Productivity",
  "Personal",
];

export const CATEGORY_STYLES: Record<string, string> = {
  Health: "bg-[#E4EDE0] text-[#426344]",
  Learning: "bg-[#F8E8D9] text-[#9B603C]",
  Productivity: "bg-[#E8E5F2] text-[#66558B]",
  Personal: "bg-[#F4E1E0] text-[#A65E58]",
};
