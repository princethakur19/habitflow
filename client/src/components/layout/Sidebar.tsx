
import { useEffect, useState } from "react";

const navItems = [
  { label: "Overview", href: "#home", icon: "◈" },
  { label: "My habits", href: "#habits", icon: "☷" },
  { label: "My progress", href: "#progress", icon: "↗" },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState(
    window.location.hash || "#home",
  );

  useEffect(() => {
    const handleHashChange = () => {
      setActiveSection(window.location.hash || "#home");
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-white/[0.06] bg-[#0D120F] px-3 py-5 sm:w-60 lg:w-64">
      {/* Logo */}
      <a
        href="#home"
        onClick={() => setActiveSection("#home")}
        className="flex items-center gap-3 px-1"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C5F36B] text-xl font-bold text-[#17200F]">
          h
        </span>

        <span className="text-lg font-semibold tracking-tight text-white">
          habitflow<span className="text-[#C5F36B]">.</span>
        </span>
      </a>

      {/* Navigation heading */}
      <p className="mb-3 mt-12 px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#697568]">
        Your workspace
      </p>

      {/* Navigation links */}
      <nav className="space-y-2" aria-label="Main navigation">
        {navItems.map((item) => {
          const isActive = activeSection === item.href;

          return (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setActiveSection(item.href)}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors duration-200 ${
                isActive
                  ? "bg-[#C5F36B]/10 font-medium text-[#C5F36B]"
                  : "text-[#9BA69A] hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <span aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      {/* Encouragement card */}
      <div className="mt-auto rounded-2xl border border-white/[0.07] bg-[#151B15] p-4">
        <span className="text-2xl" aria-hidden="true">
          🌱
        </span>

        <p className="mt-3 font-medium text-white">
          Small steps matter.
        </p>

        <p className="mt-2 text-xs leading-5 text-[#899588]">
          Progress isn't about doing everything. It's about returning to what
          matters.
        </p>
      </div>

      <p className="mt-5 text-xs text-[#687568]">
        Made for real life.
      </p>
    </aside>
  );
}
