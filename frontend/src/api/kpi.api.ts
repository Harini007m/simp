import { KPIMetric } from '../types/kpi.types';
export const KPIApi = {
  getKPIs: async (): Promise<KPIMetric[]> => {
    throw new Error('Backend implementation pending or failed');
  },

  createKPI: async (kpi: Partial<KPIMetric>): Promise<KPIMetric> => {
    throw new Error('Backend implementation pending or failed');
  },

  updateKPI: async (id: string, updates: Partial<KPIMetric>): Promise<KPIMetric> => {
    throw new Error('Backend implementation pending or failed');
  }
};
