"use client";

import React, { useState } from 'react';
import { Drawer } from '@/components/admin/ui/Drawer';
import { Application } from '@/src/data/mock-applications';
import { Opportunity } from '@/src/data/mock-landing-opportunities';
import { applicationService } from '@/src/services/application.service';
import { Mail, Phone, Calendar as CalendarIcon, Briefcase, User, CheckCircle2, XCircle, Clock } from 'lucide-react';

export interface ApplicationWithOpp extends Application {
  opportunityData?: Opportunity;
}

interface ReviewApplicationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  application: ApplicationWithOpp | null;
  onApplicationUpdated: () => void;
}

export function ReviewApplicationDrawer({ isOpen, onClose, application, onApplicationUpdated }: ReviewApplicationDrawerProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  if (!application) return null;

  const handleStatusUpdate = async (status: 'Pending' | 'Interview' | 'Accepted' | 'Rejected') => {
    try {
      setIsUpdating(true);
      await applicationService.updateApplicationStatus(application.id, status);
      onApplicationUpdated();
      onClose();
    } catch (err) {
      console.error('Failed to update application status', err);
      alert('Error updating application status.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Review Application">
      <div className="flex flex-col h-full min-h-0 bg-slate-50">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Candidate Info */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">Candidate Details</h3>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-black shrink-0">
                {application.candidateName.charAt(0)}
              </div>
              <div>
                <div className="text-lg font-bold text-slate-800">{application.candidateName}</div>
                <div className="flex items-center gap-4 mt-1 text-sm text-slate-600">
                  <span className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> {application.email}</span>
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-slate-600">
                  <span className="flex items-center gap-1.5"><Phone className="h-4 w-4" /> {application.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Application Info */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">Application Info</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Applied For</p>
                <div className="flex items-center gap-1.5 mt-1 text-sm font-semibold text-slate-800 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <Briefcase className="h-4 w-4 text-blue-500" />
                  {application.opportunityData?.title || application.opportunityId}
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Date Applied</p>
                <div className="flex items-center gap-1.5 mt-1 text-sm font-medium text-slate-800">
                  <CalendarIcon className="h-4 w-4 text-slate-400" />
                  {application.appliedDate}
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Current Status</p>
                <div className="mt-1">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${
                    application.status === 'Accepted' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                    application.status === 'Pending' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                    application.status === 'Interview' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                    'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {application.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Action Footer */}
        <div className="shrink-0 border-t border-slate-200 p-6 bg-white flex flex-col gap-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Update Application Status</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button 
              onClick={() => handleStatusUpdate('Accepted')}
              disabled={isUpdating || application.status === 'Accepted'}
              className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border-2 border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-xs font-bold">Accept</span>
            </button>
            <button 
              onClick={() => handleStatusUpdate('Interview')}
              disabled={isUpdating || application.status === 'Interview'}
              className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border-2 border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Clock className="h-5 w-5" />
              <span className="text-xs font-bold">Interview</span>
            </button>
            <button 
              onClick={() => handleStatusUpdate('Rejected')}
              disabled={isUpdating || application.status === 'Rejected'}
              className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border-2 border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <XCircle className="h-5 w-5" />
              <span className="text-xs font-bold">Reject</span>
            </button>
            <button 
              onClick={() => handleStatusUpdate('Pending')}
              disabled={isUpdating || application.status === 'Pending'}
              className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border-2 border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:border-amber-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <User className="h-5 w-5" />
              <span className="text-xs font-bold">Pending</span>
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
