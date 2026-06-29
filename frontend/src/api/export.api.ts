import { ExportJob, ExportSchedule } from '../types/export.types';
export const ExportApi = {
  getExportJobs: async (): Promise<ExportJob[]> => {
    throw new Error('Backend implementation pending or failed');
  },
  getExportSchedules: async (): Promise<ExportSchedule[]> => {
    throw new Error('Backend implementation pending or failed');
  }
};
