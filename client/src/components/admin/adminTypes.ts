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
export type ApiAdminSlot = {
  slot_id: number;
  date: string;
  start_time: string;
  end_time: string;
  booking_id: number | null;
  username: string | null;
};
export type ApiUpcomingBooking = {
  booking_id: number;
  username: string;
  date: string;
  start_time: string;
  end_time: string;
};
export type AdminEquipment = {
  equipment_id: number;
  name: string;
  is_available: number;
  open_reports: number;
};
