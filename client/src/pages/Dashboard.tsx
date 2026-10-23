import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

import Sidebar from "../components/layout/Sidebar";
import PageHeader from "../components/layout/PageHeader";

import EmptyState from "../components/dashboard/EmptyState";
import HabitFilters from "../components/habits/HabitFilters";
import HabitList from "../components/habits/HabitList";
import HabitForm from "../components/habits/HabitForm";

import { useHabits } from "../hooks/useHabits";
import type { HabitCategory } from "../types/habit";

const weekDays = [
  { label: "M", name: "Mon" },
  { label: "T", name: "Tue" },
  { label: "W", name: "Wed" },
  { label: "T", name: "Thu" },
  { label: "F", name: "Fri" },
  { label: "S", name: "Sat" },
  { label: "S", name: "Sun" },
];

export default function Dashboard() {
  const { habits, loading, saving, error, addHabit, refreshHabits } =
    useHabits();

  const [activeCategory, setActiveCategory] =
    useState<HabitCategory>("All habits");
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [focusMode, setFocusMode] = useState(false);

  const dashboardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (loading || error || !dashboardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".animate-item", {
        y: 14,
        opacity: 0,
        duration: 0.45,
        stagger: 0.06,
        ease: "power2.out",
      });
    }, dashboardRef);

    return () => ctx.revert();
  }, [loading, error]);

  const filteredHabits = useMemo(() => {
    return habits.filter((habit) => {
      const matchesCategory =
        activeCategory === "All habits" || habit.category === activeCategory;

      const matchesSearch =
        habit.title.toLowerCase().includes(search.toLowerCase()) ||
        (habit.description ?? "").toLowerCase().includes(search.toLowerCase());

      const matchesFocus = !focusMode || !completedHabits.includes(habit._id);

      return matchesCategory && matchesSearch && matchesFocus;
    });
  }, [habits, activeCategory, search, focusMode, completedHabits]);

  const completedCount = habits.filter((habit) =>
    completedHabits.includes(habit._id),
  ).length;

  const progress =
    habits.length === 0
      ? 0
      : Math.round((completedCount / habits.length) * 100);

  const toggleHabit = (id: string) => {
    setCompletedHabits((current) =>
      current.includes(id)
        ? current.filter((habitId) => habitId !== id)
        : [...current, id],
    );
  };

  const handleAddHabit = async (
    input: Parameters<typeof addHabit>[0],
  ): Promise<boolean> => {
    const created = await addHabit(input);

    if (created) {
      setActiveCategory("All habits");
      setSearch("");
      setFocusMode(false);
    }

    return created;
  };

  const today = new Date();
  const todayLabel = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const todayIndex = (today.getDay() + 6) % 7;

  return (
    <main
      ref={dashboardRef}
      className="min-h-screen bg-[#0B0E0C] font-sans text-[#F0F3EC]"
    >
      <div className="mx-auto flex min-h-screen max-w-[1700px]">
        <Sidebar />

        <section
          id="home"
          className="min-w-0 flex-1 px-5 py-6 sm:px-8 lg:px-10"
        >
          <PageHeader onAddHabit={() => setShowForm(true)} />

          {/* Greeting */}
          <header className="animate-item mb-8 mt-10 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-sm text-[#9BA69A]">{todayLabel}</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
                Make room for
                <span className="text-[#C5F36B]"> growth.</span>
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#9BA69A]">
                Small actions, repeated with care, can change everything. Let's
                make today count.
              </p>
            </div>

            <button
              onClick={() => setFocusMode((current) => !current)}
              className={`rounded-2xl border px-4 py-3 text-sm transition ${
                focusMode
                  ? "border-[#C5F36B]/50 bg-[#C5F36B] text-[#11170D]"
                  : "border-white/10 bg-[#141915] text-[#D9E0D5] hover:border-[#C5F36B]/40"
              }`}
            >
              {focusMode ? "✓ Focus mode on" : "◉ Enter focus mode"}
            </button>
          </header>

          {/* Main metrics */}
          <section className="animate-item grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <article className="rounded-3xl border border-white/[0.07] bg-[#131814] p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#9BA69A]">Your habits</p>
                <span className="rounded-xl bg-white/[0.06] px-3 py-2 text-sm">
                  ↗
                </span>
              </div>
              <p className="mt-5 text-4xl font-semibold tracking-tight">
                {habits.length.toString().padStart(2, "0")}
              </p>
              <p className="mt-2 text-xs text-[#788478]">
                Little commitments you've made
              </p>
            </article>

            <article className="rounded-3xl border border-white/[0.07] bg-[#131814] p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#9BA69A]">Completed today</p>
                <span className="rounded-xl bg-[#C5F36B]/10 px-3 py-2 text-sm text-[#C5F36B]">
                  ✓
                </span>
              </div>
              <p className="mt-5 text-4xl font-semibold tracking-tight">
                {completedCount.toString().padStart(2, "0")}
                <span className="ml-2 text-base font-normal text-[#788478]">
                  / {habits.length}
                </span>
              </p>
              <p className="mt-2 text-xs text-[#788478]">
                Every completed habit is a win
              </p>
            </article>

            <article className="rounded-3xl border border-[#C5F36B]/20 bg-[#C5F36B] p-5 text-[#17200F] sm:col-span-2 xl:col-span-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-[#34452A]">
                  Daily momentum
                </p>
                <span className="text-lg">✳</span>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-4xl font-semibold">{progress}%</p>
                  <p className="mt-2 text-xs text-[#465638]">
                    {progress === 100 && habits.length > 0
                      ? "You showed up. That's what matters."
                      : "Keep moving at your own pace."}
                  </p>
                </div>
                <div className="h-2 w-24 overflow-hidden rounded-full bg-[#A5CF4E]">
                  <div
                    className="h-full rounded-full bg-[#17200F] transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </article>
          </section>

          {/* Weekly overview */}
          <section
            id="progress"
            className="animate-item mt-5 grid gap-4 lg:grid-cols-[1.5fr_1fr]"
          >
            <article className="rounded-3xl border border-white/[0.07] bg-[#131814] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-semibold">Your week</h2>
                  <p className="mt-1 text-xs text-[#788478]">
                    A little consistency goes a long way
                  </p>
                </div>
                <span className="text-xs text-[#C5F36B]">THIS WEEK</span>
              </div>

              <div className="mt-6 grid grid-cols-7 gap-2">
                {weekDays.map((day, index) => (
                  <div
                    key={day.name}
                    className="flex flex-col items-center gap-3"
                  >
                    <span className="text-xs text-[#788478]">{day.name}</span>
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs transition sm:h-11 sm:w-11 ${
                        index === todayIndex
                          ? "bg-[#C5F36B] font-bold text-[#17200F] ring-4 ring-[#C5F36B]/10"
                          : "bg-white/[0.04] text-[#7D897C]"
                      }`}
                    >
                      {index === todayIndex ? "●" : "·"}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs leading-5 text-[#788478]">
                Your activity history will become available when daily
                completion records are saved in the backend.
              </p>
            </article>

            <article className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#171D17] p-5 sm:p-6">
              <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-[#C5F36B]/10 blur-3xl" />
              <p className="relative text-xs font-medium uppercase tracking-[0.16em] text-[#C5F36B]">
                A thought for today
              </p>
              <h2 className="relative mt-5 max-w-xs text-2xl font-medium leading-snug">
                You don't have to do everything. Just the next thing.
              </h2>
              <p className="relative mt-4 text-sm text-[#9BA69A]">
                Pick one habit. Give it your attention. Start there.
              </p>
              <button
                onClick={() => {
                  setFocusMode(true);
                  document
                    .getElementById("habits")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="relative mt-6 rounded-xl bg-white/[0.07] px-4 py-3 text-sm transition hover:bg-white/[0.12]"
              >
                Find my next step ↗
              </button>
            </article>
          </section>

          {/* Habit collection */}
          <section id="habits" className="mt-10 scroll-mt-8">
            <div className="animate-item flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#C5F36B]">
                  Build your rhythm
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Today's habits</h2>
                <p className="mt-2 text-sm text-[#788478]">
                  Focus on progress, not perfection.
                </p>
              </div>

              <button
                onClick={() => setShowForm(true)}
                className="rounded-xl bg-[#C5F36B] px-4 py-3 text-sm font-semibold text-[#17200F] transition hover:bg-[#D4FA89]"
              >
                + Add a habit
              </button>
            </div>

            <div className="animate-item mt-6 flex flex-col gap-3 sm:flex-row">
              <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#131814] px-4">
                <span className="text-lg text-[#788478]">⌕</span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search habits or descriptions..."
                  aria-label="Search habits"
                  className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-[#697568]"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="text-xs text-[#9BA69A] hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>

              <span className="self-center text-xs text-[#788478]">
                {filteredHabits.length} result
                {filteredHabits.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="mt-4">
              <HabitFilters
                activeCategory={activeCategory}
                onChange={setActiveCategory}
              />
            </div>

            {loading && (
              <p className="mt-6 rounded-2xl bg-[#131814] p-6 text-sm text-[#9BA69A]">
                Preparing your space...
              </p>
            )}

            {!loading && error && (
              <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-500/10 p-5 text-sm text-red-200">
                <p>{error}</p>
                <button
                  onClick={() => void refreshHabits()}
                  className="mt-3 underline"
                >
                  Try again
                </button>
              </div>
            )}

            {!loading && !error && filteredHabits.length === 0 && (
              <div className="mt-6">
                <EmptyState
                  hasHabits={habits.length > 0}
                  onAddHabit={() => setShowForm(true)}
                />
              </div>
            )}

            {!loading && !error && filteredHabits.length > 0 && (
              <div className="mt-5">
                <HabitList
                  habits={filteredHabits}
                  completedHabits={completedHabits}
                  onToggle={toggleHabit}
                />
              </div>
            )}
          </section>

          <footer className="mt-12 border-t border-white/[0.07] py-6 text-center text-xs text-[#687568]">
            Made for growth, built for real life.{" "}
            <span className="text-[#C5F36B]">✳</span>
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
