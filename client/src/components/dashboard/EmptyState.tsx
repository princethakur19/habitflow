type EmptyStateProps = {
  hasHabits: boolean;
  onAddHabit: () => void;
};

export default function EmptyState({
  hasHabits,
  onAddHabit,
}: EmptyStateProps) {
  return (
    <div className="rounded-\[24px\] border border-dashed border-[#D9DCCF] bg-[#F1F1E9] px-6 py-12 text-center">
      <span className="text-3xl">🌿</span>
      <h3 className="mt-4 font-serif text-2xl">
        {hasHabits
          ? "Nothing in this category yet."
          : "Every good thing starts small."}
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#777D72]">
        {hasHabits
          ? "Try another category, or add a habit that belongs here."
          : "Choose one small thing you'd like to do more often. We'll take it from there."}
      </p>
      <button
        onClick={onAddHabit}
        className="mt-5 rounded-full bg-[#294B3A] px-5 py-3 text-sm font-medium text-white hover:bg-[#203C2D]"
      >
        + Add a habit
      </button>
    </div>
  );
}
