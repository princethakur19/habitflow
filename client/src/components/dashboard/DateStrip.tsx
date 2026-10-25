import { useRef } from "react";
import type { CalendarDay } from "../../utils/dateUtils";

type DateStripProps = {
  days: CalendarDay[];
  selectedDate: string;
  onSelect: (dateKey: string) => void;
  completionCounts: Record<string, number>;
};

export default function DateStrip({
  days,
  selectedDate,
  onSelect,
  completionCounts,
}: DateStripProps) {
  const stripRef = useRef<HTMLDivElement>(null);

  return (
    <section className="rounded-2xl border border-white/[0.07] bg-[#111827] p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold">Your week</h2>
          <p className="mt-1 text-xs text-[#9CA3AF]">
            Select a day to review your habits
          </p>
        </div>

        <div className="flex gap-2">
          {([-1, 1] as const).map((direction) => (
            <button
              key={direction}
              type="button"
              aria-label={direction === -1 ? "Scroll dates left" : "Scroll dates right"}
              onClick={() =>
                stripRef.current?.scrollBy({
                  left: direction * 250,
                  behavior: "smooth",
                })
              }
              className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-[#9CA3AF] transition hover:border-white/25 hover:text-white"
            >
              {direction === -1 ? "‹" : "›"}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={stripRef}
        className="flex gap-2 overflow-x-auto pb-2"
      >
        {days.map((day) => {
          const selected = selectedDate === day.key;
          const count = completionCounts[day.key] ?? 0;

          return (
            <button
              key={day.key}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(day.key)}
              className={`flex min-w-[58px] flex-1 flex-col items-center gap-2 rounded-xl border px-2 py-3 transition duration-200 hover:-translate-y-0.5 ${
                selected
                  ? "border-[#C5F36B] bg-[#C5F36B] text-[#0A0F1D]"
                  : "border-white/[0.06] bg-[#0A0F1D] text-[#9CA3AF] hover:border-white/20"
              }`}
            >
              <span className="text-[11px] font-medium">{day.label}</span>
              <span className="text-lg font-semibold tabular-nums">
                {day.dayNumber}
              </span>
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  count > 0
                    ? selected
                      ? "bg-[#0A0F1D]"
                      : "bg-[#10B981]"
                    : day.isToday
                      ? selected
                        ? "bg-[#0A0F1D]/50"
                        : "bg-[#F59E0B]"
                      : "bg-transparent"
                }`}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
