export interface AttendanceLog {
  id: string;
  studentId: string;
  date: string;
  clockIn: string;
  clockOut: string;
  duration: string;
  status: 'Present' | 'Absent' | 'Leave' | 'Half-Day';
}

export interface AttendanceStatus {
  studentId: string;
  isCheckedIn: boolean;
  clockInTime: string | null;
  presentDays: number;
  absentDays: number;
  leaveDays: number;
  averageAttendance: number;
}

export const MOCK_ATTENDANCE_LOGS: AttendanceLog[] = [
  { id: 'att-1', studentId: 'stu-1', date: '2026-06-14', clockIn: '08:55 AM', clockOut: '05:05 PM', duration: '8h 10m', status: 'Present' },
  { id: 'att-2', studentId: 'stu-1', date: '2026-06-13', clockIn: '09:05 AM', clockOut: '05:15 PM', duration: '8h 10m', status: 'Present' },
  { id: 'att-3', studentId: 'stu-1', date: '2026-06-12', clockIn: '09:15 AM', clockOut: '06:00 PM', duration: '8h 45m', status: 'Present' },
  { id: 'att-4', studentId: 'stu-1', date: '2026-06-11', clockIn: '-', clockOut: '-', duration: '0h 0m', status: 'Absent' },
  { id: 'att-5', studentId: 'stu-1', date: '2026-06-10', clockIn: '08:50 AM', clockOut: '05:00 PM', duration: '8h 10m', status: 'Present' },
];

export const MOCK_ATTENDANCE_STATUS: AttendanceStatus = {
  studentId: 'stu-1',
  isCheckedIn: true,
  clockInTime: '08:58 AM',
  presentDays: 15,
  absentDays: 2,
  leaveDays: 1,
  averageAttendance: 88
};
