type EmptyStateProps = {
  hasHabits: boolean;
  onAddHabit: () => void;
};

export default function EmptyState({
  hasHabits,
  onAddHabit,
}: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-white/15 bg-[#131814] px-6 py-12 text-center">
      <span className="text-3xl">✳</span>
      <h3 className="mt-4 text-xl font-semibold">
        {hasHabits ? "No matches this time." : "Start with one small thing."}
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#899588]">
        {hasHabits
          ? "Try a different category or search term."
          : "Choose a habit that matters to you. You can build on it as you go."}
      </p>
      {!hasHabits && (
        <button
          onClick={onAddHabit}
          className="mt-5 rounded-xl bg-[#C5F36B] px-5 py-3 text-sm font-semibold text-[#17200F] hover:bg-[#D4FA89]"
        >
          + Create your first habit
        </button>
      )}
    </div>
  );
}
