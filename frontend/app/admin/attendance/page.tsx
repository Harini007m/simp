"use client";

import React, { useEffect, useState } from 'react';
import { attendanceService } from '@/src/services/attendance.service';
import { AttendanceLog, AttendanceStatus } from '@/src/data/mock-attendance';
import { ChevronRight } from 'lucide-react';

export default function AttendancePage() {
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceLog[]>([]);
  const [status, setStatus] = useState<AttendanceStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [logsData, statusData] = await Promise.all([
          attendanceService.getAttendanceLogs(),
          attendanceService.getAttendanceStatus()
        ]);
        setAttendanceLogs(logsData);
        setStatus(statusData);
      } catch (err) {
        console.error('Failed to load attendance data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !status) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    );
  }

  const { isCheckedIn, clockInTime, presentDays, absentDays, leaveDays, averageAttendance } = status;

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <span>Identity</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-blue-600 font-extrabold">Attendance Tracker</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">Attendance Logs</h2>
          <p className="text-xs text-slate-500 mt-1">
            Track daily hours, verify connection status, and review historical check-in logs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Check-In control card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 flex flex-col justify-between shadow-sm">
          <div>
            <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">Tracker Node</span>
            <h3 className="text-lg font-bold text-slate-800 mt-1">Live Check-In Portal</h3>
            <p className="text-xs text-slate-500 leading-relaxed mt-2">
              Clock in daily to log your hours. Ensure you coordinate with your guide regarding working windows. 85% attendance is required to graduate.
            </p>
          </div>

          <div className="py-4 border-y border-slate-100 space-y-2.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-semibold">Today's Date:</span>
              <span className="text-slate-700 font-bold">{new Date().toISOString().split('T')[0]}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-semibold">Session Entry:</span>
              <span className="text-slate-700 font-bold">{clockInTime || 'Not checked in'}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-semibold">Connection Status:</span>
              {isCheckedIn ? (
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Active / Synced</span>
                </span>
              ) : (
                <span className="text-slate-500 font-bold">Offline</span>
              )}
            </div>
          </div>

          {isCheckedIn ? (
            <div className="w-full py-4 text-center text-xs font-bold uppercase tracking-wider rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600">
              ✓ Auto-Logged Active
            </div>
          ) : (
            <div className="w-full py-4 text-center text-xs font-bold uppercase tracking-wider rounded-lg bg-slate-50 border border-slate-200 text-slate-500">
              Please Check-In
            </div>
          )}
        </div>

        {/* Circular/stats chart indicators */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between shadow-sm">
          <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3">
            Metrics Overview
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4">
            {/* Circle tracker */}
            <div className="relative h-28 w-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="56" cy="56" r="48" strokeWidth="8" stroke="#f1f5f9" fill="transparent" />
                <circle cx="56" cy="56" r="48" strokeWidth="8" stroke="#2563eb" fill="transparent" strokeDasharray="301.6" strokeDashoffset={301.6 * (1 - (averageAttendance / 100))} />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-black text-slate-800">{averageAttendance}%</span>
                <span className="text-[8px] text-slate-400 font-bold uppercase">Average</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 bg-blue-600 rounded-none" />
                <span className="text-slate-500"><strong className="text-slate-800">{presentDays}</strong> Present Days</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 bg-red-500 rounded-none" />
                <span className="text-slate-500"><strong className="text-slate-800">{absentDays}</strong> Absent Days</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 bg-slate-300 rounded-none" />
                <span className="text-slate-500"><strong className="text-slate-800">{leaveDays}</strong> Leave Days</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 border border-slate-100 rounded-lg text-[10px] text-slate-500 leading-relaxed">
            💡 <strong>Intern Notice:</strong> Weekend leaves are pre-cleared.
          </div>
        </div>

        {/* Calendar view */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
          <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3">
            June 2026 Calendar
          </h3>
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 30 }).map((_, i) => {
              const day = i + 1;
              let bg = 'bg-slate-50 border border-slate-100 rounded text-slate-400';
              if (day <= 15) {
                if (day === 7 || day === 14) bg = 'bg-slate-100/50 border border-slate-200/60 rounded text-slate-400';
                else if (day === 8) bg = 'bg-red-50 text-red-600 border border-red-100 rounded';
                else bg = 'bg-emerald-50 text-emerald-600 border border-emerald-100 rounded';
              } else if (day === 16) {
                bg = isCheckedIn ? 'bg-blue-600 text-white font-bold rounded' : 'bg-blue-50 border border-blue-300 text-blue-600 animate-pulse rounded';
              }
              return (
                <div key={day} className={`h-8 flex items-center justify-center text-xs font-semibold ${bg}`}>
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Table list logs */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
        <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider">Historical Check-In Log</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-widest font-bold">
                <th className="py-3 px-4">Log Date</th>
                <th className="py-3 px-4">Clock In</th>
                <th className="py-3 px-4">Clock Out</th>
                <th className="py-3 px-4">Work Duration</th>
                <th className="py-3 px-4">Grading Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600">
              {attendanceLogs?.map((log: AttendanceLog) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-800">{log.date}</td>
                  <td className="py-3 px-4">{log.clockIn}</td>
                  <td className="py-3 px-4">{log.clockOut}</td>
                  <td className="py-3 px-4">{log.duration}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block border font-bold px-2 py-0.5 rounded-sm ${
                      log.status === 'Present' 
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                        : log.status === 'Absent'
                        ? 'bg-red-50 border-red-100 text-red-600'
                        : 'bg-slate-100 border-slate-200 text-slate-600'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
