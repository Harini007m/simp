"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Shield, Menu, X } from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export function Sidebar({ isMobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/super-admin', icon: LayoutDashboard },
    {
      name: 'Identity',
      children: [
        { name: 'Users', href: '/super-admin/users', icon: Users },
        { name: 'Roles', href: '/super-admin/roles', icon: Shield },
      ],
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/80 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0a192f] text-slate-300 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col`}
      >
        <div className="flex h-16 shrink-0 items-center px-6 border-b border-slate-700/50 justify-between lg:justify-start">
          <Link href="/super-admin" className="flex items-center gap-3">
            {/* Minimalist Logo placeholder */}
            <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-blue-900/50">
              P
            </div>
            <span className="text-lg font-bold text-white tracking-wide">Pinesphere ERP</span>
          </Link>
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setMobileOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {navigation.map((section, idx) => (
            <div key={idx}>
              {section.children ? (
                <>
                  <h3 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {section.name}
                  </h3>
                  <ul className="space-y-1">
                    {section.children.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={`group flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                              isActive 
                                ? 'bg-blue-600/10 text-blue-400' 
                                : 'hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            <item.icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-white'}`} />
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <ul className="space-y-1">
                  <li>
                    <Link
                      href={section.href}
                      className={`group flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        pathname === section.href 
                          ? 'bg-blue-600/10 text-blue-400' 
                          : 'hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <section.icon className={`h-5 w-5 shrink-0 ${pathname === section.href ? 'text-blue-400' : 'text-slate-400 group-hover:text-white'}`} />
                      {section.name}
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-700/50">
          <div className="flex items-center gap-x-4 px-2 py-2">
            <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-white">
              SA
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Super Admin</span>
              <span className="text-xs text-slate-400">admin@pinesphere.com</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
