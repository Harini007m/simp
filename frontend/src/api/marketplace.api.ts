import { MarketplaceOpportunity, MarketplaceApplication } from '../types/marketplace.types';
const DELAY = 500;

export const MarketplaceAPI = {
  getOpportunities: async (): Promise<MarketplaceOpportunity[]> => {
    throw new Error('Backend implementation pending or failed');
  },
  
  getApplications: async (): Promise<MarketplaceApplication[]> => {
    throw new Error('Backend implementation pending or failed');
  }
};
