"use client";

import React, { useEffect, useState } from 'react';
import { Shield, Search, Filter, Monitor, Smartphone, Globe, LogOut, Clock, Activity, AlertTriangle, AlertCircle } from 'lucide-react';
import { sessionService } from '@/src/services/session.service';
import { UserSession } from '@/src/data/mock-user-sessions';

export default function SessionsPage() {
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await sessionService.getSessions();
      setSessions(data);
    } catch (err) {
      console.error('Failed to load sessions', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTerminate = async (id: string) => {
    if (confirm('Are you sure you want to terminate this session?')) {
      await sessionService.terminateSession(id);
      loadData();
    }
  };

  const activeSessions = sessions.filter(s => s.status === 'Active');
  const filteredSessions = sessions.filter(s => 
    s.userId.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.ipAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <span>Identity</span>
            <span className="text-slate-300">/</span>
            <span className="text-blue-600 font-extrabold">Sessions</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">Session Monitoring</h2>
          <p className="text-xs text-slate-500 mt-1">
            Monitor and manage active user sessions across the platform.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800">{activeSessions.length}</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">Active Sessions</div>
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Monitor className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800">{sessions.length}</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">Total Sessions (24h)</div>
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800">0</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">Suspicious Logins</div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by User ID or IP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Device & Browser</th>
                <th className="px-6 py-3">Location & IP</th>
                <th className="px-6 py-3">Last Activity</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSessions.map((session) => (
                <tr key={session.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{session.userId}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {session.device.includes('iPhone') || session.device.includes('Mobile') ? <Smartphone className="h-4 w-4 text-slate-400" /> : <Monitor className="h-4 w-4 text-slate-400" />}
                      <div>
                        <div className="text-slate-900">{session.device}</div>
                        <div className="text-xs text-slate-500">{session.os} • {session.browser}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-slate-900">{session.location}</span>
                      <span className="text-xs text-slate-500 font-mono">{session.ipAddress}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-slate-600">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{new Date(session.lastActivity).toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${session.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                      {session.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {session.status === 'Active' && (
                      <button 
                        onClick={() => handleTerminate(session.id)}
                        className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                      >
                        Force Logout
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredSessions.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <AlertCircle className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                    <p>No sessions found.</p>
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
