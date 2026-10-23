export default function Sidebar() {
  return (
    <aside className="hidden w-\[245px\] shrink-0 flex-col border-r border-[#E8E6DC] bg-[#F3F2EA] px-6 py-8 md:flex">
      <a href="#home" className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#294B3A] text-xl text-white">
          h
        </span>
        <span className="text-xl font-semibold tracking-tight">
          habitflow<span className="text-[#C77960]">.</span>
        </span>
      </a>

      <p className="mb-3 mt-12 text-[10px] font-bold uppercase tracking-[0.2em] text-[#92978A]">
        Your space
      </p>

      <nav className="space-y-2">
        <a
          href="#home"
          className="block rounded-xl bg-[#E4E8DD] px-4 py-3 text-sm font-semibold text-[#294B3A]"
        >
          ◷ &nbsp; My day
        </a>
        <a
          href="#habits"
          className="block rounded-xl px-4 py-3 text-sm text-[#737A70] hover:bg-white"
        >
          ☷ &nbsp; My habits
        </a>
        <a
          href="#progress"
          className="block rounded-xl px-4 py-3 text-sm text-[#737A70] hover:bg-white"
        >
          ↗ &nbsp; My progress
        </a>
      </nav>

      <div className="mt-auto rounded-2xl bg-[#E8E9DF] p-5">
        <span className="text-2xl">🌱</span>
        <p className="mt-3 font-serif text-lg">Small steps count.</p>
        <p className="mt-2 text-xs leading-5 text-[#737A70]">
          You don't need a perfect day. Just one small step in the right
          direction.
        </p>
      </div>

      <p className="mt-6 text-xs text-[#92978A]">A little better, daily.</p>
    </aside>
  );
}
