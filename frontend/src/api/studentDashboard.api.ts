import { apiClient } from './api.client';
import { StudentDashboardData } from "../types/api/student-dashboard.types";

export const studentDashboardApi = {
    async getDashboardData(): Promise<StudentDashboardData> {
        const response = await apiClient.get('/studentDashboard');
        return response.data;
    }
};
