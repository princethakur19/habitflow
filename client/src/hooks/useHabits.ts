import { useCallback, useEffect, useState } from "react";
import {
  createHabit,
  deleteHabit,
  getHabits,
} from "../services/habitService";
import type { CreateHabitInput, Habit } from "../types/habit";

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
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

  const addHabit = async (
    input: CreateHabitInput,
  ): Promise<boolean> => {
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

  const removeHabit = async (id: string): Promise<boolean> => {
    setDeleting(true);
    setError("");

    try {
      await deleteHabit(id);

      setHabits((current) =>
        current.filter((habit) => habit._id !== id),
      );

      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not delete habit.",
      );
      return false;
    } finally {
      setDeleting(false);
    }
  };

  return {
    habits,
    loading,
    saving,
    deleting,
    error,
    addHabit,
    removeHabit,
    refreshHabits,
  };
}
