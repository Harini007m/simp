import { apiClient } from './api.client';
import { UserSession } from "../types/api/user-session.types";

export const sessionApi = {
    async getSessions(): Promise<UserSession[]> {
        const response = await apiClient.get('/session');
        return response.data;
    },
    async terminateSession(id: string): Promise<void> {
        const response = await apiClient.get('/session');
        return response.data;
    }
};
