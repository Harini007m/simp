"use client";

import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, FileText, Clock, AlertTriangle, ChevronRight, TrendingUp, BarChart2, CheckCircle
} from 'lucide-react';

interface LocalTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  attempts: number;
  requirements: string[];
}

// Mock data removed

export default function TaskDashboardPage() {
  const [tasks, setTasks] = useState<LocalTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTasks() {
      setIsLoading(true);
      try {
        const { taskService } = await import('@/src/services/task.service');
        const data = await taskService.getTasks();
        setTasks(data as any || []);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadTasks();
  }, []);

  // Stats calculation
  const totalTasks = tasks.length;
  const overdueCount = tasks.filter((t: any) => new Date(t.dueDate).getTime() < Date.now()).length;
  const submissionRate = tasks.length > 0 
    ? Math.round((tasks.filter((t: any) => t.status !== 'pending').length / tasks.length) * 100) 
    : 0;

  return (
    <div className="space-y-6 animate-slide-in select-none">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-text-primary tracking-tight">Task Dashboard</h2>
        <p className="text-sm text-text-secondary mt-1">Audit published assignments, track student submission percentages, and monitor overdue milestones.</p>
      </div>

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

      {/* Published Tasks Directory */}
      <div className="space-y-4">
        <h3 className="font-bold text-xs text-text-secondary uppercase tracking-widest">Milestones Directory</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tasks.map((task: any) => {
            const isOverdue = new Date(task.dueDate).getTime() < Date.now();
            return (
              <div 
                key={task.id}
                className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:border-secondary transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-indigo-650 bg-indigo-55/15 px-2.5 py-0.5 rounded uppercase">
                      {task.id}
                    </span>
                    <span className={`text-[10px] font-bold ${isOverdue ? 'text-rose-600' : 'text-text-secondary'}`}>
                      Due: {task.dueDate}
                    </span>
                  </div>
                  <h4 className="text-base font-black text-text-primary mt-3">{task.title}</h4>
                  <p className="text-xs text-helper mt-1 leading-relaxed line-clamp-2">{task.description}</p>
                </div>

                <div className="pt-3 border-t border-border flex justify-between items-center text-[10px] font-bold text-text-secondary">
                  <span>Required: {task.requirements.join(', ')}</span>
                  <span>Attempts: {task.attempts}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
