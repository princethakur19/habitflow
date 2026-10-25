export type CalendarDay = {
  key: string;
  date: Date;
  label: string;
  dayNumber: number;
  isToday: boolean;
  isFuture: boolean;
};

export function dateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function parseDateKey(key: string): Date {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function createWeekDates(referenceDate = new Date()): CalendarDay[] {
  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0);

  const monday = new Date(today);
  const weekday = monday.getDay();

  monday.setDate(monday.getDate() - (weekday === 0 ? 6 : weekday - 1));

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);

    const key = dateKey(date);

    return {
      key,
      date,
      label: date.toLocaleDateString("en-US", { weekday: "short" }),
      dayNumber: date.getDate(),
      isToday: key === dateKey(today),
      isFuture: key > dateKey(today),
    };
  });
}
