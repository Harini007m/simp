import { apiClient } from './api.client';
import { OpeningCreate, OpeningResponse } from "../types/api/opportunity.types";

export const opportunitiesApi = {
    async createOpportunity(opp: OpeningCreate): Promise<OpeningResponse> {
        const response = await apiClient.post<OpeningResponse>('/opportunities', opp);
        return response.data;
    }
};
