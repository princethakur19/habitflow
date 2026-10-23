
import { HABIT_CATEGORIES } from "../../utils/habitStyles";
import type { HabitCategory } from "../../types/habit";

type HabitFiltersProps = {
  activeCategory: HabitCategory;
  onChange: (category: HabitCategory) => void;
};

export default function HabitFilters({
  activeCategory,
  onChange,
}: HabitFiltersProps) {
  return (
    <div className="animate-item flex gap-2 overflow-x-auto pb-2">
      {HABIT_CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`shrink-0 rounded-xl px-4 py-2.5 text-xs font-medium transition ${
            activeCategory === category
              ? "bg-[#C5F36B] text-[#17200F]"
              : "border `border-white/[0.08]` bg-[#131814] text-[#9BA69A] hover:border-white/20 hover:text-white"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
