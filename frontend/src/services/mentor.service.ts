import { Mentor, MOCK_MENTORS } from '../data/mock-mentors';

export const mentorService = {
  async getMentors(): Promise<Mentor[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_MENTORS;
  },

  async getMentor(id: string): Promise<Mentor | undefined> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_MENTORS.find(men => men.id === id);
  }
};
