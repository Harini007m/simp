import { Notification } from '../types/notification.types';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const notificationApi = {
  getNotifications: async (): Promise<Notification[]> => {
    await delay(600);
    throw new Error('Backend implementation pending or failed');
  },
  getNotificationById: async (id: string): Promise<Notification | undefined> => {
    await delay(300);
    throw new Error('Backend implementation pending or failed');
  },
  markAsRead: async (id: string): Promise<Notification> => {
    await delay(300);
    const notif = ([] as any[]).find(n => n.id === id);
    if (!notif) throw new Error('Notification not found');
    notif.readStatus = true;
    return notif;
  },
  createNotification: async (data: Partial<Notification>): Promise<Notification> => {
    await delay(300);
    const newNotif: Notification = {
      id: `notif-${([] as any[]).length + 1}`,
      title: data.title || '',
      message: data.message || '',
      recipient: data.recipient || 'all',
      role: data.role || 'All',
      module: data.module || 'Announcement',
      channel: data.channel || 'In-App Notification',
      priority: data.priority || 'Medium',
      status: data.status || 'Delivered',
      readStatus: false,
      retryCount: 0,
      createdTime: new Date().toISOString()
    };
    ([] as any[]).push(newNotif);
    return newNotif;
  }
};
