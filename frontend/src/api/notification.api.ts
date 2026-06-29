import { Notification } from '../types/notification.types';
import { apiClient } from './api.client';

export const notificationApi = {
  getNotifications: async (): Promise<Notification[]> => {
    const res = await apiClient.get<Notification[]>('/notifications');
    return res.data;
  },
  getNotificationById: async (id: string): Promise<Notification | undefined> => {
    const res = await apiClient.get<Notification>(`/notifications/${id}`);
    return res.data;
  },
  markAsRead: async (id: string): Promise<Notification> => {
    const res = await apiClient.put<Notification>(`/notifications/${id}/read`, {});
    return res.data;
  },
  createNotification: async (data: Partial<Notification>): Promise<Notification> => {
    const res = await apiClient.post<Notification>('/notifications', data);
    return res.data;
  }
};
