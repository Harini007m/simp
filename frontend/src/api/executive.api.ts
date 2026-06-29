import { ExecutiveMetric, RiskIndicator } from '../types/executive.types';
export const ExecutiveApi = {
  getMetrics: async (): Promise<ExecutiveMetric[]> => {
    throw new Error('Backend implementation pending or failed');
  },
  getRiskIndicators: async (): Promise<RiskIndicator[]> => {
    throw new Error('Backend implementation pending or failed');
  }
};
