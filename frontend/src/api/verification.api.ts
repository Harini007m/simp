import { VerificationRequest, VerificationResult } from '../types/verification.types';
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const VerificationApi = {
  getRequests: async (): Promise<VerificationRequest[]> => {
    await delay(500);
    throw new Error('Backend implementation pending or failed');
  },

  verifyCertificate: async (certNumber: string): Promise<VerificationResult> => {
    await delay(600);
    const cert = ([] as any[]).find(c => c.certificateNumber === certNumber);
    if (!cert) {
      return { status: 'Invalid', message: 'Certificate not found in records.' };
    }
    if (cert.status === 'Revoked') {
      return { status: 'Revoked', message: 'This certificate has been revoked.', studentName: cert.studentName };
    }
    return {
      status: 'Valid',
      message: 'Certificate is valid and verified.',
      studentName: cert.studentName,
      program: cert.program,
      batch: cert.batch,
      issueDate: cert.issueDate || undefined,
      organization: 'Pinesphere',
      certificateType: cert.type
    };
  }
};
