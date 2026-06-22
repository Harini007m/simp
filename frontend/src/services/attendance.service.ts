import { AttendanceLog, AttendanceStatus, MOCK_ATTENDANCE_LOGS, MOCK_ATTENDANCE_STATUS } from '../data/mock-attendance';

export const attendanceService = {
  async getAttendanceLogs(): Promise<AttendanceLog[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_ATTENDANCE_LOGS;
  },

  async getAttendanceStatus(): Promise<AttendanceStatus> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_ATTENDANCE_STATUS;
  }
};
