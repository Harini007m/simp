"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/super-admin/Sidebar';
import { TopNav } from '@/components/super-admin/TopNav';

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <Sidebar isMobileOpen={sidebarOpen} setMobileOpen={setSidebarOpen} />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav setMobileOpen={setSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
