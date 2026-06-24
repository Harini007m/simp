import React, { useState, useEffect } from 'react';
import { 
  Building2, Users, BookOpen, Briefcase, 
  Activity, CheckCircle, Clock, AlertTriangle 
} from 'lucide-react';
import { coordinatorService } from '@/src/services/coordinator.service';
import { Coordinator } from '@/src/data/mock-coordinators';

export default function CoordinatorDashboard() {
  const [coordinator, setCoordinator] = useState<Coordinator | null>(null);

  useEffect(() => {
    // In a real app, this would fetch the logged-in coordinator's data
    coordinatorService.getCoordinators().then(data => {
      if (data.length > 0) setCoordinator(data[0]);
    });
  }, []);

  if (!coordinator) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, {coordinator.name}</h1>
          <p className="text-slate-500">Here's what's happening at your college today.</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          <Building2 className="h-5 w-5 text-blue-600" />
          <span className="font-semibold text-slate-800">College ID: {coordinator.collegeId}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Assigned Students</div>
            <div className="text-3xl font-black text-slate-900">{coordinator.assignedStudentsCount}</div>
          </div>
          <div className="h-12 w-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Active Batches</div>
            <div className="text-3xl font-black text-slate-900">{coordinator.activeBatchesCount}</div>
          </div>
          <div className="h-12 w-12 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <BookOpen className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Placements</div>
            <div className="text-3xl font-black text-slate-900">{coordinator.placementsCount}</div>
          </div>
          <div className="h-12 w-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Briefcase className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Status</div>
            <div className={`text-xl font-black ${coordinator.status === 'Active' ? 'text-emerald-600' : 'text-slate-600'}`}>
              {coordinator.status}
            </div>
          </div>
          <div className={`h-12 w-12 rounded-lg ${coordinator.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-600'} flex items-center justify-center`}>
            <Activity className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Updates</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="mt-1 h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <CheckCircle className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-slate-900">New batch allocated</p>
                <p className="text-sm text-slate-500">Batch 12 has been successfully mapped to your college.</p>
                <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 h-8 w-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Placement report due</p>
                <p className="text-sm text-slate-500">Please submit the placement report for the outgoing batch.</p>
                <p className="text-xs text-slate-400 mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-left">
              <Users className="h-6 w-6 text-blue-600 mb-2" />
              <div className="font-medium text-slate-900">View Students</div>
              <div className="text-xs text-slate-500 mt-1">Manage assigned students</div>
            </button>
            <button className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-left">
              <Activity className="h-6 w-6 text-purple-600 mb-2" />
              <div className="font-medium text-slate-900">Performance</div>
              <div className="text-xs text-slate-500 mt-1">Check college metrics</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
