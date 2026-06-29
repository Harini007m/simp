import { EscalationRule, EscalationLog } from '../types/escalation.types';
import { apiClient } from "./api.client";

export const escalationApi = {
  getRules: async (): Promise<EscalationRule[]> => {
    const res = await apiClient.get<any>('/api/placeholder');
        return res.data;
  },
  
  getEscalations: async (): Promise<EscalationLog[]> => {
    const res = await apiClient.get<any>('/api/placeholder');
      return res.data;
  },
  
  getEscalationById: async (id: string): Promise<EscalationLog | undefined> => {
    const res = await apiClient.get<any>('/api/placeholder');
      return res.data;
  },
  
  updateEscalationStatus: async (id: string, status: 'Pending' | 'Resolved' | 'Ignored'): Promise<void> => {
    const index = ([] as any[]).findIndex(e => e.id === id);
    if (index !== -1) {
      ([] as any[])[index].status = status;
    }
    return Promise.resolve();
  }
};
