export type Equipment = {
  equipment_id: number;
  name: string;
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
  message: string;
  created_at: string;
  is_read: number;
};
