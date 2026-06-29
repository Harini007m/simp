import { AttendanceSession, AttendanceRecord, AttendanceStatus, AttendanceLog } from '../types/api/attendance.types';
import { attendanceApi } from '../api/attendance.api';

class AttendanceService {
  async getSessions(): Promise<AttendanceSession[]> {
      const data = await attendanceApi.getSessions();
      return data;
  }

  async getRecordsForSession(sessionId: string): Promise<AttendanceRecord[]> {
      const data = await attendanceApi.getRecordsForSession(sessionId);
      return data;
  }

  async getStudentStatus(studentId: string): Promise<AttendanceStatus> {
      const data = await attendanceApi.getStudentStatus(studentId);
      return data;
  }

  async createSession(batchId: string, createdBy: string, date: string): Promise<AttendanceSession> {
      const result = await attendanceApi.createSession({ batchId, createdBy, date });
      return result;
  }

  async markAttendance(sessionId: string, studentId: string, status: string): Promise<void> {
      await attendanceApi.markAttendance(sessionId, studentId, status);
      return;
  }

  async getAttendanceLogs(): Promise<AttendanceLog[]> {
      return attendanceApi.getAttendanceLogs();
  }

  async getAttendanceStatus(): Promise<AttendanceStatus> {
      return attendanceApi.getAttendanceStatus();
  }
}

export const attendanceService = new AttendanceService();
