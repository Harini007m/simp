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

  async createApplication(app: Omit<Application, 'id' | 'appliedDate'>): Promise<Application> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newApp: Application = {
      ...app,
      id: `app-${Math.random().toString(36).substring(2, 9)}`,
      appliedDate: new Date().toISOString().split('T')[0]
    };
    MOCK_APPLICATIONS.push(newApp);
    return newApp;
  },

  async updateApplicationStatus(id: string, status: Application['status']): Promise<Application> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const appIndex = MOCK_APPLICATIONS.findIndex(app => app.id === id);
    if (appIndex === -1) {
      throw new Error(`Application with ID ${id} not found`);
    }
    MOCK_APPLICATIONS[appIndex] = {
      ...MOCK_APPLICATIONS[appIndex],
      status
    };
    return MOCK_APPLICATIONS[appIndex];
  }
};
