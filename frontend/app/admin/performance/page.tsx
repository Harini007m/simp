"use client";

import React, { useEffect, useState } from 'react';
import { Target, Search, Filter, Plus, ChevronRight, TrendingUp, BarChart3, AlertCircle } from 'lucide-react';
import { performanceService } from '@/src/services/performance.service';
import { Performance } from '@/src/data/mock-performances';
import { studentService } from '@/src/services/student.service';
import { Student } from '@/src/data/mock-students';
import { batchService } from '@/src/services/batch.service';
import { Batch } from '@/src/data/mock-batches';
import { userService } from '@/src/services/user.service';
import { User } from '@/src/data/mock-users';

interface PerformanceDetailed extends Performance {
  studentData?: Student;
  userData?: User;
  batchData?: Batch;
}

export default function PerformancePage() {
  const [performances, setPerformances] = useState<PerformanceDetailed[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const perfData = await performanceService.getPerformances();
        const stuData = await studentService.getStudents();
        const batchData = await batchService.getBatches();
        const usersData = await userService.getUsers();
        
        const mergedData = perfData.map(perf => {
          const student = stuData.find(s => s.id === perf.studentId);
          const user = usersData.find(u => u.id === student?.userId);
          const batch = batchData.find(b => b.id === perf.batchId);
          
          return {
            ...perf,
            studentData: student,
            userData: user,
            batchData: batch
          };
        });
        
        setPerformances(mergedData);
      } catch (err) {
        console.error('Failed to load performances', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredPerformances = performances.filter(perf => {
    const searchString = `${perf.userData?.name || ''} ${perf.batchData?.name || ''}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  const avgScore = performances.length > 0 ? Math.round(performances.reduce((acc, curr) => acc + curr.overallScore, 0) / performances.length) : 0;
  const atRiskCount = performances.filter(p => p.overallScore < 75).length;

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <span>Execution</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-blue-600 font-extrabold">Performance</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">Student Progression</h2>
          <p className="text-xs text-slate-500 mt-1">
            Monitor holistic metrics including grades, attendance, and task completion.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 hover:border-blue-600 hover:text-blue-600 bg-white rounded-lg text-xs font-bold text-slate-700 shadow-sm transition-all duration-200 cursor-pointer">
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800">{avgScore}%</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">Global Avg Score</div>
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Target className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800">{performances.length}</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">Tracked Students</div>
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800">{atRiskCount}</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">At-Risk Learners</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-semibold text-slate-600">Student</th>
                <th className="px-6 py-3 font-semibold text-slate-600">Batch</th>
                <th className="px-6 py-3 font-semibold text-slate-600">Overall Score</th>
                <th className="px-6 py-3 font-semibold text-slate-600">Task Completion</th>
                <th className="px-6 py-3 font-semibold text-slate-600">Attendance</th>
                <th className="px-6 py-3 font-semibold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPerformances.length > 0 ? (
                filteredPerformances.map((perf) => (
                  <tr key={perf.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                          {perf.userData?.avatar || 'U'}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800">{perf.userData?.name || 'Unknown Student'}</div>
                          <div className="text-xs text-slate-500">Last updated: {perf.lastUpdated}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-700">{perf.batchData?.name || perf.batchId}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${perf.overallScore >= 80 ? 'text-emerald-600' : perf.overallScore >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
                          {perf.overallScore}%
                        </span>
                        <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${perf.overallScore >= 80 ? 'bg-emerald-500' : perf.overallScore >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${perf.overallScore}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <span className="font-medium">{perf.taskCompletionRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <span className="font-medium">{perf.attendancePercentage}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">Deep Dive</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <TrendingUp className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-base font-medium text-slate-600">No performance records found</p>
                    <p className="text-sm mt-1">Try adjusting your search or filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
