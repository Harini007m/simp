import { Assessment, AssessmentResult, MOCK_ASSESSMENTS, MOCK_ASSESSMENT_RESULTS } from '../data/mock-assessments';

export const assessmentService = {
  async getAssessments(): Promise<Assessment[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_ASSESSMENTS;
  },

  async getAssessmentResults(): Promise<AssessmentResult[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return MOCK_ASSESSMENT_RESULTS;
  }
};
