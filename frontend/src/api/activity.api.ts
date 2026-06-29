import { ActivityLog } from '../types/activity.types';
import { apiClient } from "./api.client";

export const activityApi = {
  getAllActivities: async (): Promise<ActivityLog[]> => {
    const res = await apiClient.get<any>('/api/placeholder');
        return res.data;
  },
  
  getActivityById: async (id: string): Promise<ActivityLog | undefined> => {
    const res = await apiClient.get<any>('/api/placeholder');
      return res.data;
  },

  getActivitiesByUser: async (userId: string): Promise<ActivityLog[]> => {
    const res = await apiClient.get<any>('/api/placeholder');
      return res.data;
  }
};
