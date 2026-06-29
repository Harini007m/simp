"use client";

import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, FileText, Clock, AlertTriangle, ChevronRight, TrendingUp, BarChart2, CheckCircle
} from 'lucide-react';
import { ExtendedBatch } from '@/src/services/batch.service';
import { ExtendedStudent } from '@/src/services/student.service';
import { Task } from '@/src/types/api/task.types';

export default function TaskDashboardPage() {
  const [batches, setBatches] = useState<ExtendedBatch[]>([]);
  const [students, setStudents] = useState<ExtendedStudent[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Drill-down states
  const [selectedBatch, setSelectedBatch] = useState<ExtendedBatch | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<ExtendedStudent | null>(null);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const { batchService } = await import('@/src/services/batch.service');
        const { studentService } = await import('@/src/services/student.service');
        const { taskService } = await import('@/src/services/task.service');
        
        const [bData, sData, tData] = await Promise.all([
          batchService.getBatches(),
          studentService.getStudents(),
          taskService.getTasks()
        ]);
        
        setBatches(bData || []);
        setStudents(sData || []);
        setTasks(tData || []);
      } catch (err) {
        console.error("Failed to fetch task dashboard data", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Stats calculation
  const totalTasks = tasks.length;
  const overdueCount = tasks.filter((t: any) => new Date(t.dueDate).getTime() < Date.now()).length;
  const submissionRate = tasks.length > 0 ? 82 : 0; // Mock stat for now

  // Filter students for the selected batch. 
  // If no strict mapping exists in the current backend, we can just show all students for demonstration or filter if batch info is available.
  const batchStudents = selectedBatch ? students.slice(0, 5) : []; // Simulating students in batch

  // Tasks for selected batch
  const batchTasks = selectedBatch ? tasks.filter(t => t.batchId === selectedBatch.id) : [];

  return (
    <div className="space-y-6 animate-slide-in select-none">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-text-primary tracking-tight">Task Dashboard</h2>
        <p className="text-sm text-text-secondary mt-1">Audit published assignments, track student submission percentages, and monitor overdue milestones.</p>
      </div>

      {!selectedBatch ? (
        <>
          {/* KPI Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Total Published Milestones</span>
              <h3 className="text-3xl font-black text-text-primary mt-1">{totalTasks} Tasks</h3>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Overall Submission Rate</span>
              <h3 className="text-3xl font-black text-emerald-600 mt-1">{submissionRate}%</h3>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Overdue Tasks</span>
              <h3 className="text-3xl font-black text-rose-600 mt-1">{overdueCount}</h3>
            </div>
          </div>

          {/* Batches Directory */}
          <div className="space-y-4">
            <h3 className="font-bold text-xs text-text-secondary uppercase tracking-widest">Milestones by Cohort</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {batches.map((batch: any) => {
                const bTasks = tasks.filter(t => t.batchId === batch.id);
                return (
                  <div 
                    key={batch.id}
                    onClick={() => setSelectedBatch(batch)}
                    className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:border-secondary hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] font-bold text-text-secondary uppercase">
                          COHORT
                        </span>
                        <span className="text-[10px] font-bold text-indigo-650 bg-indigo-55/15 px-2.5 py-0.5 rounded uppercase">
                          {bTasks.length} Tasks
                        </span>
                      </div>
                      <h4 className="text-lg font-black text-text-primary mt-1">{batch.name}</h4>
                    </div>

                    <div className="pt-3 border-t border-border flex justify-between items-center text-[10px] font-bold text-text-secondary">
                      <span>Status: {batch.status}</span>
                      <span>Capacity: {batch.capacity}</span>
                    </div>
                  </div>
                );
              })}
              {batches.length === 0 && !isLoading && (
                <div className="col-span-full p-8 text-center text-text-secondary bg-white border border-border rounded-2xl shadow-sm">
                  No cohorts found.
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        /* Candidates list and Task stats */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Candidates Column (Left) */}
          <div className="lg:col-span-1 bg-white border border-border rounded-2xl p-5 shadow-sm space-y-4">
            <div className="border-b pb-3">
              <button 
                onClick={() => { setSelectedBatch(null); setSelectedStudent(null); }} 
                className="text-[10px] font-bold text-indigo-600 hover:underline block"
              >
                ← Back to Cohorts
              </button>
              <h4 className="text-sm font-black text-text-primary mt-1">{selectedBatch.name} Candidates</h4>
            </div>

            <div className="space-y-2">
              {batchStudents.map(student => (
                <div 
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className={`p-3 border rounded-xl cursor-pointer transition-all flex items-center justify-between ${
                    selectedStudent?.id === student.id 
                      ? 'bg-slate-900 border-slate-850 text-white shadow' 
                      : 'bg-slate-50 border-border hover:border-secondary text-text-primary'
                  }`}
                >
                  <span className="text-xs font-bold">{student.name}</span>
                  <span className={`text-[10px] font-black ${
                    selectedStudent?.id === student.id ? 'text-indigo-300' : 'text-indigo-600'
                  }`}>
                    {batchTasks.length} Tasks
                  </span>
                </div>
              ))}
              {batchStudents.length === 0 && (
                <p className="text-xs text-text-secondary italic text-center py-12">No students found.</p>
              )}
            </div>
          </div>

          {/* Report Trace (Right) */}
          <div className="lg:col-span-2 space-y-6">
            {!selectedStudent ? (
              <div className="bg-white border border-border rounded-2xl p-16 text-center text-text-secondary italic shadow-sm">
                Select a candidate from the left panel to review their task completion history.
              </div>
            ) : (
              /* List of tasks for selected student */
              <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-black text-text-primary">{selectedStudent.name}'s Tasks</h3>
                  <p className="text-xs text-text-secondary mt-1">Review completion status for assigned tasks in {selectedBatch.name}.</p>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {batchTasks.map(task => {
                    const isOverdue = new Date(task.dueDate).getTime() < Date.now();
                    // Simulating a student's individual task status
                    const studentStatus = Math.random() > 0.5 ? 'completed' : (isOverdue ? 'missed' : 'pending');

                    return (
                      <div 
                        key={task.id}
                        className="p-5 border border-border rounded-2xl bg-slate-50/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-text-secondary">{task.id}</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-350" />
                            <span className={`text-[10px] font-bold px-2 py-0.2 rounded uppercase ${
                              isOverdue ? 'text-rose-650 bg-rose-55/15' : 'text-indigo-650 bg-indigo-55/15'
                            }`}>
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                          <h4 className="text-base font-black text-text-primary">{task.title}</h4>
                          <p className="text-xs text-text-secondary line-clamp-1">{task.description}</p>
                        </div>

                        <div className="flex items-center gap-4 shrink-0">
                          <span className={`text-[10px] font-black px-3 py-1 rounded border uppercase tracking-wider ${
                            studentStatus === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                            studentStatus === 'missed' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                            'bg-amber-50 text-amber-700 border-amber-100'
                          }`}>
                            {studentStatus === 'completed' ? 'Submitted' : studentStatus === 'missed' ? 'Missed' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  {batchTasks.length === 0 && (
                    <p className="text-xs text-text-secondary italic text-center py-8">No tasks assigned to this cohort.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
