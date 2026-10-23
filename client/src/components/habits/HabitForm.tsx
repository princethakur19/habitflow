import { useState } from "react";
import type { CreateHabitInput } from "../../types/habit";

type HabitFormProps = {
  saving: boolean;
  error: string;
  onClose: () => void;
  onSubmit: (input: CreateHabitInput) => Promise<boolean>;
};

export default function HabitForm({
  saving,
  error,
  onClose,
  onSubmit,
}: HabitFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Learning");
  const [frequency, setFrequency] = useState<"Daily" | "Weekly">("Daily");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    if (title.trim().length < 2) {
      setFormError("Your habit name must have at least 2 characters.");
      return;
    }

    const created = await onSubmit({
      title: title.trim(),
      description: description.trim(),
      category,
      frequency,
    });

    if (created) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#1D3025]/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="my-auto w-full max-w-lg rounded-[28px] border border-[#E8E6DC] bg-[#FBFAF6] p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#A56D51]">
              Start something good
            </p>
            <h2 className="mt-2 font-serif text-3xl">A new habit</h2>
            <p className="mt-2 text-sm text-[#777D72]">
              Keep it simple. You can always grow from here.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close form"
            className="rounded-full px-3 py-2 text-xl text-[#777D72] hover:bg-[#EDEDE4]"
          >
            ×
          </button>
        </div>

        <label className="mt-7 block text-sm font-medium">
          Habit name
          <input
            autoFocus
            required
            minLength={2}
            maxLength={80}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Read for 20 minutes"
            className="mt-2 w-full rounded-xl border border-[#DFE0D5] bg-white px-4 py-3 text-sm outline-none placeholder:text-[#B0B2A8] focus:border-[#668267] focus:ring-2 focus:ring-[#668267]/15"
          />
        </label>

        <label className="mt-5 block text-sm font-medium">
          A little detail (optional)
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="What does this habit look like for you?"
            rows={3}
            maxLength={300}
            className="mt-2 w-full resize-y rounded-xl border border-[#DFE0D5] bg-white px-4 py-3 text-sm outline-none placeholder:text-[#B0B2A8] focus:border-[#668267] focus:ring-2 focus:ring-[#668267]/15"
          />
        </label>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Category
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-2 w-full rounded-xl border border-[#DFE0D5] bg-white px-3 py-3 text-sm outline-none focus:border-[#668267]"
            >
              <option value="Health">Health</option>
              <option value="Learning">Learning</option>
              <option value="Productivity">Productivity</option>
              <option value="Personal">Personal</option>
            </select>
          </label>

          <label className="block text-sm font-medium">
            Frequency
            <select
              value={frequency}
              onChange={(event) =>
                setFrequency(event.target.value as "Daily" | "Weekly")
              }
              className="mt-2 w-full rounded-xl border border-[#DFE0D5] bg-white px-3 py-3 text-sm outline-none focus:border-[#668267]"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
            </select>
          </label>
        </div>

        {(formError || error) && (
          <p role="alert" className="mt-4 text-sm text-[#A34E43]">
            {formError || error}
          </p>
        )}

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#DFE0D5] px-5 py-3 text-sm font-medium text-[#657064] hover:bg-[#F0F0E8]"
          >
            Maybe later
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-[#294B3A] px-6 py-3 text-sm font-medium text-white hover:bg-[#203C2D] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Create habit"}
          </button>
        </div>
      </form>
    </div>
  );
}
