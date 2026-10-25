import { useEffect, useRef } from "react";
import gsap from "gsap";

type ProgressCardProps = {
  completed: number;
  total: number;
  dateLabel: string;
};

export default function ProgressCard({
  completed,
  total,
  dateLabel,
}: ProgressCardProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const progress = total > 0
    ? Math.round((completed / total) * 100)
    : 0;

  useEffect(() => {
    if (!numberRef.current) return;

    gsap.fromTo(
      numberRef.current,
      { scale: 0.88, y: 4 },
      {
        scale: 1,
        y: 0,
        duration: 0.35,
        ease: "back.out(2)",
      },
    );
  }, [progress]);

  return (
    <section className="rounded-2xl border border-white/[0.07] bg-[#111827] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold">Daily progress</h2>
          <p className="mt-1 text-xs text-[#9CA3AF]">{dateLabel}</p>
        </div>
        <span className="rounded-lg bg-[#10B981]/10 px-2.5 py-1.5 text-xs text-[#10B981]">
          {total > 0 ? `${completed}/${total}` : "No habits"}
        </span>
      </div>

      <div className="mt-6 flex items-center gap-5">
        <div
          className="grid h-24 w-24 shrink-0 place-items-center rounded-full"
          style={{
            background: `conic-gradient(#10B981 ${progress}%, #263244 ${progress}% 100%)`,
          }}
          role="img"
          aria-label={`${progress}% of habits completed`}
        >
          <div className="grid h-[76px] w-[76px] place-items-center rounded-full bg-[#111827]">
            <span
              ref={numberRef}
              className="text-2xl font-semibold tabular-nums"
            >
              {progress}%
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium">
            {total === 0
              ? "Start with one habit."
              : progress === 100
                ? "Everything checked off."
                : progress >= 50
                  ? "You're making progress."
                  : "Every step counts."}
          </p>
          <p className="mt-2 text-xs leading-5 text-[#9CA3AF]">
            {completed} of {total} habits completed.
          </p>
        </div>
      </div>

      <div
        className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#263244]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div
          className="h-full rounded-full bg-[#10B981] transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
}
