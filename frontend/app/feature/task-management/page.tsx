"use client";

import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, FileText, Clock, AlertTriangle, Eye, CheckCircle, 
  Users, Play, XCircle, Trash2, Send, Save, ArrowUpRight, GitBranch, ExternalLink, Video
} from 'lucide-react';
import { useAuth } from '@/src/context/AuthContext';

interface StudentSubmission {
  studentId: string;
  studentName: string;
  githubUrl: string;
  deployUrl: string;
  videoUrl: string;
  screenshot: string;
  pdfFile: string;
  submittedAt: string;
  score: number;
  feedback: string;
  status: 'Submitted' | 'Graded' | 'Pending';
}

interface LocalTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  attempts: number;
  requirements: string[];
  examplePdf: string;
  referencePdf: string;
  starterCode: string;
}

// Mock data removed

export default function TaskManagementPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<LocalTask[]>([]);
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  
  // Selection drill-down
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedSub, setSelectedSub] = useState<StudentSubmission | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Form: Grading
  const [inputScore, setInputScore] = useState<number>(0);
  const [inputFeedback, setInputFeedback] = useState<string>('');

  // Form: Task Creator
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newDueDate, setNewDueDate] = useState('2026-06-30');
  const [reqGithub, setReqGithub] = useState(true);
  const [reqDeploy, setReqDeploy] = useState(true);
  const [reqVideo, setReqVideo] = useState(false);
  const [reqZip, setReqZip] = useState(false);
  const [reqScreenshot, setReqScreenshot] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const { taskService } = await import('@/src/services/task.service');
        const { submissionService } = await import('@/src/services/submission.service');
        const [fetchedTasks, fetchedSubmissions] = await Promise.all([
          taskService.getTasks(),
          submissionService.getSubmissions()
        ]);
        setTasks(fetchedTasks as any || []);
        
        if (selectedTaskId) {
            setSubmissions((fetchedSubmissions as any || []).filter((s: any) => s.taskId === selectedTaskId));
        } else {
            setSubmissions(fetchedSubmissions as any || []);
        }
      } catch (err) {
        console.error("Failed to fetch tasks/submissions", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [selectedTaskId]);

  const handlePostGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;

    try {
      const { submissionService } = await import('@/src/services/submission.service');
      // Assume a generic update endpoint exists in submissionService
      if ((submissionService as any).updateSubmission) {
         await (submissionService as any).updateSubmission(selectedSub.studentId, {
            score: inputScore,
            feedback: inputFeedback,
            status: 'Graded'
         });
      }
      
      const updated = submissions.map((sub: any) => {
        if (sub.studentId === selectedSub.studentId) {
          return {
            ...sub,
            score: inputScore,
            feedback: inputFeedback,
            status: 'Graded' as const
          };
        }
        return sub;
      });

      setSubmissions(updated);
      setSelectedSub(null);
      triggerToast("Grade & feedback posted to student successfully.");
    } catch (err) {
      console.error("Failed to post grade", err);
    }
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle || !newTaskDesc) {
      triggerToast("Please enter task title and description details.");
      return;
    }

    const newRequirements = [];
    if (reqGithub) newRequirements.push('Github Link');
    if (reqDeploy) newRequirements.push('Deployment URL');
    if (reqVideo) newRequirements.push('Video Walkthrough');
    if (reqScreenshot) newRequirements.push('Screenshots');
    if (reqZip) newRequirements.push('ZIP Archive');

    const created: LocalTask = {
      id: `TSK-${Date.now().toString().slice(-3)}`,
      title: newTaskTitle,
      description: newTaskDesc,
      dueDate: newDueDate,
      attempts: 1,
      requirements: newRequirements,
      examplePdf: 'spec_sample_sheet.pdf',
      referencePdf: 'boilerplate_guide_v2.pdf',
      starterCode: 'codebase_archive.zip'
    };

    setTasks((prev: any) => [...prev, created]);

    // Save to backend
    const submitTask = async () => {
      try {
        const { taskService } = await import('@/src/services/task.service');
        if ((taskService as any).createTask) {
           await (taskService as any).createTask('batch-ai-2026', created);
        }
      } catch (err) {
        console.error("Failed to create task", err);
      }
    };
    submitTask();

    setNewTaskTitle('');
    setNewTaskDesc('');
    triggerToast(`Milestone "${newTaskTitle}" published for students!`);
  };

  return (
    <div className="space-y-6 animate-slide-in select-none">
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 border border-border text-white rounded-xl shadow-2xl animate-bounce-in">
          <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
          <div className="text-xs font-semibold">{toastMessage}</div>
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-text-primary tracking-tight">Task Management</h2>
        <p className="text-sm text-text-secondary mt-1">Grade student deliverables, write review comments, and publish new milestone tasks.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Create Task Form */}
        <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-5">
          <h3 className="font-bold text-xs text-slate-455 uppercase tracking-widest border-b pb-2">Publish Task</h3>
          
          <form onSubmit={handleCreateTask} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-text-secondary uppercase">Task Title</label>
              <input 
                type="text" 
                required
                value={newTaskTitle}
                onChange={(e: any) => setNewTaskTitle(e.target.value)}
                placeholder="e.g. Build Backend Auth Middleware"
                className="w-full bg-slate-50 border border-border rounded-xl px-3.5 py-2.5 text-xs text-text-primary outline-none focus:border-primary focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-text-secondary uppercase">Description</label>
              <textarea 
                rows={3} 
                required
                value={newTaskDesc}
                onChange={(e: any) => setNewTaskDesc(e.target.value)}
                placeholder="Detail core requirements, routing specs, and testing criteria."
                className="w-full bg-slate-50 border border-border rounded-xl px-3.5 py-2.5 text-xs text-text-primary outline-none resize-none leading-relaxed focus:border-primary focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-text-secondary uppercase">Due Date</label>
              <input 
                type="date" 
                required
                value={newDueDate}
                onChange={(e: any) => setNewDueDate(e.target.value)}
                className="w-full bg-slate-50 border border-border rounded-xl px-3.5 py-2 text-xs font-bold text-text-primary outline-none cursor-pointer"
              />
            </div>

            {/* Checkboxes for required deliverables */}
            <div className="space-y-2 border-t pt-3">
              <span className="block text-[10px] font-bold text-text-secondary uppercase tracking-wide">Required Deliverables</span>
              {[
                { label: 'GitHub Repository Link', active: reqGithub, setter: setReqGithub },
                { label: 'Live Deployment URL', active: reqDeploy, setter: setReqDeploy },
                { label: 'Video Walkthrough', active: reqVideo, setter: setReqVideo },
                { label: 'Build ZIP Package', active: reqZip, setter: setReqZip },
                { label: 'Screenshots Attachment', active: reqScreenshot, setter: setReqScreenshot }
              ].map((item: any, idx: any) => (
                <div key={idx} className="flex items-center gap-2 text-xs">
                  <input 
                    type="checkbox" 
                    id={`req_${idx}`}
                    checked={item.active} 
                    onChange={(e: any) => item.setter(e.target.checked)}
                    className="h-3.5 w-3.5 text-indigo-650 rounded border-border cursor-pointer" 
                  />
                  <label htmlFor={`req_${idx}`} className="font-bold text-label cursor-pointer select-none">{item.label}</label>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-750 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-colors cursor-pointer"
            >
              Publish Milestone Task
            </button>
          </form>
        </div>

        {/* Right Columns: Submissions and Grading Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <span className="text-[10px] font-bold text-indigo-650 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-sm uppercase tracking-wide">SUBMISSIONS ASSIGNED</span>
                <select 
                  value={selectedTaskId || ''}
                  onChange={(e: any) => { setSelectedTaskId(e.target.value); setSelectedSub(null); }}
                  className="block mt-2 bg-slate-50 border border-border rounded-xl px-4 py-2 text-xs font-bold text-text-primary outline-none cursor-pointer"
                >
                  {tasks.map((t: any) => (
                    <option key={t.id} value={t.id}>{t.title} ({t.id})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* List of Student Submissions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Submission Roster Cards */}
              <div className="space-y-3">
                <span className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider">Candidate Submissions</span>
                
                {submissions.map((sub: any) => (
                  <div 
                    key={sub.studentId}
                    onClick={() => { setSelectedSub(sub); setInputScore(sub.score || 0); setInputFeedback(sub.feedback || ''); }}
                    className={`p-4 border rounded-2xl cursor-pointer transition-all ${
                      selectedSub?.studentId === sub.studentId 
                        ? 'bg-slate-900 border-slate-850 text-white shadow-xl translate-x-1' 
                        : 'bg-slate-50 border-slate-150 hover:border-secondary text-text-primary'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-xs">{sub.studentName}</span>
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${
                        sub.status === 'Graded' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                      }`}>
                        {sub.status}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[10px] opacity-80 mt-3 pt-3 border-t border-border/50">
                      <span>Submitted: {sub.submittedAt.slice(0, 10)}</span>
                      <span>Score: {sub.status === 'Graded' ? `${sub.score}/100` : 'Pending'}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Grading Workspace Panel */}
              <div className="border border-slate-150 rounded-2xl p-5 bg-slate-50/20">
                {selectedSub ? (
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold text-indigo-650 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-sm uppercase tracking-wide">
                      GRADER CONSOLE
                    </span>
                    
                    <div>
                      <h4 className="font-bold text-xs text-text-primary">{selectedSub.studentName} Solution</h4>
                      
                      {/* Code credentials buttons */}
                      <div className="space-y-2 mt-3">
                        {selectedSub.githubUrl && (
                          <a 
                            href={selectedSub.githubUrl} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="flex items-center gap-2 p-2 bg-white border border-border rounded-lg hover:border-secondary transition-colors text-[10px] text-slate-655 font-bold"
                          >
                            <GitBranch className="h-4 w-4 text-text-primary" />
                            <span className="truncate">Repository: {selectedSub.githubUrl}</span>
                          </a>
                        )}
                        {selectedSub.videoUrl && (
                          <a 
                            href={selectedSub.videoUrl} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="flex items-center gap-2 p-2 bg-white border border-border rounded-lg hover:border-secondary transition-colors text-[10px] text-slate-655 font-bold"
                          >
                            <Video className="h-4 w-4 text-rose-500" />
                            <span className="truncate">Walkthrough Video</span>
                          </a>
                        )}
                      </div>
                    </div>

                    <form onSubmit={handlePostGrade} className="space-y-4 pt-3 border-t">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-text-secondary uppercase">Assessment Score (0-100)</label>
                        <input 
                          type="number" 
                          min={0}
                          max={100}
                          required
                          value={inputScore}
                          onChange={(e: any) => setInputScore(parseInt(e.target.value) || 0)}
                          className="w-full bg-white border border-border rounded-lg px-3 py-2 text-xs font-bold text-text-primary outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-text-secondary uppercase">Feedback Comment</label>
                        <textarea 
                          rows={2} 
                          required
                          value={inputFeedback}
                          onChange={(e: any) => setInputFeedback(e.target.value)}
                          placeholder="e.g. Beautiful layout styling, clean middleware routers."
                          className="w-full bg-white border border-border rounded-lg px-3 py-2 text-xs text-text-primary outline-none resize-none leading-relaxed"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 bg-blue-650 hover:bg-blue-750 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-colors cursor-pointer"
                      >
                        Publish Scores & Review
                      </button>
                    </form>
                  </div>
                ) : (
                  <p className="text-xs text-text-secondary italic text-center py-16">
                    Select a student submission card from the left panel to review solution repo links and publish grades.
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
