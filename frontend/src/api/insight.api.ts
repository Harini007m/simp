import { InsightForecast, StudentRisk } from '../types/insight.types';
export const InsightApi = {
  getForecasts: async (): Promise<InsightForecast[]> => {
    throw new Error('Backend implementation pending or failed');
  },
  getStudentRisks: async (): Promise<StudentRisk[]> => {
    throw new Error('Backend implementation pending or failed');
  }
};
