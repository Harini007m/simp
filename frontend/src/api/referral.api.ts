import { Referral, ReferralCampaign } from '../types/referral.types';
const DELAY = 500;

export const ReferralAPI = {
  getReferrals: async (): Promise<Referral[]> => {
    throw new Error('Backend implementation pending or failed');
  },

  getCampaigns: async (): Promise<ReferralCampaign[]> => {
    throw new Error('Backend implementation pending or failed');
  }
};
