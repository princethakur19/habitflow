type PageHeaderProps = {
  onAddHabit: () => void;
};

export default function PageHeader({ onAddHabit }: PageHeaderProps) {
  return (
    <header className="animate-item flex items-center justify-between gap-4">
      <div>
        <p className="text-xs font-medium text-[#858B7E] md:text-sm">
          Your personal space
        </p>
        <p className="mt-1 text-sm text-[#858B7E]">
          A fresh start, one day at a time.
        </p>
      </div>

      <button
        onClick={onAddHabit}
        className="rounded-full bg-[#294B3A] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#203C2D]"
      >
        + <span className="hidden sm:inline">New habit</span>
        <span className="sm:hidden">Add</span>
      </button>
    </header>
  );
}
