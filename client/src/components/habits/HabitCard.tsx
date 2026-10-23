import type { Habit } from "../../types/habit";
import { CATEGORY_STYLES } from "../../utils/habitStyles";

type HabitCardProps = {
  habit: Habit;
  completed: boolean;
  onToggle: (id: string) => void;
};

export default function HabitCard({
  habit,
  completed,
  onToggle,
}: HabitCardProps) {
  return (
    <article
      className={`animate-item rounded-[22px] border p-5 transition hover:-translate-y-0.5 hover:shadow-sm ${
        completed
          ? "border-[#DCE5D7] bg-[#F0F4EC]"
          : "border-[#E8E6DC] bg-white"
      }`}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggle(habit._id)}
          aria-label={
            completed
              ? `Mark ${habit.title} incomplete`
              : `Mark ${habit.title} complete`
          }
          className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
            completed
              ? "border-[#668267] bg-[#668267] text-white"
              : "border-[#D4D7CB] text-transparent hover:border-[#668267]"
          }`}
        >
          ✓
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`font-medium ${
                completed
                  ? "text-[#858B7E] line-through"
                  : "text-[#263B2E]"
              }`}
            >
              {habit.title}
            </h3>
            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                CATEGORY_STYLES[habit.category] ||
                "bg-[#EDF0E8] text-[#526650]"
              }`}
            >
              {habit.category}
            </span>
          </div>

          {habit.description && (
            <p className="mt-2 text-sm leading-6 text-[#858B7E]">
              {habit.description}
            </p>
          )}

          <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.12em] text-[#92978A]">
            {habit.frequency} practice
          </p>
        </div>

        <span className="text-lg text-[#B8C2AF]">
          {completed ? "✳" : "○"}
        </span>
      </div>
    </article>
  );
}
