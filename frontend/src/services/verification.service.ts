import { VerificationApi } from '../api/verification.api';

export const VerificationService = {
  getRequests: async () => {
    return await VerificationApi.getRequests();
  },

  verifyCertificate: async (certNumber: string) => {
    return await VerificationApi.verifyCertificate(certNumber);
  },
  
  getPendingRequestsCount: async () => {
    const reqs = await VerificationApi.getRequests();
    return Math.floor(reqs.length / 10);
  }
};
