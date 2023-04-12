export type NotificationVariant = 'success' | 'error' | 'info';

export type Notification = {
  id?: string;
  title: string;
  message: string;
  persistent?: boolean;
  duration?: number;
  variant?: NotificationVariant;
};
