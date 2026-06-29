import { ReportRecord, ReportTemplate } from '../types/report.types';
export const ReportApi = {
  getTemplates: async (): Promise<ReportTemplate[]> => {
    throw new Error('Backend implementation pending or failed');
  },
  getReports: async (): Promise<ReportRecord[]> => {
    throw new Error('Backend implementation pending or failed');
  },
  generateReport: async (templateId: string): Promise<ReportRecord> => {
    return new Promise((resolve) => setTimeout(() => resolve({
      id: `rep_new_${Date.now()}`,
      name: `Generated_Report_${Date.now()}`,
      type: 'Custom',
      generatedBy: 'Current User',
      generatedDate: new Date().toISOString(),
      status: 'Processing',
      format: 'PDF',
      sizeBytes: 0,
      downloadUrl: '#'
    }), 1000));
  }
};
