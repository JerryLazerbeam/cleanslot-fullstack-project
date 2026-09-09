export type ServiceReport = {
  id: string;
  phone: string;
  email: string;
  machines: string[];
  description: string;
  createdAt: string;
  isRead: boolean;
};

export type CreateServiceReport = {
  phone: string;
  email: string;
  machines: string[];
  description: string;
};
