import { apiClient } from './api.client';
import { InsightForecast, StudentRisk } from '../types/insight.types';
export const InsightApi = {
  getForecasts: async (): Promise<InsightForecast[]> => {
    const res = await apiClient.get<InsightForecast[]>('/insights/forecasts');
    return res.data;
  },
  getStudentRisks: async (): Promise<StudentRisk[]> => {
    const res = await apiClient.get<StudentRisk[]>('/insights/student-risks');
    return res.data;
  }
};
