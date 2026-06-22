import { CoordinatorStats, BatchPerformance, MOCK_COORDINATOR_STATS, MOCK_BATCH_PERFORMANCE } from '../data/mock-coordinator';

export const coordinatorService = {
  async getStats(): Promise<CoordinatorStats> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return MOCK_COORDINATOR_STATS;
  },

  async getBatchPerformances(): Promise<BatchPerformance[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_BATCH_PERFORMANCE;
  }
};
