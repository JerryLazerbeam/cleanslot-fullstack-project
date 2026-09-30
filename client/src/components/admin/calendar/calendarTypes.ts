export type CalendarView = "day" | "week" | "month";

export type Booking = {
  id: number;
  date: string;
  time: string;
  user: string | null; 
};

export const TIME_SLOTS = [
  { start: "07:00", end: "10:00" },
  { start: "10:00", end: "13:00" },
  { start: "13:00", end: "16:00" },
  { start: "16:00", end: "19:00" },
  { start: "19:00", end: "22:00" },
];


export function toDateStr(date: Date): string {
  return date.toLocaleDateString("sv-SE");
}
