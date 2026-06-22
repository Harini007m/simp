"use client";

import React, { useEffect, useState } from 'react';
import { submissionService } from '@/src/services/submission.service';
import { Submission } from '@/src/data/mock-submissions';
import { ChevronRight } from 'lucide-react';

export default function CapstonePage() {
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);

  const [isEditingCapstone, setIsEditingCapstone] = useState(false);
  const [capstoneRepoLink, setCapstoneRepoLink] = useState('');
  const [capstoneLiveLink, setCapstoneLiveLink] = useState('');

  const [isLintingActive, setIsLintingActive] = useState(false);
  const [lintLogs, setLintLogs] = useState<string[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await submissionService.getSubmissions();
        if (data.length > 0) {
          setSubmission(data[0]); // Just picking the first one for the mock dashboard
          setCapstoneRepoLink(data[0].repoLink);
          setCapstoneLiveLink(data[0].liveLink);
        }
      } catch (err) {
        console.error('Failed to load submission', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleToggleSubtask = (id: string) => {
    if (submission) {
      const updatedSubtasks = submission.subtasks.map(t => 
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      setSubmission({ ...submission, subtasks: updatedSubtasks });
    }
  };

  const handleSaveCapstone = (e: React.FormEvent) => {
    e.preventDefault();
    if (submission) {
      setSubmission({
        ...submission,
        repoLink: capstoneRepoLink,
        liveLink: capstoneLiveLink
      });
      setIsEditingCapstone(false);
    }
  };

  const runDiagnostics = () => {
    setIsLintingActive(true);
    setLintLogs([]);
    const logs = [
      "Initializing Vercel deployment...",
      "Cloning repository...",
      "✓ Repository cloned.",
      "Running npm install...",
      "✓ Dependencies installed.",
      "Running type checks...",
      "✓ TypeScript checks Passed.",
      "Building client bundle...",
      "✓ Build successful.",
      "Deploying to staging environment...",
      "✓ Deployment complete. Ready for guide review."
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLintLogs(prev => [...prev, logs[i]]);
      i++;
      if (i >= logs.length) {
        clearInterval(interval);
        setIsLintingActive(false);
      }
    }, 500);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    );
  }

  if (!submission) {
    return <div className="p-6 text-center text-slate-500">No active submission found.</div>;
  }

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <span>Execution</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-blue-600 font-extrabold">Submissions</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">Capstone Projects</h2>
          <p className="text-xs text-slate-500 mt-1">
            Track your milestones, subtasks progression, guide reviews and commits history.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Workspace Info */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
            <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-sm">
              Active Workspace Project
            </span>
            <h2 className="text-xl font-bold text-slate-800 mt-1">Pinesphere Intern ERP & Assessment Client</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              The Capstone project is a critical component of graduation parameters. Complete building the ERP Client interfaces, test integrations, and submit repository connections.
            </p>

            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-bold block uppercase tracking-wider text-[9px]">Guide / Mentor</span>
                <span className="text-slate-800 font-semibold mt-1 block">Mr. Anand Jayavel (Senior Architect)</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block uppercase tracking-wider text-[9px]">Submission Status</span>
                <span className="text-amber-600 font-semibold mt-1 block">{submission.status}</span>
              </div>
            </div>
          </div>

          {/* Detailed Checklist of Subtasks for Phase 3 and Phase 4 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider">
                Phase 3 & 4 Subtask Verification
              </h3>
              <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-sm border border-blue-100">
                {submission.subtasks.filter((t: any) => t.completed).length} / {submission.subtasks.length} Completed
              </span>
            </div>
            <div className="space-y-3">
              {submission.subtasks.map((task: any) => (
                <div key={task.id} className="flex items-start justify-between gap-4 text-xs">
                  <button
                    onClick={() => handleToggleSubtask(task.id)}
                    className="flex items-start gap-3 text-left focus:outline-none group mt-0.5 cursor-pointer"
                  >
                    <span className={`h-4.5 w-4.5 border rounded flex items-center justify-center transition-all shrink-0 ${task.completed
                        ? 'bg-emerald-500 border-emerald-600 text-white'
                        : 'bg-white border-slate-300 group-hover:border-blue-500 text-transparent'
                      }`}>
                      ✓
                    </span>
                    <div className="space-y-0.5">
                      <span className={task.completed ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}>
                        {task.task}
                      </span>
                      <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                        Phase {task.phase} check
                      </span>
                    </div>
                  </button>
                  <span className={`text-[8px] font-bold uppercase tracking-wider border rounded-sm px-1.5 py-0.5 shrink-0 ${task.completed
                    ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                    : 'bg-amber-50 border-amber-100 text-amber-600'
                  }`}>
                    {task.completed ? 'Passed' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Guide Review Syncs & Commits logs */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3">
              Guide Code Review Comments & Commits Log
            </h3>
            <div className="space-y-4">
              {submission.commits.map((item: any, idx: number) => (
                <div key={idx} className="border-l-2 border-blue-500 pl-4 py-1 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-sm border border-slate-200 text-[10px]">
                        {item.commit}
                      </span>
                      <span className="font-bold text-slate-800">{item.message}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold">{item.date}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Authored by: <strong className="text-slate-600">{item.author}</strong>
                  </div>
                  {item.guideComment ? (
                    <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 text-xs text-blue-700 italic">
                      💬 <strong>{item.guideComment.split(':')[0]}:</strong>
                      <span>{item.guideComment.split(':').slice(1).join(':')}</span>
                    </div>
                  ) : (
                    <div className="text-[10px] text-slate-400 italic">No feedback comments logged on this commit.</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Project Link Submission */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 shadow-sm">
            <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3">
              Project Link Submission
            </h3>

            {isEditingCapstone ? (
              <form onSubmit={handleSaveCapstone} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">GitHub Code Link</label>
                  <input
                    type="url"
                    required
                    value={capstoneRepoLink}
                    onChange={(e) => setCapstoneRepoLink(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Live Deployment Link</label>
                  <input
                    type="url"
                    placeholder="https://my-app.vercel.app"
                    value={capstoneLiveLink}
                    onChange={(e) => setCapstoneLiveLink(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-xs font-bold text-white uppercase tracking-wider cursor-pointer transition-colors"
                >
                  Submit Project Links
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1 bg-slate-50 rounded-lg p-3.5 border border-slate-200">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">GitHub Code Repository</span>
                  <span className="text-xs text-blue-600 font-semibold truncate block hover:underline cursor-pointer">{capstoneRepoLink || 'Not Linked'}</span>
                </div>
                <div className="space-y-1 bg-slate-50 rounded-lg p-3.5 border border-slate-200">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Live Deploy Link</span>
                  <span className="text-xs text-blue-600 font-semibold truncate block hover:underline cursor-pointer">{capstoneLiveLink || 'Not Linked'}</span>
                </div>
                <button
                  onClick={() => setIsEditingCapstone(true)}
                  className="w-full py-2 bg-slate-50 border rounded-lg border-slate-200 hover:bg-slate-100 hover:text-slate-800 text-xs font-bold text-slate-700 uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Modify Submissions
                </button>
              </div>
            )}

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs text-slate-500 space-y-2">
              <div className="font-bold text-slate-700 uppercase tracking-wider text-[9px]">Syllabus Criteria:</div>
              <p className="leading-relaxed">
                • Verified deployment in Vercel<br />
                • JWT authorization modules active<br />
                • Validated check-in/out logs synced
              </p>
            </div>
          </div>

          {/* Staging Build diagnostics preview logs */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3">
              Staging Build Diagnostics
            </h3>
            <div className="space-y-3.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold">Deploy Target:</span>
                <span className="text-slate-800 font-bold bg-blue-50 border border-blue-100 rounded-sm text-blue-600 px-1.5 py-0.5">Vercel Serverless</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold">Active Branch:</span>
                <span className="text-slate-800 font-mono font-bold">main</span>
              </div>

              {/* Diagnostics Log Screen */}
              <div className="bg-slate-900 text-slate-200 p-3.5 font-mono text-[10px] h-32 overflow-y-auto space-y-1.5 rounded-lg">
                {lintLogs.length === 0 ? (
                  <span className="text-slate-500 italic">No diagnostics logs parsed. Click trigger button to run.</span>
                ) : (
                  lintLogs.map((log: string, lIdx: number) => (
                    <div key={lIdx} className={log.startsWith('✓') || log.includes('Passed') ? 'text-emerald-400' : 'text-blue-300'}>
                      {log}
                    </div>
                  ))
                )}
              </div>

              <button
                disabled={isLintingActive}
                onClick={runDiagnostics}
                className="w-full py-2 border rounded-lg border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isLintingActive ? 'Running Diagnostics...' : 'Trigger Staging Rebuild'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
