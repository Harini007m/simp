"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/admin/ui/Card';
import { Users, Activity, CheckCircle, AlertTriangle, ChevronRight } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/admin/ui/Table';
import { Badge } from '@/components/admin/ui/Badge';
import { coordinatorService } from '@/src/services/coordinator.service';
import { CoordinatorStats, BatchPerformance } from '@/src/data/mock-coordinator';

export default function CoordinatorDashboardPage() {
  const [stats, setStats] = useState<CoordinatorStats | null>(null);
  const [batchPerformances, setBatchPerformances] = useState<BatchPerformance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, batchesData] = await Promise.all([
          coordinatorService.getStats(),
          coordinatorService.getBatchPerformances()
        ]);
        setStats(statsData);
        setBatchPerformances(batchesData);
      } catch (err) {
        console.error('Failed to load coordinator data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    );
  }

  const kpis = [
    { title: 'Total Enrolled Students', value: stats.totalStudents, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Active Batches', value: stats.activeBatches, icon: Activity, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { title: 'Average Attendance', value: `${stats.averageAttendance}%`, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Pending Assessments', value: stats.pendingAssessments, icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-8 animate-slide-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <span>Monitoring</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-blue-600 font-extrabold">Coordinator</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">Operational Ecosystem</h2>
          <p className="text-xs text-slate-500 mt-1">
            Overview of batch performances, student engagement, and pending evaluations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{kpi.title}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{kpi.value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${kpi.bg} ${kpi.color}`}>
                  <kpi.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">Batch Performance Matrix</h3>
          </div>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batch ID</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Student Count</TableHead>
                  <TableHead>Avg Score</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batchPerformances.map((batch) => (
                  <TableRow key={batch.batchId}>
                    <TableCell>
                      <span className="font-medium text-slate-900">{batch.batchId}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-600">{batch.program}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-600">{batch.studentCount}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-slate-800">{batch.avgScore.toFixed(1)}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        batch.status === 'On Track' ? 'success' :
                        batch.status === 'At Risk' ? 'destructive' : 'secondary'
                      }>
                        {batch.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
