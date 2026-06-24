import { Opportunity, MOCK_OPPORTUNITIES } from '../data/mock-opportunities';

class OpportunitiesService {
  async getOpportunities(): Promise<Opportunity[]> {
    return new Promise((resolve) => {
      // Simulate network delay for realistic loading state
      setTimeout(() => {
        resolve([...MOCK_OPPORTUNITIES]);
      }, 500);
    });
  }

  async getOpportunity(id: string): Promise<Opportunity | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_OPPORTUNITIES.find(opp => opp.id === id));
      }, 300);
    });
  }

  async createOpportunity(opp: Omit<Opportunity, 'id'>): Promise<Opportunity> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newOpp: Opportunity = {
          ...opp,
          id: `opp-${Math.random().toString(36).substring(2, 9)}`,
          status: opp.status || 'Draft',
          postedDate: opp.postedDate || new Date().toISOString().split('T')[0]
        };
        MOCK_OPPORTUNITIES.push(newOpp);
        resolve(newOpp);
      }, 500);
    });
  }
}

export const opportunitiesService = new OpportunitiesService();
