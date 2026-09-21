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
  user_id: number;
  username: string;
  role: string;
  phone: string;
  email: string;
};

export type Report = {
  report_id: number;
  user_id: number;
  username: string;
  phone: string;
  email: string;
  description: string;
  status: ReportStatus;
  created_at: string;
  equipment: string;
};

export type CreateUser = {
  username: string;
  password: string;
  phone: string;
  email: string;
  role: string;
};
