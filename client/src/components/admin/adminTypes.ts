export type AdminStat = {
  label: string;
  value: number;
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
export type QuickAction = {
  label: string;
  onClick: () => void;
};