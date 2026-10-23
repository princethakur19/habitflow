type PageHeaderProps = {
  onAddHabit: () => void;
};

export default function PageHeader({ onAddHabit }: PageHeaderProps) {
  return (
    <header className="animate-item flex items-center justify-between gap-4 border-b border-white/[0.07] pb-5">
      <div>
        <p className="text-xs font-medium text-[#899588]">
          HABITFLOW / PERSONAL SPACE
        </p>
        <p className="mt-1 text-xs text-[#687568]">
          A better rhythm starts here.
        </p>
      </div>

      <button
        onClick={onAddHabit}
        className="rounded-xl bg-[#C5F36B] px-4 py-3 text-sm font-semibold text-[#17200F] transition hover:bg-[#D4FA89] active:scale-[0.98]"
      >
        + <span className="hidden sm:inline">New habit</span>
        <span className="sm:hidden">Add</span>
      </button>
    </header>
  );
}
