
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type Habit = {
  _id: string;
  title: string;
  description: string;
  category: string;
  frequency: string;
};

const categories = ["All", "Health", "Learning", "Productivity", "Personal"];

function App() {
  // 1. Data from our backend
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 2. Frontend interaction state
  const [activeCategory, setActiveCategory] = useState("All");
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  // 3. Reference for GSAP animation
  const dashboardRef = useRef<HTMLElement>(null);

  // 4. Fetch real habits from our Express API
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/habits"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch habits");
        }

        const result = await response.json();
        setHabits(result.data);
      } catch {
        setError("Could not load habits. Check your backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  // 5. Animate the dashboard when it loads
  useEffect(() => {
    if (loading || error || !dashboardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".animate-item", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, dashboardRef);

    return () => ctx.revert();
  }, [loading, error]);

  // 6. Filter habits by category
  const filteredHabits =
    activeCategory === "All"
      ? habits
      : habits.filter((habit) => habit.category === activeCategory);

  // 7. Toggle completion in the frontend
  const toggleHabit = (id: string) => {
    setCompletedHabits((current) =>
      current.includes(id)
        ? current.filter((habitId) => habitId !== id)
        : [...current, id]
    );
  };

  const completedCount = habits.filter((habit) =>
    completedHabits.includes(habit._id)
  ).length;

  const progress =
    habits.length === 0
      ? 0
      : Math.round((completedCount / habits.length) * 100);

  return (
    <main
      ref={dashboardRef}
      className="min-h-screen bg-[#0b0b12] text-white md:flex"
    >
      {/* Sidebar */}
      <aside className="border-b border-white/10 bg-[#101019] p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
        <a href="#" className="flex items-center gap-3 text-xl font-bold">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-lg">
            H
          </span>
          HabitFlow
        </a>

        <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          Workspace
        </p>

        <nav className="mt-4 flex gap-2 md:flex-col">
          <a
            href="#dashboard"
            className="rounded-xl bg-violet-500/15 px-4 py-3 text-sm font-medium text-violet-300"
          >
            ◈ Dashboard
          </a>
          <a
            href="#habits"
            className="rounded-xl px-4 py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            ✓ My habits
          </a>
        </nav>

        <div className="mt-10 hidden rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/15 to-indigo-500/5 p-4 md:block">
          <p className="font-semibold">Small steps matter.</p>
          <p className="mt-2 text-sm leading-6 text-gray-400">
            Build consistency one day at a time.
          </p>
          <div className="mt-4 text-3xl">✦</div>
        </div>
      </aside>

      {/* Main dashboard */}
      <section id="dashboard" className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">
        <header className="animate-item flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-400">YOUR PERSONAL WORKSPACE</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              My Dashboard<span className="text-violet-400">.</span>
            </h1>
            <p className="mt-2 text-gray-400">
              Make today count. Every little win adds up.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
            <span className="mr-2 text-violet-400">●</span>
            Your habit journey
          </div>
        </header>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <article className="animate-item rounded-2xl border border-white/10 bg-[#14141f] p-5">
            <p className="text-sm text-gray-400">Total habits</p>
            <div className="mt-4 flex items-end justify-between">
              <h2 className="text-4xl font-bold">{habits.length}</h2>
              <span className="rounded-lg bg-violet-500/15 px-3 py-2 text-violet-300">
                ◈
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Habits in your collection
            </p>
          </article>

          <article className="animate-item rounded-2xl border border-white/10 bg-[#14141f] p-5">
            <p className="text-sm text-gray-400">Completed today</p>
            <div className="mt-4 flex items-end justify-between">
              <h2 className="text-4xl font-bold">{completedCount}</h2>
              <span className="rounded-lg bg-emerald-500/15 px-3 py-2 text-emerald-300">
                ✓
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Out of {habits.length} habits
            </p>
          </article>

          <article className="animate-item rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-600/20 to-[#14141f] p-5 sm:col-span-2 xl:col-span-1">
            <p className="text-sm text-gray-400">Daily progress</p>
            <div className="mt-4 flex items-center gap-4">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(#a78bfa ${progress}%, #302b42 ${progress}% 100%)`,
                }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#171321] text-sm font-bold">
                  {progress}%
                </div>
              </div>
              <div>
                <p className="font-semibold">
                  {progress === 100 ? "Amazing work!" : "Keep going!"}
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Every completed habit counts.
                </p>
              </div>
            </div>
          </article>
        </div>

        {/* Habit list */}
        <section id="habits" className="mt-10">
          <div className="animate-item flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Your habits</h2>
              <p className="mt-2 text-sm text-gray-400">
                Focus on progress, not perfection.
              </p>
            </div>

            <span className="text-sm text-gray-500">
              {filteredHabits.length} shown
            </span>
          </div>

          {/* Category filters */}
          <div className="animate-item mt-6 flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-xl px-4 py-2 text-sm transition ${
                  activeCategory === category
                    ? "bg-violet-600 text-white"
                    : "border border-white/10 bg-white/[0.03] text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {loading && (
            <p className="mt-8 text-gray-400">Loading your habits...</p>
          )}

          {error && (
            <p className="mt-8 rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-red-300">
              {error}
            </p>
          )}

          {!loading && !error && filteredHabits.length === 0 && (
            <div className="animate-item mt-6 rounded-2xl border border-dashed border-white/15 p-10 text-center">
              <div className="text-4xl">✦</div>
              <h3 className="mt-4 text-lg font-semibold">No habits here yet</h3>
              <p className="mt-2 text-sm text-gray-400">
                {habits.length === 0
                  ? "Your habits will appear here once you add one."
                  : "Try selecting another category."}
              </p>
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {filteredHabits.map((habit) => {
              const isCompleted = completedHabits.includes(habit._id);

              return (
                <article
                  key={habit._id}
                  className={`animate-item rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-400/40 ${
                    isCompleted
                      ? "border-emerald-400/20 bg-emerald-500/[0.04]"
                      : "border-white/10 bg-[#14141f]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <span className="text-xs font-medium uppercase tracking-wider text-violet-300">
                        {habit.category}
                      </span>
                      <h3
                        className={`mt-2 break-words text-lg font-semibold ${
                          isCompleted ? "text-gray-400 line-through" : ""
                        }`}
                      >
                        {habit.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-gray-400">
                        {habit.description || "One small step toward your goals."}
                      </p>
                    </div>

                    <button
                      type="button"
                      aria-label={
                        isCompleted
                          ? `Mark ${habit.title} incomplete`
                          : `Mark ${habit.title} complete`
                      }
                      aria-pressed={isCompleted}
                      onClick={() => toggleHabit(habit._id)}
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-lg transition ${
                        isCompleted
                          ? "border-emerald-400 bg-emerald-500 text-white"
                          : "border-white/15 text-gray-400 hover:border-violet-400 hover:text-violet-300"
                      }`}
                    >
                      {isCompleted ? "✓" : "○"}
                    </button>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-sm text-gray-500">
                      ↻ {habit.frequency}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        isCompleted ? "text-emerald-300" : "text-gray-500"
                      }`}
                    >
                      {isCompleted ? "Completed today" : "In progress"}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;
