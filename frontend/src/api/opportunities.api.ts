import { apiClient } from './api.client';
import { OpeningCreate } from "../types/api/opportunity.types";
import { ExtendedOpening } from "../types/api/opportunity.types";

export const opportunitiesApi = {
    async createOpportunity(opp: OpeningCreate): Promise<ExtendedOpening> {
        const response = await apiClient.get('/opportunities');
        return response.data;
    }
};
