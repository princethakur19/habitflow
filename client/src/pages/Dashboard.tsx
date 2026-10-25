import { useEffect, useMemo, useState } from "react";
import gsap from "gsap";

import Sidebar from "../components/layout/Sidebar";
import PageHeader from "../components/layout/PageHeader";
import EmptyState from "../components/dashboard/EmptyState";
import DateStrip from "../components/dashboard/DateStrip";
import ProgressCard from "../components/dashboard/ProgressCard";

import HabitFilters from "../components/habits/HabitFilters";
import HabitList from "../components/habits/HabitList";
import HabitForm from "../components/habits/HabitForm";

import { useHabits } from "../hooks/useHabits";
import type { HabitCategory } from "../types/habit";
import { createWeekDates, dateKey, parseDateKey } from "../utils/dateUtils";

type CompletionHistory = Record<string, string[]>;

const STORAGE_KEY = "habitflow-completions";

function readHistory(): CompletionHistory {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return {};

    const parsed: unknown = JSON.parse(saved);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }

    const history: CompletionHistory = {};

    for (const [key, value] of Object.entries(parsed)) {
      if (
        /^\d{4}-\d{2}-\d{2}$/.test(key) &&
        Array.isArray(value) &&
        value.every((id) => typeof id === "string")
      ) {
        history[key] = [...new Set(value)];
      }
    }

    return history;
  } catch {
    return {};
  }
}

const categories: HabitCategory[] = [
  "All habits",
  "Health",
  "Learning",
  "Productivity",
  "Personal",
];

export default function Dashboard() {
  const { habits, loading, saving, error, addHabit, refreshHabits } =
    useHabits();

  const [history, setHistory] = useState<CompletionHistory>(readHistory);
  const [selectedDate, setSelectedDate] = useState(() => dateKey(new Date()));
  const [activeCategory, setActiveCategory] =
    useState<HabitCategory>("All habits");
  const [search, setSearch] = useState("");
  const [focusMode, setFocusMode] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const weekDates = useMemo(() => createWeekDates(), []);
  const todayKey = dateKey(new Date());
  const selectedCompletions = history[selectedDate] ?? [];

  const dateLabel = parseDateKey(selectedDate).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const completedCount = habits.filter((habit) =>
    selectedCompletions.includes(habit._id),
  ).length;

  const completionCounts = useMemo(() => {
    const result: Record<string, number> = {};

    for (const day of weekDates) {
      result[day.key] = (history[day.key] ?? []).filter((id) =>
        habits.some((habit) => habit._id === id),
      ).length;
    }

    return result;
  }, [history, habits, weekDates]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (storageError) {
      console.error("Could not save completion history:", storageError);
    }
  }, [history]);

  const filteredHabits = useMemo(() => {
    const query = search.trim().toLowerCase();

    return habits.filter((habit) => {
      const matchesCategory =
        activeCategory === "All habits" || habit.category === activeCategory;

      const matchesSearch =
        habit.title.toLowerCase().includes(query) ||
        (habit.description ?? "").toLowerCase().includes(query);

      const matchesFocus =
        !focusMode || !selectedCompletions.includes(habit._id);

      return matchesCategory && matchesSearch && matchesFocus;
    });
  }, [habits, activeCategory, search, focusMode, selectedCompletions]);

  const toggleHabit = (id: string) => {
    if (selectedDate > todayKey) return;

    setHistory((current) => {
      const existing = current[selectedDate] ?? [];
      const updated = existing.includes(id)
        ? existing.filter((habitId) => habitId !== id)
        : [...existing, id];

      return { ...current, [selectedDate]: updated };
    });
  };

  const handleAddHabit = async (
    input: Parameters<typeof addHabit>[0],
  ): Promise<boolean> => {
    const created = await addHabit(input);

    if (created) {
      setShowForm(false);
      setActiveCategory("All habits");
      setSearch("");
    }

    return created;
  };

  return (
    <main className="min-h-screen bg-[#0A0F1D] font-sans text-[#F9FAFB]">
      <div className="mx-auto flex min-h-screen max-w-[1700px]">
        <Sidebar />

        <section
          id="home"
          className="min-w-0 flex-1 px-5 py-5 sm:px-8 lg:px-10"
        >
          <PageHeader onAddHabit={() => setShowForm(true)} />

          <header className="mb-7 mt-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-[#9CA3AF]">
                HabitFlow / Personal space
              </p>
              <p className="mt-1 text-xs text-[#6B7280]">
                A better rhythm starts here.
              </p>
              <p className="mt-7 text-sm text-[#9CA3AF]">{dateLabel}</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Make room for <span className="text-[#C5F36B]">growth.</span>
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#9CA3AF]">
                Small actions, repeated with care, can change everything.
              </p>
            </div>

            <button
              type="button"
              aria-pressed={focusMode}
              onClick={() => setFocusMode((value) => !value)}
              className={`rounded-xl border px-4 py-3 text-sm transition ${
                focusMode
                  ? "border-[#C5F36B] bg-[#C5F36B] text-[#0A0F1D]"
                  : "border-white/10 bg-[#111827] text-[#D1D5DB] hover:border-white/20"
              }`}
            >
              {focusMode ? "✓ Focus mode on" : "◎ Enter focus mode"}
            </button>
          </header>

          <DateStrip
            days={weekDates}
            selectedDate={selectedDate}
            onSelect={setSelectedDate}
            completionCounts={completionCounts}
          />

          <div className="mt-5 grid items-start gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.9fr)]">
            <div className="min-w-0">
              <section className="grid gap-3 sm:grid-cols-2">
                <article className="rounded-2xl border border-white/[0.07] bg-[#111827] p-5">
                  <p className="text-sm text-[#9CA3AF]">Your habits</p>
                  <p className="mt-4 text-3xl font-semibold tabular-nums">
                    {String(habits.length).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-xs text-[#6B7280]">
                    Habits in your collection
                  </p>
                </article>

                <article className="rounded-2xl border border-white/[0.07] bg-[#111827] p-5">
                  <p className="text-sm text-[#9CA3AF]">Completed that day</p>
                  <p className="mt-4 text-3xl font-semibold tabular-nums">
                    {String(completedCount).padStart(2, "0")}
                    <span className="ml-2 text-sm font-normal text-[#6B7280]">
                      / {habits.length}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-[#6B7280]">
                    {habits.length - completedCount} still to go
                  </p>
                </article>
              </section>

              <section id="habits" className="mt-7 scroll-mt-6">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#10B981]">
                      Daily queue
                    </p>
                    <h2 className="mt-2 text-xl font-semibold">
                      {selectedDate === todayKey
                        ? "Today's habits"
                        : "Habits for this day"}
                    </h2>
                    <p className="mt-1 text-sm text-[#9CA3AF]">
                      Focus on progress, not perfection.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="rounded-xl bg-[#C5F36B] px-4 py-2.5 text-sm font-semibold text-[#0A0F1D] transition hover:brightness-105 active:scale-[0.98]"
                  >
                    + New habit
                  </button>
                </div>

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search habits or descriptions..."
                  aria-label="Search habits"
                  className="mt-5 w-full rounded-xl border border-white/[0.07] bg-[#111827] px-4 py-3.5 text-sm outline-none placeholder:text-[#6B7280] focus:border-[#C5F36B]/60"
                />

                <div className="mt-4">
                  <HabitFilters
                    activeCategory={activeCategory}
                    onChange={setActiveCategory}
                  />
                </div>

                {selectedDate > todayKey && (
                  <p className="mt-4 rounded-xl border border-indigo-400/20 bg-indigo-400/10 p-3 text-xs text-indigo-200">
                    This is a future date. You can review your habits, but you
                    cannot mark them complete yet.
                  </p>
                )}

                {loading && (
                  <p className="mt-5 text-sm text-[#9CA3AF]">
                    Loading your habits...
                  </p>
                )}

                {!loading && error && (
                  <div
                    role="alert"
                    className="mt-5 rounded-xl bg-rose-400/10 p-4 text-sm text-rose-200"
                  >
                    <p>{error}</p>
                    <button
                      type="button"
                      onClick={() => void refreshHabits()}
                      className="mt-2 underline"
                    >
                      Try again
                    </button>
                  </div>
                )}

                {!loading && !error && filteredHabits.length === 0 && (
                  <div className="mt-5">
                    <EmptyState
                      hasHabits={habits.length > 0}
                      onAddHabit={() => setShowForm(true)}
                    />
                  </div>
                )}

                {!loading && !error && filteredHabits.length > 0 && (
                  <div className="mt-4">
                    <HabitList
                      habits={filteredHabits}
                      completedHabits={selectedCompletions}
                      onToggle={toggleHabit}
                    />
                  </div>
                )}
              </section>
            </div>

            <aside className="space-y-4">
              <ProgressCard
                completed={completedCount}
                total={habits.length}
                dateLabel={dateLabel}
              />

              <section id="progress" className="rounded-2xl border border-white/[0.07] bg-[#111827] p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-semibold">Weekly activity</h2>
                    <p className="mt-1 text-xs text-[#9CA3AF]">
                      Your completed habits, day by day
                    </p>
                  </div>

                  <span className="rounded-lg bg-[#10B981]/10 px-2 py-1 text-xs text-[#10B981]">
                    {weekDates.reduce(
                      (sum, day) => sum + (completionCounts[day.key] ?? 0),
                      0,
                    )}{" "}
                    total
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-7 gap-2">
                  {weekDates.map((day) => {
                    const count = completionCounts[day.key] ?? 0;
                    const ratio = habits.length > 0 ? count / habits.length : 0;
                    const isSelected = selectedDate === day.key;

                    return (
                      <button
                        key={day.key}
                        type="button"
                        onClick={() => setSelectedDate(day.key)}
                        aria-pressed={isSelected}
                        aria-label={`${day.label}, ${day.dayNumber}: ${count} of ${habits.length} habits completed`}
                        title={`${day.label} ${day.dayNumber}: ${count}/${habits.length} completed`}
                        className={`group flex min-w-0 flex-col items-center rounded-xl border px-1.5 py-3 transition-all duration-200 hover:-translate-y-0.5 ${
                          isSelected
                            ? "border-[#C5F36B] bg-[#C5F36B]/10"
                            : "`border-white/[0.06]` bg-[#0A0F1D] hover:border-white/20"
                        }`}
                      >
                        <span className="text-[10px] text-[#9CA3AF]">
                          {day.label}
                        </span>

                        <span
                          className={`mt-1 text-sm font-semibold tabular-nums ${
                            isSelected ? "text-[#C5F36B]" : "text-[#F9FAFB]"
                          }`}
                        >
                          {day.dayNumber}
                        </span>

                        <div className="mt-3 flex h-10 w-full max-w-7 flex-col justify-end overflow-hidden rounded-md bg-[#263244]">
                          <div
                            className="w-full rounded-md bg-[#10B981] transition-[height] duration-500"
                            style={{
                              height: `${ratio * 100}%`,
                              minHeight: count > 0 ? "4px" : "0px",
                            }}
                          />
                        </div>

                        <span className="mt-2 text-[10px] tabular-nums text-[#9CA3AF]">
                          {count}/{habits.length}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-3">
                  <p className="text-xs leading-5 text-[#9CA3AF]">
                    {habits.length === 0
                      ? "Create a habit to start tracking your activity."
                      : weekDates.some(
                            (day) => (completionCounts[day.key] ?? 0) > 0,
                          )
                        ? "Your activity grows with every completed habit."
                        : "No completions recorded this week yet. Start with one small win."}
                  </p>

                  <span className="shrink-0 text-[10px] text-[#6B7280]">
                    {habits.length > 0 ? "Daily completion" : "No data"}
                  </span>
                </div>
              </section>

              <section className="rounded-2xl border border-[#F59E0B]/15 `bg-gradient-to-br` `from-[#F59E0B]/[0.08]` to-[#111827] p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#F59E0B]">
                  A note to yourself
                </p>
                <p className="mt-3 text-sm leading-6 text-[#D1D5DB]">
                  You don't need to do everything today. Pick one meaningful
                  action and give it your attention.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("habits")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  }
                  className="mt-4 text-xs font-semibold text-[#F59E0B] hover:text-amber-300"
                >
                  Find your next step ↗
                </button>
              </section>
            </aside>
          </div>

          <footer className="mt-12 border-t `border-white/[0.06]` py-5 text-center text-xs text-[#6B7280]">
            Built for real life, one habit at a time.
          </footer>
        </section>
      </div>

      {showForm && (
        <HabitForm
          saving={saving}
          error={error}
          onClose={() => setShowForm(false)}
          onSubmit={handleAddHabit}
        />
      )}
    </main>
  );
}
