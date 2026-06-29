import { OpeningMentor } from '../types/api/mentor.types';
import { openingMentorsApi } from "../api/opening-mentors.api";

class OpeningMentorsService {
  async getMentorsForOpportunity(opportunityId: string): Promise<OpeningMentor[]> {
      return openingMentorsApi.getMentorsForOpportunity(opportunityId);
  }

  async assignMentor(data: Omit<OpeningMentor, 'id' | 'assignedDate'>): Promise<OpeningMentor> {
      return openingMentorsApi.assignMentor(data);
  }
}

export const openingMentorsService = new OpeningMentorsService();
