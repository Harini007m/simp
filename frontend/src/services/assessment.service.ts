import { Assessment, AssessmentSubmission } from '../types/api/assessment.types';
import { assessmentApi } from '../api/assessment.api';

class AssessmentService {
  async getAssessments(): Promise<Assessment[]> {
      const data = await assessmentApi.getAssessments();
      return data;
  }

  async getAssessment(id: string): Promise<Assessment | undefined> {
      const data = await assessmentApi.getAssessment(id);
      return data;
  }

  async getSubmissions(assessmentId: string): Promise<AssessmentSubmission[]> {
      const data = await assessmentApi.getSubmissions(assessmentId);
      return data;
  }

  async getAssessmentsByBatch(batchId: string): Promise<Assessment[]> {
      const data = await assessmentApi.getAssessmentsByBatch(batchId);
      return data;
  }
}

export const assessmentService = new AssessmentService();
