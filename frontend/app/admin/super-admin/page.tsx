"use client";

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Activity, Settings, List, Users, 
  Database, Server, HardDrive, AlertCircle, CheckCircle
} from 'lucide-react';
import { superAdminService } from '@/src/services/super-admin.service';
import { SystemSetting, AuditLog, RolePermission } from '@/src/data/mock-super-admin';

export default function SuperAdminPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'settings' | 'logs' | 'roles'>('dashboard');
  const [settings, setSettings] = useState<SystemSetting[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [roles, setRoles] = useState<RolePermission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [sysSettings, auditLogs, sysRoles] = await Promise.all([
      superAdminService.getSystemSettings(),
      superAdminService.getAuditLogs(),
      superAdminService.getRolePermissions()
    ]);
    setSettings(sysSettings);
    setLogs(auditLogs);
    setRoles(sysRoles);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-blue-600" />
            Super Admin Portal
          </h1>
          <p className="text-sm text-slate-500 mt-1">System configuration, audit logs, and global security.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100 text-sm font-semibold">
          <CheckCircle className="h-4 w-4" /> System Healthy
        </div>
      </div>

      <div className="flex border-b border-slate-200 bg-white px-6 shrink-0">
        {[
          { id: 'dashboard', label: 'System Health', icon: Activity },
          { id: 'settings', label: 'Global Settings', icon: Settings },
          { id: 'roles', label: 'Role Permissions', icon: Users },
          { id: 'logs', label: 'Audit Logs', icon: List }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-2 px-4 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === t.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <t.icon className="h-4 w-4" />
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {activeTab === 'dashboard' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 text-slate-500 mb-2">
                    <Users className="h-5 w-5" />
                    <span className="text-sm font-bold uppercase tracking-wider">Active Users</span>
                  </div>
                  <div className="text-3xl font-black text-slate-900">1,245</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 text-slate-500 mb-2">
                    <Database className="h-5 w-5" />
                    <span className="text-sm font-bold uppercase tracking-wider">DB Load</span>
                  </div>
                  <div className="text-3xl font-black text-emerald-600">24%</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 text-slate-500 mb-2">
                    <Server className="h-5 w-5" />
                    <span className="text-sm font-bold uppercase tracking-wider">API Uptime</span>
                  </div>
                  <div className="text-3xl font-black text-emerald-600">99.9%</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 text-slate-500 mb-2">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-sm font-bold uppercase tracking-wider">Failed Logins</span>
                  </div>
                  <div className="text-3xl font-black text-rose-600">12</div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <HardDrive className="h-5 w-5 text-blue-600" />
                  Storage & Infrastructure
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">App Server Memory</span>
                      <span className="text-slate-500">4.2 GB / 8 GB</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '52%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">Database Storage</span>
                      <span className="text-slate-500">12 GB / 50 GB</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '24%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">File Storage (S3)</span>
                      <span className="text-slate-500">450 GB / 1 TB</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 bg-slate-50">
                <h3 className="font-bold text-slate-800">Global Configuration</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {settings.map(s => (
                  <div key={s.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">{s.category}</span>
                      <span className="font-medium text-slate-900">{s.key}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <input type="text" defaultValue={s.value} className="border border-slate-200 rounded px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                      <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">Save</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'roles' && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 bg-slate-50">
                <h3 className="font-bold text-slate-800">Role Permissions Mapping</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {roles.map(r => (
                  <div key={r.role} className="p-5">
                    <h4 className="font-bold text-slate-900 mb-3">{r.role}</h4>
                    <div className="flex flex-wrap gap-2">
                      {r.permissions.map(p => (
                        <span key={p} className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 rounded-md text-xs font-medium font-mono">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <h3 className="font-bold text-slate-800">System Audit Trail</h3>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Export CSV</button>
              </div>
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                  <tr>
                    <th className="px-6 py-3">Timestamp</th>
                    <th className="px-6 py-3">Action</th>
                    <th className="px-6 py-3">User ID</th>
                    <th className="px-6 py-3">Entity</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {logs.map(l => (
                    <tr key={l.id} className="hover:bg-slate-50">
                      <td className="px-6 py-3 text-slate-500 whitespace-nowrap">{l.timestamp}</td>
                      <td className="px-6 py-3 font-medium text-slate-900 font-mono text-xs">{l.action}</td>
                      <td className="px-6 py-3 text-slate-600">{l.userId}</td>
                      <td className="px-6 py-3 text-slate-600">{l.entityType} ({l.entityId})</td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                          l.status === 'Success' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {l.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
