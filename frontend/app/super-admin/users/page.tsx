"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/super-admin/ui/Card';
import { Button } from '@/components/super-admin/ui/Button';
import { Badge } from '@/components/super-admin/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/super-admin/ui/Table';
import { Search, Filter, Plus, MoreVertical, Eye, Edit, Trash, UserX } from 'lucide-react';
import { CreateUserWizard } from '../../../components/super-admin/users/CreateUserWizard';

export default function UsersPage() {
  const [isCreateWizardOpen, setIsCreateWizardOpen] = useState(false);

  const users = [
    { id: '1', name: 'Alice Freeman', username: 'alice_f', email: 'alice@example.com', role: 'Student', status: 'Active', date: 'Oct 24, 2023', avatar: 'AF' },
    { id: '2', name: 'Bob Johnson', username: 'bjohnson', email: 'bob@example.com', role: 'Mentor', status: 'Active', date: 'Oct 23, 2023', avatar: 'BJ' },
    { id: '3', name: 'Charlie Davis', username: 'charlie_d', email: 'charlie@example.com', role: 'HR', status: 'Inactive', date: 'Oct 22, 2023', avatar: 'CD' },
    { id: '4', name: 'Diana Prince', username: 'dprince', email: 'diana@example.com', role: 'College Coordinator', status: 'Active', date: 'Oct 21, 2023', avatar: 'DP' },
    { id: '5', name: 'Evan Wright', username: 'evan_w', email: 'evan@example.com', role: 'Student', status: 'Active', date: 'Oct 20, 2023', avatar: 'EW' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Users</h1>
          <p className="text-sm text-slate-500 mt-1">Manage system users, roles, and access.</p>
        </div>
        <Button onClick={() => setIsCreateWizardOpen(true)} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Create User
        </Button>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="w-full rounded-md border border-slate-200 pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>
        
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-semibold text-blue-700">
                        {user.avatar}
                      </div>
                      <span className="font-medium text-slate-900">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">{user.username}</TableCell>
                  <TableCell className="text-slate-600">{user.email}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'Active' ? 'success' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500">{user.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                      <button className="p-1 hover:text-blue-600 transition-colors" title="View"><Eye className="h-4 w-4" /></button>
                      <button className="p-1 hover:text-blue-600 transition-colors" title="Edit"><Edit className="h-4 w-4" /></button>
                      <button className="p-1 hover:text-amber-600 transition-colors" title="Deactivate"><UserX className="h-4 w-4" /></button>
                      <button className="p-1 hover:text-red-600 transition-colors" title="Delete"><Trash className="h-4 w-4" /></button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
            <span>Showing 1 to 5 of 5 entries</span>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <CreateUserWizard isOpen={isCreateWizardOpen} onClose={() => setIsCreateWizardOpen(false)} />
    </div>
  );
}
