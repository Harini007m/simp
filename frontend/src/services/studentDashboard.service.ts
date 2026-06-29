import { StudentDashboardData } from '../types/api/student-dashboard.types';
import { studentDashboardApi } from "../api/studentDashboard.api";

export const studentDashboardService = {
  async getDashboardData(): Promise<StudentDashboardData> {
        return studentDashboardApi.getDashboardData();
    }
};
