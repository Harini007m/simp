import { Application, MOCK_APPLICATIONS } from '../data/mock-applications';

export const applicationService = {
  async getApplications(): Promise<Application[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_APPLICATIONS;
  },

  async getApplication(id: string): Promise<Application | undefined> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_APPLICATIONS.find(app => app.id === id);
  },

  async getApplicationsByOpportunity(oppId: string): Promise<Application[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_APPLICATIONS.filter(app => app.opportunityId === oppId);
  },

  async updateApplicationStatus(id: string, newStatus: 'Pending' | 'Interview' | 'Accepted' | 'Rejected'): Promise<Application | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const app = MOCK_APPLICATIONS.find(a => a.id === id);
    if (app) {
      app.status = newStatus;
    }
    return app;
  }
};
