import type { Habit, CreateHabitInput } from "../types/habit";

const API_URL = "http://localhost:5000/api/habits";

type HabitResponse = {
  success: boolean;
  data: Habit[];
  count?: number;
  message?: string;
};

export async function getHabits(): Promise<Habit[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Could not fetch habits.");
  }

  const result: HabitResponse = await response.json();
  return result.data;
}

export async function createHabit(
  habit: CreateHabitInput,
): Promise<Habit> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(habit),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Could not create habit.");
  }

  return result.data as Habit;
}

export async function deleteHabit(id: string): Promise<void> {
  const response = await fetch(
    `${API_URL}/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    const result = await response.json().catch(() => null);

    throw new Error(
      result?.message || "Could not delete habit.",
    );
  }
}
