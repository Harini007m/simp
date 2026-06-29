import { apiClient } from './api.client';
import { ExecutiveMetric, RiskIndicator } from '../types/executive.types';
export const ExecutiveApi = {
  getMetrics: async (): Promise<ExecutiveMetric[]> => {
    const res = await apiClient.get<ExecutiveMetric[]>('/executive/metrics');
    return res.data;
  },
  getRiskIndicators: async (): Promise<RiskIndicator[]> => {
    const res = await apiClient.get<RiskIndicator[]>('/executive/risks');
    return res.data;
  }
};
