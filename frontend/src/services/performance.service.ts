import { StudentPerformance, BatchPerformance } from '../types/api/performance.types';
import { performanceApi } from '../api/performance.api';

class PerformanceService {
  async getStudentPerformances(): Promise<StudentPerformance[]> {
      const data = await performanceApi.getStudentPerformances();
      return data;
  }

  async getBatchPerformances(): Promise<BatchPerformance[]> {
      const data = await performanceApi.getBatchPerformances();
      return data;
  }

  async getStudentPerformance(studentId: string): Promise<StudentPerformance | undefined> {
      const data = await performanceApi.getStudentPerformance(studentId);
      return data;
  }
}

export const performanceService = new PerformanceService();
