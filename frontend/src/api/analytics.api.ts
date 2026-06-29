import { AnalyticsSummary, AnalyticsDataPoint, AnalyticsDimension } from '../types/analytics.types';
export const AnalyticsApi = {
  getSummary: async (): Promise<AnalyticsSummary> => {
    throw new Error('Backend implementation pending or failed');
  },
  getAttendanceTrend: async (): Promise<AnalyticsDataPoint[]> => {
    throw new Error('Backend implementation pending or failed');
  },
  getTopPrograms: async (): Promise<AnalyticsDimension[]> => {
    throw new Error('Backend implementation pending or failed');
  }
};
