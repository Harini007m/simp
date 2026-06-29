import { apiClient } from './api.client';
import { AnalyticsSummary, AnalyticsDataPoint, AnalyticsDimension } from '../types/analytics.types';
export const AnalyticsApi = {
  getSummary: async (): Promise<AnalyticsSummary> => {
    const res = await apiClient.get<AnalyticsSummary>('/analytics/summary');
    return res.data;
  },
  getAttendanceTrend: async (): Promise<AnalyticsDataPoint[]> => {
    const res = await apiClient.get<AnalyticsDataPoint[]>('/analytics/attendance-trend');
    return res.data;
  },
  getTopPrograms: async (): Promise<AnalyticsDimension[]> => {
    const res = await apiClient.get<AnalyticsDimension[]>('/analytics/top-programs');
    return res.data;
  }
};
