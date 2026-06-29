import { SelfServiceDashboard, UserProfile } from '../types/selfservice.types';
const DELAY = 500;

export const SelfServiceAPI = {
  getDashboard: async (): Promise<SelfServiceDashboard> => {
    throw new Error('Backend implementation pending or failed');
  },
  updateProfile: async (profile: Partial<UserProfile>): Promise<UserProfile> => {
    throw new Error('Backend implementation pending or failed');
  }
};
