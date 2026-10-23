import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

import Sidebar from "../components/layout/Sidebar";
import PageHeader from "../components/layout/PageHeader";
import ProgressCard from "../components/dashboard/ProgressCard";
import EmptyState from "../components/dashboard/EmptyState";
import HabitFilters from "../components/habits/HabitFilters";
import HabitList from "../components/habits/HabitList";
import HabitForm from "../components/habits/HabitForm";

import { useHabits } from "../hooks/useHabits";
import type { HabitCategory } from "../types/habit";

export default function Dashboard() {
  const { habits, loading, saving, error, addHabit, refreshHabits } =
    useHabits();

  const [activeCategory, setActiveCategory] =
    useState<HabitCategory>("All habits");
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);

  const dashboardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (loading || error || !dashboardRef.current) return;

    const context = gsap.context(() => {
      gsap.from(".animate-item", {
        y: 16,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: "power2.out",
      });
    }, dashboardRef);

    return () => context.revert();
  }, [loading, error]);

  const filteredHabits = useMemo(
    () =>
      activeCategory === "All habits"
        ? habits
        : habits.filter((habit) => habit.category === activeCategory),
    [habits, activeCategory],
  );

  const completedCount = habits.filter((habit) =>
    completedHabits.includes(habit._id),
  ).length;

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
    }

    return created;
  };

  return (
    <main
      ref={dashboardRef}
      className="min-h-screen bg-[#F7F6F0] font-sans text-[#263B2E]"
    >
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <Sidebar />

        <section
          id="home"
          className="min-w-0 flex-1 px-5 py-6 sm:px-8 lg:px-12 lg:py-10"
        >
          <PageHeader onAddHabit={() => setShowForm(true)} />

          <section className="animate-item mb-9 mt-12 sm:mt-16">
            <p className="mb-4 text-sm font-medium text-[#A56D51]">
              YOUR DAY, YOUR PACE
            </p>
            <h1 className="max-w-3xl font-serif text-4xl leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              A little progress
              <br />
              goes <span className="italic text-[#668267]">a long way.</span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-[#777D72] sm:text-base">
              Build a life you feel good about, one small habit at a time.
              There's no rush. You're right where you need to be.
            </p>
          </section>

          <ProgressCard
            completedCount={completedCount}
            totalCount={habits.length}
          />

          <section id="habits">
            <div className="animate-item mb-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#A56D51]">
                  Your routine
                </p>
                <h2 className="mt-2 font-serif text-3xl">My habits</h2>
              </div>
              <span className="text-sm text-[#858B7E]">
                {habits.length} {habits.length === 1 ? "habit" : "habits"} in
                your list
              </span>
            </div>

            <HabitFilters
              activeCategory={activeCategory}
              onChange={setActiveCategory}
            />

            {loading && (
              <p className="rounded-2xl bg-white p-6 text-sm text-[#777D72]">
                Gathering your habits...
              </p>
            )}

            {!loading && error && (
              <div className="rounded-2xl border border-[#E8C8C1] bg-[#FBEEEA] p-5 text-sm text-[#9B5147]">
                <p>{error}</p>
                <button
                  onClick={() => void refreshHabits()}
                  className="mt-3 font-semibold underline"
                >
                  Try again
                </button>
              </div>
            )}

            {!loading && !error && filteredHabits.length === 0 && (
              <EmptyState
                hasHabits={habits.length > 0}
                onAddHabit={() => setShowForm(true)}
              />
            )}

            {!loading && !error && filteredHabits.length > 0 && (
              <HabitList
                habits={filteredHabits}
                completedHabits={completedHabits}
                onToggle={toggleHabit}
              />
            )}
          </section>

          <footer className="mt-14 border-t border-[#E8E6DC] py-6 text-center text-xs text-[#92978A]">
            Made for real life, not perfect days.{" "}
            <span className="text-[#C77960]">♥</span>
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
