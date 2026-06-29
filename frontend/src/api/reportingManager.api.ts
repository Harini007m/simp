import { ReportingManager, ManagerAssignment, ManagerEvaluation } from '../types/reporting-manager.types';
import { apiClient } from "./api.client";

export const reportingManagerApi = {
  getManagers: async (): Promise<ReportingManager[]> => {
    const res = await apiClient.get<ReportingManager[]>('/reporting-managers');
    return res.data;
  },
  
  getManagerById: async (id: string): Promise<ReportingManager | undefined> => {
    const res = await apiClient.get<ReportingManager>(`/reporting-managers/${id}`);
    return res.data;
  },

  getAssignmentsByManager: async (managerId: string): Promise<ManagerAssignment[]> => {
    const res = await apiClient.get<ManagerAssignment[]>(`/reporting-managers/${managerId}/assignments`);
    return res.data;
  },

  getEvaluationsByManager: async (managerId: string): Promise<ManagerEvaluation[]> => {
    const res = await apiClient.get<ManagerEvaluation[]>(`/reporting-managers/${managerId}/evaluations`);
    return res.data;
  }
};
