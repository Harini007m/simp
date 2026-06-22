import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import Link from 'next/link';
import { studentDashboardService } from '@/src/services/studentDashboard.service';
import { StudentDashboardData } from '@/src/data/mock-student-dashboard';

export default function StudentDashboard() {
  const [data, setData] = useState<StudentDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const dashboardData = await studentDashboardService.getDashboardData();
        setData(dashboardData);
      } catch (err) {
        console.error('Failed to load student dashboard', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !data) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    );
  }

  const { fees, kpiStats, announcements, capstoneStatus, courses, agenda: initialAgenda } = data;

  const [agenda, setAgenda] = useState(initialAgenda);

  const handleToggleAgendaItem = (id: string) => {
    setAgenda(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <div className="space-y-6 animate-slide-in pt-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Personal Modules Overview</h2>
          <p className="text-sm text-slate-500 mt-1">Your own active dashboard widgets across assigned modules.</p>
        </div>
      </div>

      {/* User KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Attendance Target', value: '88%', desc: 'Threshold is 85%', status: 'Normal', color: 'border-l-4 border-emerald-500' },
          { title: 'LMS Progress', value: '33%', desc: '3 active modules complete', status: 'Ahead', color: 'border-l-4 border-blue-600' },
          { 
            title: 'Pending Dues', 
            value: fees.total === 0 ? 'Free' : `₹${fees.balance.toLocaleString()}`, 
            desc: fees.total === 0 ? 'Free Internship (Non-Paying)' : 'Next pay due by 30th June', 
            status: fees.total === 0 ? 'No Fees' : 'Due', 
            color: fees.total === 0 ? 'border-l-4 border-emerald-500' : 'border-l-4 border-amber-500' 
          },
          { title: 'Current KPI Score', value: `${((kpiStats.technical + kpiStats.delivery + kpiStats.communication) / 3).toFixed(1)}/100`, desc: 'Updated weekly', status: 'Excellent', color: 'border-l-4 border-indigo-600' }
        ].map((stat, idx) => (
          <div 
            key={idx} 
            className={`bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300 ease-out cursor-pointer ${stat.color}`}
          >
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.title}</div>
            <div className="text-2xl font-black text-slate-800 mt-2 tracking-tight">{stat.value}</div>
            <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 mt-3 pt-2 border-t border-slate-100">
              <span>{stat.desc}</span>
              <span className="text-blue-600 font-bold uppercase tracking-wide">{stat.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Latest notices */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm hover:shadow-md hover:border-blue-500/20 transition-all duration-300">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Bell className="h-4 w-4 text-blue-600" />
                <span>Announcements</span>
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              {announcements.map((an: any, idx: number) => (
                <div key={idx} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
                    <span>{an.date}</span>
                    <span className="bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-sm">Official</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-850 hover:text-blue-600 transition-colors cursor-pointer">{an.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{an.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Capstone snippet */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-blue-500/30 transition-all duration-300">
            <div className="space-y-1.5">
              <div className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">Workspace Project</div>
              <h4 className="font-bold text-sm text-slate-800">Capstone Work: AI ERP Integration Portal</h4>
              <p className="text-xs text-slate-500">Status: <span className="text-amber-600 font-semibold">{capstoneStatus}</span>. Under Guide evaluation.</p>
            </div>
            <Link
              href="/admin/submission"
              className="w-full sm:w-auto px-4 py-2 border border-slate-200 hover:border-blue-600 hover:bg-blue-50 text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors shadow-sm text-center rounded-lg"
            >
              Open Workspace
            </Link>
          </div>

          {/* Quick performance widget */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all duration-300">
            <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3">
              LMS Track Progress
            </h3>
            <div className="space-y-3.5">
              {courses.slice(0, 2).map((course: any, idx: number) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-600 truncate max-w-[200px]">{course.title}</span>
                    <span className="text-blue-600">{course.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 overflow-hidden rounded-full">
                    <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Active schedule checklist */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all duration-300">
            <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3">
              Today&apos;s Agenda
            </h3>
            <ul className="space-y-3.5">
              {agenda.map((item: any) => (
                <li key={item.id} className="flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleToggleAgendaItem(item.id)}
                    className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
                  >
                    <span className={`h-4.5 w-4.5 rounded flex items-center justify-center transition-all border ${item.completed
                        ? 'bg-emerald-500 border-emerald-600 text-white'
                        : 'bg-white border-slate-300 group-hover:border-blue-500 text-transparent'
                      }`}>
                      ✓
                    </span>
                    <span className={`transition-colors duration-200 ${item.completed ? 'line-through text-slate-400' : 'text-slate-600 font-medium group-hover:text-slate-800'}`}>
                      {item.task}
                    </span>
                  </button>
                  <span className="text-[10px] text-slate-400 font-bold">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Internship Roadmap Progress */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-6 space-y-4 shadow-sm flex flex-col justify-between transition-all duration-300">
            <h3 className="font-bold text-xs text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-3">
              Internship Timeline
            </h3>
            <div className="flex items-center justify-around gap-4 py-2">
              <div className="relative h-24 w-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="40" strokeWidth="5" stroke="#f1f5f9" fill="transparent" />
                  <circle cx="48" cy="48" r="40" strokeWidth="5" stroke="#2563eb" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.50)} strokeLinecap="round" className="transition-all duration-1000" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-lg font-black text-slate-800">Week 6</span>
                  <span className="text-[7px] text-slate-400 font-bold uppercase">of 12 Weeks</span>
                </div>
              </div>
              <div className="text-xs space-y-1">
                <div className="font-bold text-slate-800">Timeline: 50% Complete</div>
                <div className="text-slate-500 font-medium">Enrolled: May 05, 2026</div>
                <div className="text-slate-500 font-semibold">Graduation: July 28, 2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
