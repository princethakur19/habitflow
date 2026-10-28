import type { Habit } from "../../types/habit";

type HabitCardProps = {
  habit: Habit;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  deleting: boolean;
};

const categoryColors: Record<string, string> = {
  Health: "bg-emerald-400/10 text-emerald-300",
  Learning: "bg-sky-400/10 text-sky-300",
  Productivity: "bg-amber-400/10 text-amber-300",
  Personal: "bg-pink-400/10 text-pink-300",
};

export default function HabitCard({
  habit,
  completed,
  onToggle,
  onDelete,
  deleting,
}: HabitCardProps) {
  return (
    <article
      className={`animate-item group rounded-2xl border p-5 transition duration-200 hover:-translate-y-0.5 ${
        completed
          ? "border-[#C5F36B]/25 bg-[#C5F36B]/[0.04]"
          : "border-white/[0.07] bg-[#131814] hover:border-white/15"
      }`}
    >
      <div className="flex items-start gap-4">
        <button
          type="button"
          aria-label={
            completed
              ? `Mark ${habit.title} incomplete`
              : `Mark ${habit.title} complete`
          }
          aria-pressed={completed}
          onClick={() => onToggle(habit._id)}
          className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition ${
            completed
              ? "border-[#C5F36B] bg-[#C5F36B] text-[#17200F]"
              : "border-white/15 text-transparent hover:border-[#C5F36B] hover:text-[#C5F36B]"
          }`}
        >
          ✓
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`break-words font-medium ${
                completed
                  ? "text-[#899588] line-through"
                  : "text-[#F0F3EC]"
              }`}
            >
              {habit.title}
            </h3>

            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                categoryColors[habit.category] ??
                "bg-white/[0.06] text-[#A8B2A4]"
              }`}
            >
              {habit.category}
            </span>
          </div>

          <p className="mt-2 text-sm leading-6 text-[#899588]">
            {habit.description || "One small step toward your goals."}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
            <span className="text-xs text-[#788478]">
              ↻ {habit.frequency}
            </span>

            <span
              className={`text-xs font-medium ${
                completed ? "text-[#C5F36B]" : "text-[#788478]"
              }`}
            >
              {completed ? "✓ Done for now" : "Ready when you are"}
            </span>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              disabled={deleting}
              onClick={() => onDelete(habit._id)}
              aria-label={`Delete ${habit.title}`}
              className="rounded-lg border border-rose-400/20 px-3 py-2 text-xs font-medium text-rose-300 transition hover:bg-rose-400/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Delete habit"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
