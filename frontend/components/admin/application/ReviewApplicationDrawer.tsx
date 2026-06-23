"use client";

import React, { useState, useEffect } from 'react';
import { Drawer } from '@/components/admin/ui/Drawer';
import { Button } from '@/components/admin/ui/Button';
import { Card } from '@/components/admin/ui/Card';
import { Mail, Phone, Calendar, Briefcase, User, CheckCircle2, XCircle, Clock, CalendarRange } from 'lucide-react';
import { applicationService } from '@/src/services/application.service';
import { ApplicationWithOpp } from '@/app/admin/application/page';

interface ReviewApplicationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApplicationUpdated: () => void;
  application: ApplicationWithOpp | null;
}

export function ReviewApplicationDrawer({
  isOpen,
  onClose,
  onApplicationUpdated,
  application
}: ReviewApplicationDrawerProps) {
  const [status, setStatus] = useState<ApplicationWithOpp['status']>('Pending');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && application) {
      setStatus(application.status);
    }
  }, [isOpen, application]);

  if (!application) return null;

  const handleUpdateStatus = async (newStatus: ApplicationWithOpp['status']) => {
    try {
      setIsSubmitting(true);
      await applicationService.updateApplicationStatus(application.id, newStatus);
      setStatus(newStatus);
      onApplicationUpdated();
    } catch (err) {
      console.error('Failed to update application status', err);
      alert('Failed to update status. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getStatusColor = (s: typeof status) => {
    switch (s) {
      case 'Accepted':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'Pending':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'Interview':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Rejected':
        return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  // Mock applicant professional profile info
  const mockProfile = {
    summary: 'A highly motivated and detail-oriented professional with a strong foundation in modern engineering principles, seeking to contribute to impactful enterprise projects and collaborate with high-performing cross-functional teams.',
    skills: ['React & Next.js', 'TypeScript / JavaScript', 'TailwindCSS & CSS Grid', 'State Management (Redux/Zustand)', 'Node.js & Restful APIs', 'Git & CI/CD Pipelines'],
    education: 'Bachelor of Science in Computer Science - Cumulative GPA 3.8/4.0',
    experience: 'Frontend Engineering Intern at TechVanguard (6 Months) — Developed high-performance dashboard UI components using React, optimizing page load speeds by 20% and implementing responsive layouts.'
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Review Candidate Application">
      <div className="flex flex-col h-[calc(100vh-65px)] bg-slate-50/50">
        
        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Candidate Card Header */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
            <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-md shadow-indigo-100 shrink-0">
              {getInitials(application.candidateName)}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-black text-slate-900 leading-tight">{application.candidateName}</h3>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(status)}`}>
                  {status}
                </span>
                <span className="text-xs text-slate-400">
                  Applied {application.appliedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleUpdateStatus('Interview')}
                disabled={isSubmitting || status === 'Interview'}
                className="flex items-center justify-center gap-1.5 px-3 py-2 border border-blue-200 hover:border-blue-300 text-blue-600 hover:bg-blue-50 rounded-lg text-xs font-bold transition-all disabled:opacity-50 disabled:pointer-events-none bg-blue-50/20 cursor-pointer"
              >
                <CalendarRange className="h-3.5 w-3.5" />
                <span>Schedule Interview</span>
              </button>
              <button
                type="button"
                onClick={() => handleUpdateStatus('Accepted')}
                disabled={isSubmitting || status === 'Accepted'}
                className="flex items-center justify-center gap-1.5 px-3 py-2 border border-emerald-200 hover:border-emerald-300 text-emerald-600 hover:bg-emerald-50 rounded-lg text-xs font-bold transition-all disabled:opacity-50 disabled:pointer-events-none bg-emerald-50/20 cursor-pointer"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Accept Application</span>
              </button>
              <button
                type="button"
                onClick={() => handleUpdateStatus('Rejected')}
                disabled={isSubmitting || status === 'Rejected'}
                className="flex items-center justify-center gap-1.5 px-3 py-2 border border-red-200 hover:border-red-300 text-red-600 hover:bg-red-50 rounded-lg text-xs font-bold transition-all disabled:opacity-50 disabled:pointer-events-none bg-red-50/20 cursor-pointer"
              >
                <XCircle className="h-3.5 w-3.5" />
                <span>Reject Candidate</span>
              </button>
              <button
                type="button"
                onClick={() => handleUpdateStatus('Pending')}
                disabled={isSubmitting || status === 'Pending'}
                className="flex items-center justify-center gap-1.5 px-3 py-2 border border-amber-200 hover:border-amber-300 text-amber-600 hover:bg-amber-50 rounded-lg text-xs font-bold transition-all disabled:opacity-50 disabled:pointer-events-none bg-amber-50/20 cursor-pointer"
              >
                <Clock className="h-3.5 w-3.5" />
                <span>Set Back to Pending</span>
              </button>
            </div>
          </div>

          {/* Contact Details Card */}
          <Card>
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
              <User className="h-4.5 w-4.5 text-blue-600" />
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Contact & Target Role</h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Email Address</p>
                  <p className="text-sm font-semibold text-slate-900 mt-1 flex items-center gap-1.5">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span>{application.email}</span>
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Phone Number</p>
                  <p className="text-sm font-semibold text-slate-900 mt-1 flex items-center gap-1.5">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span>{application.phone}</span>
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Applied Opportunity</p>
                  <p className="text-sm font-semibold text-slate-900 mt-1 flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4 text-slate-400" />
                    <span>{application.opportunityData?.title || application.opportunityId}</span>
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Pipeline Progress History Timeline */}
          <Card>
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
              <Clock className="h-4.5 w-4.5 text-blue-600" />
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Hiring Pipeline Progress</h3>
            </div>
            <div className="p-5">
              <div className="relative border-l border-slate-200 ml-3.5 pl-6 space-y-5">
                
                {/* Step 1: Applied */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-0.5 bg-emerald-500 text-white rounded-full p-0.5 border-4 border-white shadow-sm flex items-center justify-center">
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Application Submitted</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Received on {application.appliedDate}</p>
                  </div>
                </div>

                {/* Step 2: Pending/Under Review */}
                <div className="relative">
                  <div className={`absolute -left-[31px] top-0.5 rounded-full p-0.5 border-4 border-white shadow-sm flex items-center justify-center ${
                    status !== 'Pending' 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-amber-500 text-white animate-pulse'
                  }`}>
                    {status !== 'Pending' ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : (
                      <Clock className="h-3 w-3" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Initial Review & Screening</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {status === 'Pending' ? 'Currently under screening review' : 'Screening review completed'}
                    </p>
                  </div>
                </div>

                {/* Step 3: Interview */}
                <div className="relative">
                  <div className={`absolute -left-[31px] top-0.5 rounded-full p-0.5 border-4 border-white shadow-sm flex items-center justify-center ${
                    status === 'Accepted' || status === 'Rejected'
                      ? 'bg-emerald-500 text-white'
                      : status === 'Interview'
                      ? 'bg-blue-500 text-white animate-pulse'
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {(status === 'Accepted' || status === 'Rejected') ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : status === 'Interview' ? (
                      <Calendar className="h-3 w-3" />
                    ) : (
                      <div className="h-3 w-3 rounded-full" />
                    )}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${status === 'Interview' || status === 'Accepted' || status === 'Rejected' ? 'text-slate-800' : 'text-slate-450'}`}>
                      Technical Interview
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {status === 'Interview' ? 'Interview scheduled or in progress' : (status === 'Accepted' || status === 'Rejected') ? 'Interview round evaluation finalized' : 'Pending screening pass'}
                    </p>
                  </div>
                </div>

                {/* Step 4: Decision */}
                <div className="relative">
                  <div className={`absolute -left-[31px] top-0.5 rounded-full p-0.5 border-4 border-white shadow-sm flex items-center justify-center ${
                    status === 'Accepted'
                      ? 'bg-emerald-500 text-white'
                      : status === 'Rejected'
                      ? 'bg-red-500 text-white'
                      : 'bg-slate-105 bg-slate-100 text-slate-400'
                  }`}>
                    {status === 'Accepted' ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : status === 'Rejected' ? (
                      <XCircle className="h-3 w-3" />
                    ) : (
                      <div className="h-3 w-3 rounded-full" />
                    )}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${status === 'Accepted' || status === 'Rejected' ? 'text-slate-800' : 'text-slate-450'}`}>
                      Hiring Decision
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {status === 'Accepted' ? 'Candidate accepted' : status === 'Rejected' ? 'Application rejected' : 'Awaiting completion of previous stage'}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </Card>

          {/* Mock Applicant Resume Profile Details */}
          <Card>
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
              <Briefcase className="h-4.5 w-4.5 text-blue-600" />
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Candidate Profile summary</h3>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Professional Summary</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{mockProfile.summary}</p>
              </div>

              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Education</h4>
                <p className="text-xs font-semibold text-slate-800 mt-1 leading-relaxed">{mockProfile.education}</p>
              </div>

              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Key Skills</h4>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {mockProfile.skills.map((skill, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Prior Experience</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{mockProfile.experience}</p>
              </div>
            </div>
          </Card>

        </div>

        {/* Status Dropdown Controls & Footer */}
        <div className="shrink-0 border-t border-slate-200 p-4 bg-slate-50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-650 shrink-0">Pipeline Status:</label>
            <select
              value={status}
              onChange={(e) => handleUpdateStatus(e.target.value as any)}
              disabled={isSubmitting}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 bg-white"
            >
              <option value="Pending">Pending Review</option>
              <option value="Interview">Interviewing</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Close
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
