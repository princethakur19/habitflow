
import { useState, type FormEvent } from "react";
import type { CreateHabitInput } from "../../types/habit";

type HabitFormProps = {
  saving: boolean;
  error: string;
  onClose: () => void;
  onSubmit: (input: CreateHabitInput) => Promise<boolean>;
};

const fieldClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-[#111611] px-4 py-3 text-sm text-[#F0F3EC] outline-none transition placeholder:text-[#687568] focus:border-[#C5F36B] focus:ring-2 focus:ring-[#C5F36B]/10";

const labelClass = "block text-sm font-medium text-[#D9E0D5]";

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    if (title.trim().length < 2) {
      setFormError("Please enter at least 2 characters for your habit name.");
      return;
    }

    const created = await onSubmit({
      title: title.trim(),
      description: description.trim(),
      category,
      frequency,
    });

    if (created) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) onClose();
      }}
    >
      <form
        onSubmit={handleSubmit}
        aria-labelledby="habit-form-title"
        className="my-auto w-full max-w-[520px] rounded-3xl border border-white/10 bg-[#151A15] p-5 text-[#F0F3EC] shadow-2xl shadow-black/40 sm:p-7"
      >
        {/* Modal heading */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C5F36B]">
              Build your rhythm
            </p>

            <h2
              id="habit-form-title"
              className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Create a habit<span className="text-[#C5F36B]">.</span>
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#9BA69A]">
              Start small. Make it something that matters to you.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Close create habit form"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 text-xl text-[#9BA69A] transition hover:bg-white/[0.07] hover:text-white disabled:opacity-50"
          >
            ×
          </button>
        </div>

        {/* Habit name */}
        <div className="mt-7">
          <label htmlFor="habit-title" className={labelClass}>
            Habit name <span className="text-[#C5F36B]">*</span>
          </label>

          <input
            id="habit-title"
            autoFocus
            required
            minLength={2}
            maxLength={80}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Read for 20 minutes"
            className={fieldClass}
          />

          <div className="mt-2 flex justify-between gap-3 text-xs text-[#788478]">
            <span>Make it specific and achievable.</span>
            <span>{title.length}/80</span>
          </div>
        </div>

        {/* Description */}
        <div className="mt-5">
          <label htmlFor="habit-description" className={labelClass}>
            Description <span className="font-normal text-[#788478]">(optional)</span>
          </label>

          <textarea
            id="habit-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="What will this habit look like in your day?"
            rows={3}
            maxLength={300}
            className={`${fieldClass} min-h-[100px] resize-y leading-6`}
          />

          <p className="mt-1 text-right text-xs text-[#788478]">
            {description.length}/300
          </p>
        </div>

        {/* Category and frequency */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="min-w-0">
            <label htmlFor="habit-category" className={labelClass}>
              Category
            </label>

            <select
              id="habit-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className={fieldClass}
            >
              <option value="Health">Health</option>
              <option value="Learning">Learning</option>
              <option value="Productivity">Productivity</option>
              <option value="Personal">Personal</option>
            </select>
          </div>

          <div className="min-w-0">
            <label htmlFor="habit-frequency" className={labelClass}>
              Repeat
            </label>

            <select
              id="habit-frequency"
              value={frequency}
              onChange={(event) =>
                setFrequency(event.target.value as "Daily" | "Weekly")
              }
              className={fieldClass}
            >
              <option value="Daily">Every day</option>
              <option value="Weekly">Every week</option>
            </select>
          </div>
        </div>

        {/* Validation and API errors */}
        {(formError || error) && (
          <p
            role="alert"
            className="mt-5 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300"
          >
            {formError || error}
          </p>
        )}

        {/* Actions */}
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="min-h-11 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-[#D9E0D5] transition hover:bg-white/[0.06] disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="min-h-11 rounded-xl bg-[#C5F36B] px-6 py-3 text-sm font-semibold text-[#17200F] transition hover:bg-[#D4FA89] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Creating habit..." : "Create habit →"}
          </button>
        </div>
      </form>
    </div>
  );
}
