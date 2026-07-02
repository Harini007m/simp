import { apiClient } from './api.client';
import { DigitalIDCard } from '../types/idcard.types';

export const IDCardAPI = {
  getIDCards: async (): Promise<DigitalIDCard[]> => {
    try {
      const res = await apiClient.get('/api/v1/idcard');
      return res.data?.data || [];
    } catch (error) {
      return [];
    }
  },

  getMyIDCard: async (userId: string): Promise<DigitalIDCard | null> => {
    try {
      const res = await apiClient.get('/api/v1/idcard/my');
      return res.data?.data || null;
    } catch (error) {
      return null;
    }
  }
};
