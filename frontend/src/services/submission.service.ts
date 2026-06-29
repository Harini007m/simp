import { Submission } from '../types/api/submission.types';
import { submissionApi } from '../api/submission.api';

export const submissionService = {
  async getSubmissions(): Promise<Submission[]> {
        const data = await submissionApi.getSubmissions();
        return data;
    },

  async getSubmission(id: string): Promise<Submission | undefined> {
      const data = await submissionApi.getSubmission(id);
      return data;
  }
};
