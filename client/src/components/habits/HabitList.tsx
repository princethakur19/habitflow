import type { Habit } from "../../types/habit";
import HabitCard from "./HabitCard";

type HabitListProps = {
  habits: Habit[];
  completedHabits: string[];
  onToggle: (id: string) => void;
};

export default function HabitList({
  habits,
  completedHabits,
  onToggle,
}: HabitListProps) {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {habits.map((habit) => (
        <HabitCard
          key={habit._id}
          habit={habit}
          completed={completedHabits.includes(habit._id)}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
