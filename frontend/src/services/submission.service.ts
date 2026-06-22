import { Submission, MOCK_SUBMISSIONS } from '../data/mock-submissions';

export const submissionService = {
  async getSubmissions(): Promise<Submission[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_SUBMISSIONS;
  },

  async getSubmission(id: string): Promise<Submission | undefined> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_SUBMISSIONS.find(sub => sub.id === id);
  }
};
