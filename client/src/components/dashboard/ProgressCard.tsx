type ProgressCardProps = {
  completedCount: number;
  totalCount: number;
};

export default function ProgressCard({
  completedCount,
  totalCount,
}: ProgressCardProps) {
  const progress =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <section
      id="progress"
      className="animate-item mb-10 grid gap-5 rounded-[28px] border border-[#E8E6DC] bg-white p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center"
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#92978A]">
          Today's little wins
        </p>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-serif text-4xl">{completedCount}</span>
          <span className="text-sm text-[#858B7E]">
            of {totalCount} habits completed
          </span>
        </div>

        <div className="mt-5 h-2 max-w-lg overflow-hidden rounded-full bg-[#EDF0E8]">
          <div
            className="h-full rounded-full bg-[#668267] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-3 text-xs text-[#858B7E]">
          {totalCount === 0
            ? "Your first habit is waiting for you."
            : progress === 100
              ? "Beautiful work. You showed up for yourself today!"
              : "Every checkmark is a promise you kept to yourself."}
        </p>
      </div>

      <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-[5px] border-[#E4EBDD] bg-[#F5F7F1]">
        <span className="font-serif text-2xl">{progress}%</span>
        <span className="text-[9px] uppercase tracking-widest text-[#858B7E]">
          complete
        </span>
      </div>
    </section>
  );
}
