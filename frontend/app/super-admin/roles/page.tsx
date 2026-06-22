"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/super-admin/ui/Card';
import { Button } from '@/components/super-admin/ui/Button';
import { Search, Plus, Shield, Users, Edit, Trash, Eye } from 'lucide-react';
import { CreateRoleWizard } from '../../../components/super-admin/roles/CreateRoleWizard';

export default function RolesPage() {
  const [isCreateWizardOpen, setIsCreateWizardOpen] = useState(false);

  const roles = [
    { id: '1', name: 'Student', desc: 'Can access LMS and submit tasks.', modulesCount: 5, usersCount: 245, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { id: '2', name: 'Mentor', desc: 'Can evaluate tasks and mentor students.', modulesCount: 6, usersCount: 34, color: 'text-amber-600', bg: 'bg-amber-100' },
    { id: '3', name: 'HR', desc: 'Can manage employees and track performance.', modulesCount: 4, usersCount: 12, color: 'text-rose-600', bg: 'bg-rose-100' },
    { id: '4', name: 'College Coordinator', desc: 'Can track student progress and view reports.', modulesCount: 4, usersCount: 28, color: 'text-violet-600', bg: 'bg-violet-100' },
    { id: '5', name: 'Super Admin', desc: 'Full system access.', modulesCount: 8, usersCount: 3, color: 'text-blue-600', bg: 'bg-blue-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Roles</h1>
          <p className="text-sm text-slate-500 mt-1">Manage system roles, permissions, and module access.</p>
        </div>
        <Button onClick={() => setIsCreateWizardOpen(true)} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Create Role
        </Button>
      </div>

      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search roles..." 
            className="w-full rounded-md border border-slate-200 pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <Card key={role.id} className="flex flex-col hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl ${role.bg}`}>
                  <Shield className={`h-6 w-6 ${role.color}`} />
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors rounded-md hover:bg-slate-50"><Eye className="h-4 w-4" /></button>
                  <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors rounded-md hover:bg-slate-50"><Edit className="h-4 w-4" /></button>
                  <button className="p-1.5 text-slate-400 hover:text-red-600 transition-colors rounded-md hover:bg-slate-50"><Trash className="h-4 w-4" /></button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-4">{role.name}</h3>
              <p className="text-sm text-slate-500 mt-1 line-clamp-2 min-h-[40px]">{role.desc}</p>
            </CardHeader>
            <div className="flex-1"></div>
            <CardFooter className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
                <Shield className="h-4 w-4 text-slate-400" />
                {role.modulesCount} Modules
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
                <Users className="h-4 w-4 text-slate-400" />
                {role.usersCount} Users
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <CreateRoleWizard isOpen={isCreateWizardOpen} onClose={() => setIsCreateWizardOpen(false)} />
    </div>
  );
}
