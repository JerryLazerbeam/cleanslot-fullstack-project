export type AdminStat = {
  label: string;
  value: number;
  route: string;
};
export type UpcomingBooking = {
  id: number;
  date: string;
  time: string;
  user: string;
};
export type ReportStatus = "Ny" | "Pågående" | "Åtgärdad";

export type ReportSummaryItem = {
  id: number;
  machine: string;
  status: ReportStatus;
};

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};
