"use client";

import React, { useEffect, useState } from 'react';
import { Award, Search, Filter, Plus, ChevronRight, Package, Users } from 'lucide-react';
import { mentorService } from '@/src/services/mentor.service';
import { Mentor } from '@/src/data/mock-mentors';
import { employeeService } from '@/src/services/employee.service';
import { Employee } from '@/src/data/mock-employees';
import { userService } from '@/src/services/user.service';
import { User } from '@/src/data/mock-users';

interface MentorDetailed extends Mentor {
  employeeData?: Employee;
  userData?: User;
}

export default function MentorPage() {
  const [mentors, setMentors] = useState<MentorDetailed[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const menData = await mentorService.getMentors();
        const empData = await employeeService.getEmployees();
        const usersData = await userService.getUsers();
        
        const mergedData = menData.map(men => {
          const emp = empData.find(e => e.id === men.employeeId);
          const user = usersData.find(u => u.id === emp?.userId);
          
          return {
            ...men,
            employeeData: emp,
            userData: user
          };
        });
        
        setMentors(mergedData);
      } catch (err) {
        console.error('Failed to load mentors', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredMentors = mentors.filter(men => {
    const searchString = `${men.userData?.name || ''} ${men.expertise.join(' ')}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <span>Execution</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-blue-600 font-extrabold">Mentors</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">Mentorship Roster</h2>
          <p className="text-xs text-slate-500 mt-1">
            Assign experts to cohorts and track their specialized guidance.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all duration-200 cursor-pointer">
            <Plus className="h-3.5 w-3.5" />
            <span>Appoint Mentor</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search mentors or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Data Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.length > 0 ? (
            filteredMentors.map((men) => (
              <div key={men.id} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-white flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 font-bold text-lg">
                    {men.userData?.avatar || 'U'}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">{men.userData?.name || 'Unknown Mentor'}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{men.employeeData?.designation || 'No Designation'}</p>
                  </div>
                </div>
                
                <div className="mb-4 space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Expertise</div>
                  <div className="flex flex-wrap gap-2">
                    {men.expertise.map((exp, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-semibold px-2 py-0.5 rounded">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Package className="h-4 w-4 text-slate-400" />
                    <span className="font-medium">{men.batchIds.length} Batches</span>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    men.status === 'Active' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {men.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500">
              <Award className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <p className="text-base font-medium text-slate-600">No mentors found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
