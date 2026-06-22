import { Performance, MOCK_PERFORMANCES } from '../data/mock-performances';

export const performanceService = {
  async getPerformances(): Promise<Performance[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_PERFORMANCES;
  },

  async getPerformance(id: string): Promise<Performance | undefined> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_PERFORMANCES.find(perf => perf.id === id);
  },

  async getPerformancesByBatch(batchId: string): Promise<Performance[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_PERFORMANCES.filter(perf => perf.batchId === batchId);
  }
};
