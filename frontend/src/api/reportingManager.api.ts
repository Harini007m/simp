import { ReportingManager, ManagerAssignment, ManagerEvaluation } from '../types/reporting-manager.types';
import { apiClient } from "./api.client";

export const reportingManagerApi = {
  getManagers: async (): Promise<ReportingManager[]> => {
    const res = await apiClient.get<any>('/api/placeholder');
        return res.data;
  },
  
  getManagerById: async (id: string): Promise<ReportingManager | undefined> => {
    const res = await apiClient.get<any>('/api/placeholder');
      return res.data;
  },

  getAssignmentsByManager: async (managerId: string): Promise<ManagerAssignment[]> => {
    const res = await apiClient.get<any>('/api/placeholder');
      return res.data;
  },

  getEvaluationsByManager: async (managerId: string): Promise<ManagerEvaluation[]> => {
    const res = await apiClient.get<any>('/api/placeholder');
      return res.data;
  }
};
