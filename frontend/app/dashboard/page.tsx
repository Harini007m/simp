"use client";

import React from 'react';
import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DynamicDashboardRouter() {
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && user) {
      if (user.roleName === 'Super Admin') {
        router.push('/admin');
      } else {
        // Fallback for missing dashboards currently, or generic user dashboard
        router.push('/admin'); // Temporarily route all to /admin until role dashboards are separated
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-slate-800">Authentication Required</h2>
          <p className="text-sm text-slate-500">Please log in to access your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="text-center space-y-4 max-w-md mx-auto p-6">
        <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="font-bold text-lg">{user.avatar}</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800">Routing to {user.roleName} Dashboard...</h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          Loading the personalized workspace for {user.name} based on dynamic role permissions.
        </p>
      </div>
    </div>
  );
}
