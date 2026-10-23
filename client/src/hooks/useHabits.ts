import { useCallback, useEffect, useState } from "react";
import { createHabit, getHabits } from "../services/habitService";
import type { CreateHabitInput, Habit } from "../types/habit";

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const refreshHabits = useCallback(async () => {
    setError("");

    try {
      const data = await getHabits();
      setHabits(data);
    } catch {
      setError(
        "We couldn't reach your habits. Please check that the backend is running.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshHabits();
  }, [refreshHabits]);

  const addHabit = async (input: CreateHabitInput): Promise<boolean> => {
    setSaving(true);
    setError("");

    try {
      const newHabit = await createHabit(input);
      setHabits((current) => [newHabit, ...current]);
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not create habit.",
      );
      return false;
    } finally {
      setSaving(false);
    }
  };

  return {
    habits,
    loading,
    saving,
    error,
    addHabit,
    refreshHabits,
  };
}
