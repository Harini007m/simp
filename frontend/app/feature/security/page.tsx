"use client";

import React from 'react';
import { Shield, ShieldAlert, Key, Activity, AlertTriangle, CheckCircle2, Lock, Monitor } from 'lucide-react';

export default function SecurityCenterPage() {
  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <span>Identity</span>
            <span className="text-slate-300">/</span>
            <span className="text-blue-600 font-extrabold">Security</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">Security Center</h2>
          <p className="text-xs text-slate-500 mt-1">
            Monitor authentication events and platform security posture.
          </p>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Sessions', value: 2, icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Failed Logins (24h)', value: 0, icon: ShieldAlert, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Locked Accounts', value: 0, icon: Lock, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Permission Coverage', value: '100%', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50' }
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-2xl font-bold text-slate-900">{kpi.value}</div>
                <div className="text-sm font-medium text-slate-500 mt-1">{kpi.label}</div>
              </div>
              <div className={`p-2 rounded-lg ${kpi.bg}`}>
                <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Login Activity Chart (Mock) */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4 text-blue-600" /> Login Activity Trend (Last 7 Days)
          </h3>
          <div className="h-48 flex items-end justify-between gap-2 border-b border-slate-100 pb-2">
            {[45, 52, 38, 65, 59, 48, 62].map((val, idx) => (
              <div key={idx} className="w-full relative group flex flex-col items-center justify-end h-full">
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 text-xs font-bold text-slate-700 bg-white shadow-sm border border-slate-200 px-2 py-1 rounded transition-opacity">
                  {val}
                </div>
                <div 
                  className="w-full bg-blue-500 rounded-t-sm transition-all hover:bg-blue-600" 
                  style={{ height: `${(val / 65) * 100}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-400">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* Failed Login Trend */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-amber-600" /> Failed Logins (Last 7 Days)
          </h3>
          <div className="h-48 flex items-end justify-between gap-2 border-b border-slate-100 pb-2">
            {[2, 0, 1, 4, 0, 0, 0].map((val, idx) => (
              <div key={idx} className="w-full relative group flex flex-col items-center justify-end h-full">
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 text-xs font-bold text-slate-700 bg-white shadow-sm border border-slate-200 px-2 py-1 rounded transition-opacity">
                  {val}
                </div>
                <div 
                  className={`w-full ${val > 0 ? 'bg-amber-500 hover:bg-amber-600' : 'bg-slate-200'} rounded-t-sm transition-all`} 
                  style={{ height: `${val === 0 ? 5 : (val / 4) * 100}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-400">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>
      </div>

      {/* Recent Security Events */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Recent Security Events</h3>
        <div className="space-y-4">
          {[
            { msg: 'New device login detected (MacBook Pro, San Francisco)', time: '2 hours ago', icon: Monitor, color: 'text-blue-500', bg: 'bg-blue-50' },
            { msg: 'Super Admin updated role permissions for "Recruiter"', time: '1 day ago', icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { msg: 'Failed login attempt from IP 192.168.1.100', time: '2 days ago', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' }
          ].map((event, idx) => (
            <div key={idx} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
              <div className={`p-2 rounded-lg shrink-0 ${event.bg}`}>
                <event.icon className={`h-4 w-4 ${event.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">{event.msg}</p>
                <p className="text-xs text-slate-500 mt-1">{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
