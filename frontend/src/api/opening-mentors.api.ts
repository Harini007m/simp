import { apiClient } from './api.client';
import { OpeningMentor } from "../types/api/mentor.types";

export const openingMentorsApi = {
    async getMentorsForOpportunity(opportunityId: string): Promise<OpeningMentor[]> {
        const response = await apiClient.get(`/opening/mentors?opportunityId=${opportunityId}`);
        return response.data;
    },
    async assignMentor(data: Omit<OpeningMentor, 'id' | 'assignedDate'>): Promise<OpeningMentor> {
        const response = await apiClient.post('/opening/mentors', data);
        return response.data;
    }
};
