import { Feedback, FeedbackCreate } from '../types/api/feedback.types';
import { feedbackApi } from '../api/feedback.api';

export const feedbackService = {
  async getFeedback(): Promise<Feedback[]> {
        const data = await feedbackApi.getFeedback();
        return data;
    },

  async getFeedbackById(id: string): Promise<Feedback | undefined> {
      const data = await feedbackApi.getFeedbackById(id);
      return data;
  },

  async createFeedback(data: FeedbackCreate): Promise<Feedback> {
      const result = await feedbackApi.createFeedback(data);
      return result;
  },
};
