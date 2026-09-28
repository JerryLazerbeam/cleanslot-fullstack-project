export type Equipment = {
  equipment_id: number;
  name: string;
  is_available: number;
};
export type ServiceReport = {
  id: string;
  phone: string;
  email: string;
  equipment: number[];
  description: string;
  createdAt: string;
  isRead: boolean;
};
export type CreateServiceReport = {
  phone: string;
  email: string;
  equipment: number[];
  description: string;
};
export type Message = {
  message_id: number;
  title: string | null;
  message: string;
  created_at: string;
  is_read: number;
};
