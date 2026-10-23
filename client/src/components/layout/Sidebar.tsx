export default function Sidebar() {
  return (
    <aside className="hidden w-\[235px\] shrink-0 flex-col border-r border-white/[0.07] bg-[#0D110E] px-5 py-7 md:flex">
      <a href="#home" className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C5F36B] text-xl font-bold text-[#17200F]">
          h
        </span>
        <span className="text-lg font-semibold tracking-tight">
          habitflow<span className="text-[#C5F36B]">.</span>
        </span>
      </a>

      <p className="mb-3 mt-12 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#697568]">
        Your workspace
      </p>

      <nav className="space-y-2">
        <a
          href="#home"
          className="block rounded-xl bg-[#C5F36B]/10 px-4 py-3 text-sm font-medium text-[#C5F36B]"
        >
          ◈ &nbsp; Overview
        </a>
        <a
          href="#habits"
          className="block rounded-xl px-4 py-3 text-sm text-[#9BA69A] transition `hover:bg-white/[0.05]` hover:text-white"
        >
          ☷ &nbsp; My habits
        </a>
        <a
          href="#progress"
          className="block rounded-xl px-4 py-3 text-sm text-[#9BA69A] transition `hover:bg-white/[0.05]` hover:text-white"
        >
          ↗ &nbsp; My progress
        </a>
      </nav>

      <div className="mt-auto rounded-2xl border border-white/[0.07] bg-[#151B15] p-4">
        <span className="text-2xl">🌱</span>
        <p className="mt-3 font-medium">Small steps matter.</p>
        <p className="mt-2 text-xs leading-5 text-[#899588]">
          Progress isn't about doing everything. It's about returning to what
          matters.
        </p>
      </div>

      <p className="mt-5 text-xs text-[#687568]">Made for real life.</p>
    </aside>
  );
}
