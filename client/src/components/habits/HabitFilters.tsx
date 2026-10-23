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
    <div className="animate-item mb-6 flex gap-2 overflow-x-auto pb-2">
      {HABIT_CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-medium transition ${
            activeCategory === category
              ? "bg-[#294B3A] text-white"
              : "border border-[#E5E4D9] text-[#777D72] hover:bg-white"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
