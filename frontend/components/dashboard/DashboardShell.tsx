"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/admin/ui/Card';
import { Badge } from '@/components/admin/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/admin/ui/Table';
import {
  Users, Shield, UserCheck, LayoutGrid, Clock, ArrowRight, ChevronRight,
  LayoutDashboard, Package, FileText, CheckSquare, Award, MonitorPlay,
  UsersRound, Calendar, PieChart, Briefcase, Network, Settings,
  Building2, GraduationCap, FolderOpen, Activity, AlertTriangle,
  BookOpen, Bell, Cpu, HardDrive, ShieldCheck, TrendingUp, CheckCircle,
  FileCheck, AlertCircle, AwardIcon, UserCheck2, ListTodo, Star
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useAuth } from '@/src/context/AuthContext';
import { usePermissions } from '@/src/hooks/usePermissions';
import { userService } from '@/src/services/user.service';
import { roleService } from '@/src/services/role.service';
import { moduleService } from '@/src/services/module.service';
import { User } from '@/src/data/mock-users';
import { Module } from '@/src/data/mock-modules';

// Map module IDs to Lucide icons
const iconMap: Record<string, LucideIcon> = {
  identity: Shield,
  employee: Users,
  organization: Building2,
  program: GraduationCap,
  opportunity: Briefcase,
  application: FileText,
  student: UsersRound,
  batch: Package,
  allocation: Network,
  mentor: Award,
  lms: MonitorPlay,
  task: CheckSquare,
  assessment: FileText,
  submission: Package,
  attendance: Calendar,
  performance: PieChart,
  college_coordinator: Users,
  dashboard: LayoutDashboard,
  common_file: FolderOpen,
  super_admin: Settings,
};

// ─────────────────────────────────────────────────────────────────────────────
// SUPER ADMIN WIDGETS
// ─────────────────────────────────────────────────────────────────────────────
function SuperAdminWidgets({ modules }: { modules: Module[] }) {
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, totalRoles: 0, totalModules: 0 });
  const [recentUsers, setRecentUsers] = useState<User[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const [usersData, rolesData, modulesData] = await Promise.all([
          userService.getUsers(),
          roleService.getRoles(),
          moduleService.getModules(),
        ]);
        setStats({
          totalUsers: usersData.length,
          activeUsers: usersData.filter(u => u.status === 'Active').length,
          totalRoles: rolesData.length,
          totalModules: modulesData.length,
        });
        setRecentUsers(usersData.slice(0, 4));
      } catch (err) {
        console.error('Failed to load KPI data', err);
      }
    }
    load();
  }, []);

  const systemHealth = [
    { name: 'API Server Latency', status: 'Optimal', value: '18ms', color: 'text-emerald-500' },
    { name: 'Database CPU Load', status: 'Healthy', value: '12%', color: 'text-emerald-500' },
    { name: 'Storage Available', status: 'Healthy', value: '74.2 GB', color: 'text-emerald-500' },
    { name: 'Platform Version', status: 'Up to Date', value: 'v2.4.1', color: 'text-blue-500' },
  ];

  const recentActivity = [
    { id: 1, action: 'User Created', target: 'John Doe', time: '2 mins ago', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50 border border-blue-100' },
    { id: 2, action: 'Role Updated', target: 'Mentor Role Permissions', time: '1 hour ago', icon: Shield, color: 'text-amber-500', bg: 'bg-amber-50 border border-amber-100' },
    { id: 3, action: 'Module Activated', target: 'LMS Module mapping', time: '3 hours ago', icon: LayoutGrid, color: 'text-emerald-500', bg: 'bg-emerald-50 border border-emerald-100' },
    { id: 4, action: 'Audit Logs Rotated', target: 'System Cleanup', time: '5 hours ago', icon: Activity, color: 'text-indigo-500', bg: 'bg-indigo-50 border border-indigo-100' },
  ];

  const pendingReviews = [
    { id: 1, type: 'Module Request', detail: 'HR requested access to Identity Module', status: 'Pending', time: '2h ago' },
    { id: 2, type: 'Security Violation', detail: 'Invalid login spike on coordinator account', status: 'Warning', time: '4h ago' },
    { id: 3, type: 'API Key Rotate', detail: 'Stripe webhook key due for rotation', status: 'Action Needed', time: '1d ago' },
  ];

  const auditLogs = [
    { id: 'log-01', user: 'superadmin@pinesphere.com', action: 'ASSIGN_ROLE', details: 'Assigned Coordinator to Priya Sharma', time: '10:14 AM' },
    { id: 'log-02', user: 'hr@pinesphere.com', action: 'CREATE_BATCH', details: 'Created Full Stack batch FSD-2026', time: '09:45 AM' },
    { id: 'log-03', user: 'mentor@pinesphere.com', action: 'MARK_ATTENDANCE', details: 'Marked attendance for Batch mapping', time: '08:30 AM' },
  ];

  return (
    <div className="space-y-6">
      {/* System KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Total Users', value: stats.totalUsers, icon: Users, change: '+12%', changeType: 'positive' },
          { title: 'Total Roles', value: stats.totalRoles, icon: Shield, change: '0%', changeType: 'neutral' },
          { title: 'Active Users', value: stats.activeUsers, icon: UserCheck, change: '+5%', changeType: 'positive' },
          { title: 'Total Modules', value: stats.totalModules, icon: LayoutGrid, change: '+2', changeType: 'positive' },
        ].map((kpi, idx) => (
          <Card key={idx} className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{kpi.title}</p>
                  <p className="text-3xl font-black text-slate-800 mt-2 tracking-tight">{kpi.value}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                  <kpi.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs font-semibold text-slate-500">
                <span className={kpi.changeType === 'positive' ? 'text-emerald-600 font-bold' : 'text-slate-500 font-bold'}>
                  {kpi.change}
                </span>
                <span className="ml-1.5 font-medium">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Health */}
      <Card className="border border-slate-100 bg-white shadow-sm">
        <div className="p-5 border-b border-slate-100 flex items-center gap-2">
          <Cpu className="h-5 w-5 text-indigo-500" />
          <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">System Health Center</h3>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemHealth.map((sys, idx) => (
              <div key={idx} className="flex flex-col p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{sys.name}</span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-xl font-extrabold text-slate-800">{sys.value}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${sys.color}`}>{sys.status}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Statistics & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Statistics */}
        <Card className="lg:col-span-2 border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UsersRound className="h-5 w-5 text-blue-500" />
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">User Statistics Registry</h3>
              </div>
              <Link href="/admin/users" className="text-xs font-bold text-blue-600 hover:text-blue-500 transition-colors flex items-center gap-1">
                View All <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">User</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Role</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Status</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Joined Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 border border-slate-200">{user.avatar}</div>
                          <span className="font-bold text-slate-800 text-xs">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell><span className="text-xs text-slate-500 font-semibold">{user.roleName}</span></TableCell>
                      <TableCell><Badge variant={user.status === 'Active' ? 'success' : 'secondary'}>{user.status}</Badge></TableCell>
                      <TableCell><span className="text-xs text-slate-400 font-medium">{user.date}</span></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </div>
        </Card>

        {/* Recent Activities */}
        <Card className="border border-slate-100 bg-white shadow-sm">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2">
            <Clock className="h-5 w-5 text-indigo-500" />
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Recent Activities</h3>
          </div>
          <CardContent className="p-6">
            <div className="space-y-6">
              {recentActivity.map((activity, index) => (
                <div key={activity.id} className="flex gap-4 relative">
                  {index !== recentActivity.length - 1 && (
                    <div className="absolute left-[19px] top-10 bottom-[-24px] w-px bg-slate-150" />
                  )}
                  <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activity.bg}`}>
                    <activity.icon className={`h-5 w-5 ${activity.color}`} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-xs font-bold text-slate-800">{activity.action}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{activity.target}</p>
                    <p className="text-[9px] text-slate-400 font-semibold mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Reviews & Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Reviews */}
        <Card className="border border-slate-100 bg-white shadow-sm">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Pending System Reviews</h3>
          </div>
          <CardContent className="p-6">
            <div className="space-y-4">
              {pendingReviews.map((rev) => (
                <div key={rev.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-600 px-2 py-0.5 rounded">{rev.type}</span>
                    <p className="text-xs text-slate-700 font-semibold mt-2">{rev.detail}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">{rev.status}</span>
                    <p className="text-[9px] text-slate-400 mt-1">{rev.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Audit Logs */}
        <Card className="border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-slate-500" />
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">System Audit Logs</h3>
              </div>
              <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">Live Feed</span>
            </div>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">User</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Action</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Details</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="text-xs font-bold text-slate-700">{log.user}</TableCell>
                      <TableCell>
                        <Badge variant={log.action === 'ASSIGN_ROLE' ? 'default' : 'secondary'} className="text-[9px]">
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-slate-500 font-medium">{log.details}</TableCell>
                      <TableCell className="text-xs text-slate-400 font-medium">{log.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Module Registry Grid */}
      <div className="space-y-4 pt-2 animate-fade-in">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">ERP Module Registry</h2>
          <Badge variant="secondary">{modules.length} Active Modules</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map((module) => {
            const IconComponent = iconMap[module.id] || LayoutGrid;
            const href = module.route === '/admin' ? '/admin' : `/admin${module.route}`;
            return (
              <Link key={module.id} href={href} className="block group">
                <Card className="h-full transition-all hover:shadow-md hover:border-blue-500/30 bg-white border border-slate-100">
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors border border-blue-100/50">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <Badge variant={module.active ? 'success' : 'secondary'} className="text-[9px]">
                        {module.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-1">
                      {module.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 flex-grow">
                      {module.desc || `Manage ${module.name.toLowerCase()} functionality.`}
                    </p>
                    <div className="mt-4 flex items-center text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Open Module <ArrowRight className="h-3 w-3 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HR WIDGETS
// ─────────────────────────────────────────────────────────────────────────────
function HRWidgets() {
  const kpis = [
    { title: 'Recruitment Funnel', value: '42 Active', desc: 'Candidates in review', icon: Briefcase, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
    { title: 'Time-to-Hire', value: '18 Days', desc: 'ERP Target: 20 days', icon: Clock, color: 'text-amber-600 bg-amber-50 border-amber-100' },
    { title: 'Placement Ratio', value: '94.2%', desc: 'Ahead of last year (+1.2%)', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    { title: 'Open Offers', value: '9 Pending', desc: 'Awaiting signature', icon: FileCheck, color: 'text-rose-600 bg-rose-50 border-rose-100' },
  ];

  const applications = [
    { name: 'Arjun Mehta', role: 'Cloud Consultant Intern', status: 'Interviewing', date: 'June 25' },
    { name: 'Kritika Roy', role: 'Full Stack Engineer Intern', status: 'Offer Extended', date: 'June 24' },
    { name: 'Siddharth Sen', role: 'AI Engineering Intern', status: 'Screened', date: 'June 22' },
  ];

  const programs = [
    { name: 'Digital Leaders Academy', type: 'Full-Time Internship', duration: '6 Months', status: 'Ongoing' },
    { name: 'Global DevOps Cohort', type: 'Specialized Boot camp', duration: '3 Months', status: 'Launching Soon' },
    { name: 'Cloud Infrastructure Specialization', type: 'Corporate Training', duration: '4 Months', status: 'Ongoing' },
  ];

  const organizations = [
    { name: 'Apex Tech Solutions', size: 'Enterprise', partnerSince: '2024', status: 'Premium' },
    { name: 'Starlight Ventures', size: 'Scale-up', partnerSince: '2025', status: 'Active' },
    { name: 'Blue Ridge Labs', size: 'R&D Lab', partnerSince: '2023', status: 'Active' },
  ];

  const batchStats = [
    { id: 'FSD-2026-A', size: '28 Students', mentor: 'Rahul Verma', status: 'On Track' },
    { id: 'AI-ML-2026-B', size: '20 Students', mentor: 'Srinivas Murthy', status: 'Midterms' },
    { id: 'DEVOPS-25-C', size: '24 Students', mentor: 'Rahul Verma', status: 'Graduated' },
  ];

  return (
    <div className="space-y-6">
      {/* Recruitment KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, idx) => (
          <Card key={idx} className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-3 rounded-xl border shrink-0 ${kpi.color}`}>
                <kpi.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{kpi.title}</p>
                <h3 className="text-2xl font-black text-slate-800 mt-1 tracking-tight">{kpi.value}</h3>
                <p className="text-[10px] text-slate-500 font-semibold mt-1">{kpi.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Applications */}
        <Card className="border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Candidate Applications</h3>
              </div>
              <Link href="/admin/application" className="text-xs font-bold text-blue-600 hover:text-blue-500 transition-colors flex items-center gap-1">
                Manage Applications <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Candidate</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Role</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Status</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Applied</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="text-xs font-bold text-slate-800">{app.name}</TableCell>
                      <TableCell className="text-xs text-slate-500 font-semibold">{app.role}</TableCell>
                      <TableCell>
                        <Badge variant={app.status === 'Offer Extended' ? 'success' : 'default'} className="text-[9px]">
                          {app.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-slate-400 font-medium">{app.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </div>
        </Card>

        {/* Employees */}
        <Card className="border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald-500" />
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Strategic Employees</h3>
              </div>
              <Link href="/admin/employee" className="text-xs font-bold text-blue-600 hover:text-blue-500 transition-colors flex items-center gap-1">
                All Employees <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Name</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Role</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: 'Vikram Joshi', role: 'Principal Recruiter', status: 'Active' },
                    { name: 'Sneha Rao', role: 'HR Operations Lead', status: 'Active' },
                    { name: 'Karan Malhotra', role: 'Talent Acquisition Partner', status: 'On Leave' },
                  ].map((emp, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="text-xs font-bold text-slate-800">{emp.name}</TableCell>
                      <TableCell className="text-xs text-slate-500 font-semibold">{emp.role}</TableCell>
                      <TableCell><Badge variant={emp.status === 'Active' ? 'success' : 'secondary'}>{emp.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Programs */}
        <Card className="border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-indigo-500" />
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Corporate Programs</h3>
              </div>
              <Link href="/admin/program" className="text-xs font-bold text-blue-600 hover:text-blue-500 transition-colors flex items-center gap-1">
                Explore Programs <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Program</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Format</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Duration</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {programs.map((prog, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="text-xs font-bold text-slate-800">{prog.name}</TableCell>
                      <TableCell className="text-xs text-slate-500 font-medium">{prog.type}</TableCell>
                      <TableCell className="text-xs text-slate-400 font-semibold">{prog.duration}</TableCell>
                      <TableCell><Badge variant={prog.status === 'Ongoing' ? 'success' : 'secondary'}>{prog.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </div>
        </Card>

        {/* Organizations */}
        <Card className="border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-slate-500" />
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Affiliated Organizations</h3>
              </div>
              <Link href="/admin/organization" className="text-xs font-bold text-blue-600 hover:text-blue-500 transition-colors flex items-center gap-1">
                All Companies <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Company</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Tier</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Joined</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {organizations.map((org, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="text-xs font-bold text-slate-800">{org.name}</TableCell>
                      <TableCell className="text-xs text-slate-500 font-medium">{org.size}</TableCell>
                      <TableCell className="text-xs text-slate-400 font-semibold">{org.partnerSince}</TableCell>
                      <TableCell>
                        <Badge variant={org.status === 'Premium' ? 'default' : 'secondary'} className="text-[9px]">
                          {org.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Students */}
        <Card className="border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UsersRound className="h-5 w-5 text-emerald-500" />
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Student Overview</h3>
              </div>
              <Link href="/admin/student" className="text-xs font-bold text-blue-600 hover:text-blue-500 transition-colors flex items-center gap-1">
                Students Panel <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Name</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Email</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Batch</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: 'Ananya Desai', email: 'student@pinesphere.com', batch: 'FSD-2026-A' },
                    { name: 'Alice Freeman', email: 'alice@example.com', batch: 'FSD-2026-A' },
                    { name: 'Evan Wright', email: 'evan@example.com', batch: 'AI-ML-2026-B' },
                  ].map((std, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="text-xs font-bold text-slate-800">{std.name}</TableCell>
                      <TableCell className="text-xs text-slate-500 font-semibold">{std.email}</TableCell>
                      <TableCell><span className="text-xs text-slate-400 font-bold">{std.batch}</span></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </div>
        </Card>

        {/* Batch Statistics */}
        <Card className="border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-500" />
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Cohort Batch Statistics</h3>
              </div>
              <Link href="/admin/batch" className="text-xs font-bold text-blue-600 hover:text-blue-500 transition-colors flex items-center gap-1">
                Batches <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Batch ID</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Enrollment</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Lead Mentor</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batchStats.map((bat, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="text-xs font-bold text-slate-800">{bat.id}</TableCell>
                      <TableCell className="text-xs text-slate-500 font-medium">{bat.size}</TableCell>
                      <TableCell className="text-xs text-slate-400 font-semibold">{bat.mentor}</TableCell>
                      <TableCell>
                        <Badge variant={bat.status === 'On Track' || bat.status === 'Graduated' ? 'success' : 'secondary'}>
                          {bat.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MENTOR WIDGETS
// ─────────────────────────────────────────────────────────────────────────────
function MentorWidgets() {
  const kpis = [
    { title: 'Assigned Students', value: '12 Active', icon: UsersRound, color: 'bg-blue-50 text-blue-600 border border-blue-100' },
    { title: 'Attendance Rate', value: '92.5%', icon: Calendar, color: 'bg-emerald-50 text-emerald-600 border border-emerald-100' },
    { title: 'Pending Evaluations', value: '5 Submissions', icon: FileText, color: 'bg-amber-50 text-amber-600 border border-amber-100' },
    { title: 'Upcoming Reviews', value: '4 Slated', icon: CheckSquare, color: 'bg-indigo-50 text-indigo-600 border border-indigo-100' },
  ];

  const students = [
    { name: 'Ananya Desai', email: 'student@pinesphere.com', attendance: '96%', performance: 'Outstanding' },
    { name: 'Alice Freeman', email: 'alice@example.com', attendance: '88%', performance: 'Meeting Expectations' },
    { name: 'Evan Wright', email: 'evan@example.com', attendance: '72%', performance: 'Needs Attention' },
  ];

  const pendingReviews = [
    { id: 1, student: 'Ananya Desai', item: 'Task: Responsive ERP Dashboard Build', due: '1h ago', category: 'Task' },
    { id: 2, student: 'Alice Freeman', item: 'Assessment: Next.js Server Components', due: '3h ago', category: 'Assessment' },
    { id: 3, student: 'Evan Wright', item: 'Task: API Integration Layer', due: 'Yesterday', category: 'Task' },
  ];

  return (
    <div className="space-y-6">
      {/* Mentor KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, idx) => (
          <Card key={idx} className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-3 rounded-lg shrink-0 ${kpi.color}`}>
                <kpi.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{kpi.title}</p>
                <h3 className="text-2xl font-black text-slate-800 mt-1 tracking-tight">{kpi.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assigned Students */}
        <Card className="border border-slate-100 bg-white shadow-sm">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UsersRound className="h-5 w-5 text-blue-500" />
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Assigned Students</h3>
            </div>
            <Link href="/admin/student" className="text-xs font-bold text-blue-600 hover:text-blue-500 transition-colors flex items-center gap-1">
              Student list <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Student</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Attendance</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <div>
                        <div className="text-xs font-bold text-slate-850">{student.name}</div>
                        <div className="text-[10px] text-slate-400">{student.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs font-bold text-slate-700">{student.attendance}</TableCell>
                    <TableCell>
                      <Badge variant={student.performance === 'Outstanding' ? 'success' : student.performance === 'Needs Attention' ? 'secondary' : 'default'} className="text-[9px]">
                        {student.performance}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pending Reviews */}
        <Card className="border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-100 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Pending Student Reviews</h3>
            </div>
            <div className="p-6 space-y-4">
              {pendingReviews.map((rev) => (
                <div key={rev.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-200 text-slate-600 px-2 py-0.5 rounded">{rev.category}</span>
                    <p className="text-xs text-slate-750 font-bold mt-2">{rev.item}</p>
                    <p className="text-[10px] text-slate-400 mt-1">Submitted by: {rev.student}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Awaiting Grade</span>
                    <p className="text-[9px] text-slate-400 mt-1">{rev.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks Assigned */}
        <Card className="border border-slate-100 bg-white shadow-sm">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-indigo-500" />
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Active Tasks</h3>
          </div>
          <CardContent className="p-4 space-y-3">
            {[
              { title: 'Responsive ERP Dashboard Build', deadline: 'Due in 2 days', status: 'Active' },
              { title: 'Implement JWT Auth Guards', deadline: 'Due in 5 days', status: 'Active' },
              { title: 'Create SQL Relations & Schemas', deadline: 'Closed', status: 'Inactive' },
            ].map((tsk, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-150">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{tsk.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-1 font-semibold">{tsk.deadline}</p>
                </div>
                <Badge variant={tsk.status === 'Active' ? 'default' : 'secondary'} className="text-[9px]">{tsk.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Assessments Published */}
        <Card className="border border-slate-100 bg-white shadow-sm">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-500" />
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Assessments</h3>
          </div>
          <CardContent className="p-4 space-y-3">
            {[
              { title: 'Next.js Server Components API Quiz', submissions: '8/12 graded', status: 'Active' },
              { title: 'PostgreSQL Join Operations Exam', submissions: '0/12 submitted', status: 'Upcoming' },
              { title: 'Vanilla CSS Design Test', submissions: '12/12 graded', status: 'Completed' },
            ].map((assess, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-150">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{assess.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-1 font-semibold">{assess.submissions}</p>
                </div>
                <Badge variant={assess.status === 'Active' ? 'default' : assess.status === 'Completed' ? 'success' : 'secondary'} className="text-[9px]">{assess.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Performance metrics summary */}
        <Card className="border border-slate-100 bg-white shadow-sm">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2">
            <PieChart className="h-5 w-5 text-indigo-500" />
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Class Performance Summary</h3>
          </div>
          <CardContent className="p-6 flex flex-col justify-center items-center h-[200px]">
            <div className="text-4xl font-black text-slate-800">84.5%</div>
            <p className="text-xs text-slate-400 font-bold mt-2 uppercase tracking-wide">Average Score</p>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-6">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '84.5%' }} />
            </div>
            <div className="flex justify-between w-full text-[10px] font-bold text-slate-400 mt-2">
              <span>Class target: 80%</span>
              <span className="text-emerald-600 font-black">+4.5%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STUDENT WIDGETS
// ─────────────────────────────────────────────────────────────────────────────
function StudentWidgets() {
  const kpis = [
    { title: 'Personal Attendance', value: '96%', desc: 'Threshold is 85%', status: 'Normal', color: 'border-l-4 border-emerald-500' },
    { title: 'LMS Progress', value: '85%', desc: '6 courses complete', status: 'Ahead', color: 'border-l-4 border-blue-600' },
    { title: 'Pending Tasks', value: '2 Tasks', desc: 'Due this weekend', status: 'Active', color: 'border-l-4 border-amber-500' },
    { title: 'Cumulative Marks', value: '88/100', desc: 'Updated 2h ago', status: 'Excellent', color: 'border-l-4 border-indigo-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Student stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((stat, idx) => (
          <div key={idx} className={`bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-all duration-300 ${stat.color}`}>
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
        {/* My Program */}
        <Card className="border border-slate-100 bg-white shadow-sm">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-blue-500" />
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">My Program</h3>
          </div>
          <CardContent className="p-6 space-y-4">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded">Enrolled</span>
              <h4 className="text-base font-bold text-slate-800 mt-2">Digital Leaders Academy</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Full Stack Engineering track with focus on Enterprise Systems, React performance patterns, and backend architectures.</p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Duration:</span>
              <span className="text-slate-800 font-bold">6 Months</span>
            </div>
          </CardContent>
        </Card>

        {/* My Batch */}
        <Card className="border border-slate-100 bg-white shadow-sm">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2">
            <Package className="h-5 w-5 text-indigo-500" />
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">My Batch</h3>
          </div>
          <CardContent className="p-6 space-y-4">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 border border-indigo-100 px-2 py-0.5 rounded">Cohort ID</span>
              <h4 className="text-base font-bold text-slate-800 mt-2">FSD-2026-A</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Lectures: Mon-Fri (09:00 AM - 01:00 PM)<br />Lab Sync: Alternate Saturdays</p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Cohort size:</span>
              <span className="text-slate-800 font-bold">28 Candidates</span>
            </div>
          </CardContent>
        </Card>

        {/* My Mentor */}
        <Card className="border border-slate-100 bg-white shadow-sm">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">My Mentor</h3>
          </div>
          <CardContent className="p-6 flex flex-col justify-between h-[160px]">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                RV
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-800 truncate">Rahul Verma</h4>
                <p className="text-xs text-slate-500 mt-0.5 truncate">mentor@pinesphere.com</p>
              </div>
            </div>
            <button className="w-full text-center py-2 bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">
              Schedule Sync
            </button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Tasks list */}
        <Card className="border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-slate-500" />
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">My Tasks</h3>
              </div>
              <Link href="/admin/task" className="text-xs font-bold text-blue-600 hover:text-blue-500 transition-colors flex items-center gap-1">
                View Tasks <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <CardContent className="p-4 space-y-3">
              {[
                { name: 'Task 04: Responsive ERP Dashboard Build', status: 'Pending Submit', date: 'Due June 28' },
                { name: 'Task 03: API JWT Authentication Layer', status: 'Graded', date: '92/100' },
                { name: 'Task 02: Relational DB Schema setup', status: 'Graded', date: '88/100' },
              ].map((tsk, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-150 rounded-xl">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 truncate max-w-[200px]">{tsk.name}</h4>
                    <p className="text-[9px] text-slate-400 font-semibold mt-1">{tsk.date}</p>
                  </div>
                  <Badge variant={tsk.status === 'Graded' ? 'success' : 'secondary'} className="text-[9px]">{tsk.status}</Badge>
                </div>
              ))}
            </CardContent>
          </div>
        </Card>

        {/* Student Assessments list */}
        <Card className="border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-slate-500" />
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">My Assessments</h3>
              </div>
              <Link href="/admin/assessment" className="text-xs font-bold text-blue-600 hover:text-blue-500 transition-colors flex items-center gap-1">
                All Assessments <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <CardContent className="p-4 space-y-3">
              {[
                { name: 'Assessment 02: Next.js SSR Mechanics', score: 'Awaiting Evaluation', status: 'Submitted' },
                { name: 'Assessment 01: CSS Custom Variables', score: '85%', status: 'Graded' },
                { name: 'Diagnostic Test: Basic Javascript', score: '90%', status: 'Graded' },
              ].map((assess, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-150 rounded-xl">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 truncate max-w-[200px]">{assess.name}</h4>
                    <p className="text-[9px] text-slate-400 font-semibold mt-1">{assess.score}</p>
                  </div>
                  <Badge variant={assess.status === 'Graded' ? 'success' : 'default'} className="text-[9px]">{assess.status}</Badge>
                </div>
              ))}
            </CardContent>
          </div>
        </Card>

        {/* Performance Breakdown */}
        <Card className="border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-100 flex items-center gap-2">
              <PieChart className="h-5 w-5 text-slate-500" />
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Performance Breakdown</h3>
            </div>
            <CardContent className="p-6 space-y-4">
              {[
                { skill: 'Technical Skills', score: 88, color: 'bg-blue-600' },
                { skill: 'Delivery & Reliability', score: 92, color: 'bg-emerald-500' },
                { skill: 'Communication & Sync', score: 85, color: 'bg-indigo-600' },
              ].map((perf, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-600">
                    <span>{perf.skill}</span>
                    <span className="font-bold">{perf.score}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full">
                    <div className={`${perf.color} h-1.5 rounded-full`} style={{ width: `${perf.score}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Learning Progress (LMS) */}
      <Card className="border border-slate-100 bg-white shadow-sm">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MonitorPlay className="h-5 w-5 text-blue-500" />
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">LMS Courses & Learning Progress</h3>
          </div>
          <Link href="/admin/lms" className="text-xs font-bold text-blue-600 hover:text-blue-500 transition-colors flex items-center gap-1">
            Access LMS <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'React Performance optimization', completed: 8, total: 10, percent: 80 },
              { title: 'Next.js Routing & Data Fetching', completed: 4, total: 8, percent: 50 },
              { title: 'Relational Database Queries & Schema', completed: 2, total: 8, percent: 25 },
            ].map((course, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-150 rounded-xl flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{course.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-1 font-semibold">{course.completed} of {course.total} Modules complete</p>
                </div>
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-[9px] font-bold text-slate-500">
                    <span>Progress</span>
                    <span>{course.percent}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${course.percent}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COLLEGE COORDINATOR WIDGETS
// ─────────────────────────────────────────────────────────────────────────────
function CoordinatorWidgets() {
  const kpis = [
    { title: 'Registered Students', value: '145 Candidates', icon: UsersRound, color: 'text-violet-600 bg-violet-50 border-violet-100' },
    { title: 'Active Cohort Batches', value: '6 Batches', icon: Package, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
    { title: 'Average Attendance', value: '88.5%', icon: Calendar, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    { title: 'Placement Ratio', value: '72.4%', icon: TrendingUp, color: 'text-blue-600 bg-blue-50 border-blue-100' },
  ];

  const students = [
    { name: 'Karan Mehra', program: 'Full Stack Engineering', performance: '92%', status: 'Placed' },
    { name: 'Riya Gupta', program: 'AI Engineering', performance: '84%', status: 'Interviewing' },
    { name: 'Amit Verma', program: 'Cloud DevOps Specialization', performance: '75%', status: 'In Training' },
  ];

  const placementStats = [
    { metric: 'Students Placed', value: '105 Students', detail: 'Out of 145 registered', progress: 72.4 },
    { metric: 'Average Package Offered', value: '6.8 LPA', detail: 'ERP Target: 6.0 LPA', progress: 100 },
    { metric: 'Top Recruiter', value: 'PineSphere Corp', detail: '42 Candidates hired', progress: 100 },
  ];

  const activities = [
    { id: 1, text: 'Approved bulk attendance validation requests', time: '1h ago' },
    { id: 2, text: 'Updated placement details for 4 candidates', time: '3h ago' },
    { id: 3, text: 'Scheduled batch orientation with HR Priya Sharma', time: 'Yesterday' },
  ];

  return (
    <div className="space-y-6">
      {/* Coordinator KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, idx) => (
          <Card key={idx} className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-3 rounded-xl border shrink-0 ${kpi.color}`}>
                <kpi.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{kpi.title}</p>
                <h3 className="text-2xl font-black text-slate-800 mt-1 tracking-tight">{kpi.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Students list */}
        <Card className="border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-violet-500" />
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">College Students Tracker</h3>
              </div>
              <Link href="/admin/student" className="text-xs font-bold text-blue-600 hover:text-blue-500 transition-colors flex items-center gap-1">
                Manage Students <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Candidate</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Program</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Marks Avg</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Placement</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="text-xs font-bold text-slate-800">{student.name}</TableCell>
                      <TableCell className="text-xs text-slate-500 font-semibold">{student.program}</TableCell>
                      <TableCell className="text-xs text-slate-450 font-bold">{student.performance}</TableCell>
                      <TableCell>
                        <Badge variant={student.status === 'Placed' ? 'success' : 'default'} className="text-[9px]">
                          {student.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </div>
        </Card>

        {/* Placement Statistics */}
        <Card className="border border-slate-100 bg-white shadow-sm">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2">
            <PieChart className="h-5 w-5 text-indigo-500" />
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Placement Analytics</h3>
          </div>
          <CardContent className="p-6 space-y-6">
            {placementStats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-slate-700">{stat.metric}</span>
                  <span className="text-sm font-black text-slate-900">{stat.value}</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">{stat.detail}</p>
                {stat.progress < 100 && (
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${stat.progress}%` }} />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Programs Coordinators deals with */}
        <Card className="border border-slate-100 bg-white shadow-sm">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-indigo-500" />
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Affiliated Programs</h3>
          </div>
          <CardContent className="p-4 space-y-3">
            {[
              { name: 'Full Stack Engineering', enrolled: '65 Students enrolled' },
              { name: 'AI Engineering Track', enrolled: '42 Students enrolled' },
              { name: 'Cloud Infrastructure Specialization', enrolled: '38 Students enrolled' },
            ].map((prog, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-150 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{prog.name}</h4>
                  <p className="text-[10px] text-slate-400 mt-1 font-semibold">{prog.enrolled}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-300" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Applications Status tracker */}
        <Card className="border border-slate-100 bg-white shadow-sm">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-500" />
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">College Applications Summary</h3>
          </div>
          <CardContent className="p-6 flex flex-col justify-around h-[200px] pt-4">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
              <span>Hired / Offered</span>
              <span className="font-black text-slate-800">42 Candidates</span>
            </div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
              <span>Active Interviewing</span>
              <span className="font-black text-slate-800">18 Candidates</span>
            </div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
              <span>Applied / Screened</span>
              <span className="font-black text-slate-800">22 Candidates</span>
            </div>
            <div className="w-full bg-slate-150 h-px mt-2" />
            <div className="flex justify-between items-center text-xs font-bold text-slate-800">
              <span>Total Submissions</span>
              <span>82 Applications</span>
            </div>
          </CardContent>
        </Card>

        {/* Activities log */}
        <Card className="border border-slate-100 bg-white shadow-sm">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2">
            <Clock className="h-5 w-5 text-indigo-500" />
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Coordinator Activity Log</h3>
          </div>
          <CardContent className="p-6">
            <div className="space-y-4">
              {activities.map((act) => (
                <div key={act.id} className="p-3 bg-slate-50 border border-slate-150 rounded-xl flex flex-col gap-1">
                  <p className="text-xs text-slate-700 font-semibold">{act.text}</p>
                  <span className="text-[9px] text-slate-400 font-bold self-end">{act.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN DASHBOARD SHELL
// ─────────────────────────────────────────────────────────────────────────────
export default function DashboardShell() {
  const { user } = useAuth();
  const { isSuperAdmin, modules } = usePermissions();

  if (!user) return null;

  const roleCode = user.roleCode;
  const isHR = roleCode === 'ROLE_HR';
  const isMentor = roleCode === 'ROLE_MENTOR';
  const isStudent = roleCode === 'ROLE_STUDENT';
  const isCC = roleCode === 'ROLE_CC';

  // Modules registry cards list (exclude dashboard and super_admin from list)
  const registryModules = modules.filter(m => m.id !== 'dashboard' && m.id !== 'super_admin');

  return (
    <div className="space-y-8 animate-slide-in">
      <section className="space-y-6">
        {/* Welcome Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Welcome back, {user.name.split(' ')[0]}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {isSuperAdmin
                ? 'Full enterprise administration access. All systems operational.'
                : `Logged in as ${user.roleName}. Showing dynamic workspace widgets.`}
            </p>
          </div>
          <Badge variant="default" className="self-start text-xs font-bold px-3 py-1 bg-slate-900 text-white rounded">
            {user.roleName}
          </Badge>
        </div>

        {/* Dynamic Widgets Injection based on Role Code */}
        {isSuperAdmin && <SuperAdminWidgets modules={registryModules} />}
        {isHR && !isSuperAdmin && <HRWidgets />}
        {isMentor && !isSuperAdmin && <MentorWidgets />}
        {isStudent && !isSuperAdmin && <StudentWidgets />}
        {isCC && !isSuperAdmin && <CoordinatorWidgets />}
      </section>
    </div>
  );
}
