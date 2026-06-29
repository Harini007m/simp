"use client";

import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, Users, BarChart2, Activity, Play, Star, AlertTriangle, ShieldCheck, XCircle, CheckCircle
} from 'lucide-react';

interface QuestionStat {
  question: string;
  correct: boolean;
  skipped: boolean;
  marksGained: number;
}

interface StudentAttempt {
  studentId: string;
  studentName: string;
  attempts: number;
  score: number;
  status: 'Completed' | 'In Progress' | 'Missed';
  passed: boolean;
  questionAnalysis: {
    correctCount: number;
    wrongCount: number;
    skippedCount: number;
    negativeMarks: number;
    detailed: QuestionStat[];
  };
}

interface AssessmentItem {
  id: string;
  title: string;
  type: 'MCQ' | 'Coding' | 'File Upload' | 'Mixed';
  duration: number; // minutes
  passingMarks: number;
  negativeMarking: boolean;
  securitySettings: {
    secureBrowser: boolean;
    disableCopy: boolean;
    disableRightClick: boolean;
    fullscreenOnly: boolean;
    disableTabSwitch: boolean;
    cameraRequired: boolean;
    microphoneRequired: boolean;
  };
  questions: { text: string; options: string[]; answer: string; marks: number }[];
  attempts: StudentAttempt[];
}

interface BatchAssessments {
  id: string;
  name: string;
  assessmentsCount: number;
  completedCount: string;
  averageScore: number;
  assessments: AssessmentItem[];
}

// Derived interfaces for drill-down
interface DerivedStudent {
  id: string;
  name: string;
  attempts: { assessment: AssessmentItem, attempt: StudentAttempt }[];
}

export default function AssessmentDashboardPage() {
  const [batches, setBatches] = useState<BatchAssessments[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Drill-down states
  const [selectedBatch, setSelectedBatch] = useState<BatchAssessments | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<DerivedStudent | null>(null);
  const [selectedAttempt, setSelectedAttempt] = useState<{ assessment: AssessmentItem, attempt: StudentAttempt } | null>(null);

  // Fetch assessments from backend
  useEffect(() => {
    async function loadAssessments() {
      setIsLoading(true);
      try {
        const { assessmentService } = await import('@/src/services/assessment.service');
        const data = await assessmentService.getAssessments();
        setBatches(data as any || []);
      } catch (error) {
        console.error("Failed to fetch assessments", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadAssessments();
  }, []);

  const activeCount = batches.reduce((sum: any, b: any) => sum + b.assessments.length, 0);
  const totalSubCount = batches.reduce((sum: any, b: any) => sum + b.assessments.reduce((s: any, a: any) => s + a.attempts.length, 0), 0);

  // Derive students for selected batch
  const batchStudents = React.useMemo(() => {
    if (!selectedBatch) return [];
    const studentMap = new Map<string, DerivedStudent>();
    
    selectedBatch.assessments.forEach(asm => {
      asm.attempts.forEach(att => {
        if (!studentMap.has(att.studentId)) {
          studentMap.set(att.studentId, { id: att.studentId, name: att.studentName, attempts: [] });
        }
        studentMap.get(att.studentId)!.attempts.push({ assessment: asm, attempt: att });
      });
    });
    
    return Array.from(studentMap.values());
  }, [selectedBatch]);

  return (
    <div className="space-y-6 animate-slide-in select-none">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-text-primary tracking-tight">Assessment Dashboard</h2>
        <p className="text-sm text-text-secondary mt-1">Monitor candidate scores, analyze focus warning flags, and audit individual question stats.</p>
      </div>

      {!selectedBatch ? (
        <>
          {/* Metrics Panel */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Active Exams</span>
              <h3 className="text-3xl font-black text-text-primary mt-1">{activeCount}</h3>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Attempts Recorded</span>
              <h3 className="text-3xl font-black text-emerald-600 mt-1">{totalSubCount}</h3>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Pass Rate Avg</span>
              <h3 className="text-3xl font-black text-indigo-650 mt-1">94%</h3>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
              <span className="text-[10px] font-bold text-slate-405 uppercase tracking-widest">Class Average</span>
              <h3 className="text-3xl font-black text-amber-600 mt-1">84%</h3>
            </div>
          </div>

          {/* Batch list cards */}
          <div className="space-y-4">
            <h3 className="font-bold text-xs text-text-secondary uppercase tracking-widest">Roster Compliance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {batches.map((b: any) => (
                <div 
                  key={b.id}
                  onClick={() => setSelectedBatch(b)}
                  className="bg-white p-6 rounded-2xl border border-border hover:border-secondary transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg flex flex-col justify-between space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-bold text-text-secondary uppercase">COHORT</span>
                      <h4 className="text-lg font-black text-text-primary mt-1">{b.name}</h4>
                    </div>
                    <span className="bg-indigo-55/15 text-indigo-650 font-black px-3 py-1 rounded-full text-xs">
                      {b.assessments.length} Active Tests
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs font-bold text-text-secondary pt-2 border-t border-border">
                    <span>Submissions: <strong className="text-text-primary">{b.completedCount}</strong></span>
                    <span>Average: <strong className="text-indigo-600">{b.averageScore}%</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Candidates list and Question stats reviews */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Candidates Column (Left) */}
          <div className="lg:col-span-1 bg-white border border-border rounded-2xl p-5 shadow-sm space-y-4">
            <div className="border-b pb-3">
              <button 
                onClick={() => { setSelectedBatch(null); setSelectedStudent(null); setSelectedAttempt(null); }} 
                className="text-[10px] font-bold text-indigo-600 hover:underline block"
              >
                ← Back to Cohorts
              </button>
              <h4 className="text-sm font-black text-text-primary mt-1">{selectedBatch.name} Candidates</h4>
            </div>

            <div className="space-y-2">
              {batchStudents.map(student => (
                <div 
                  key={student.id}
                  onClick={() => { setSelectedStudent(student); setSelectedAttempt(null); }}
                  className={`p-3 border rounded-xl cursor-pointer transition-all ${
                    selectedStudent?.id === student.id 
                      ? 'bg-slate-900 border-slate-850 text-white shadow' 
                      : 'bg-slate-50 border-border hover:border-secondary text-text-primary'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span>{student.name}</span>
                  </div>
                  <div className="flex justify-between text-[10px] mt-2 opacity-85">
                    <span>Assessments taken: {student.attempts.length}</span>
                  </div>
                </div>
              ))}
              {batchStudents.length === 0 && (
                <p className="text-xs text-text-secondary italic text-center py-12">No students found.</p>
              )}
            </div>
          </div>

          {/* Report Trace (Right) */}
          <div className="lg:col-span-2 space-y-6">
            {!selectedStudent ? (
              <div className="bg-white border border-border rounded-2xl p-16 text-center text-text-secondary italic shadow-sm">
                Select a candidate from the left panel to review their assessment history.
              </div>
            ) : !selectedAttempt ? (
              /* List of assessments for selected student */
              <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-black text-text-primary">{selectedStudent.name}'s Assessments</h3>
                  <p className="text-xs text-text-secondary mt-1">Select an assessment to view detailed question stats.</p>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {selectedStudent.attempts.map((item, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setSelectedAttempt(item)}
                      className="p-5 border border-border hover:border-secondary hover:shadow-md rounded-2xl transition-all cursor-pointer bg-slate-50/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-text-secondary">{item.assessment.id}</span>
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-350" />
                          <span className="text-[10px] font-bold text-indigo-650 bg-indigo-55/15 px-2 py-0.2 rounded">{item.assessment.type}</span>
                        </div>
                        <h4 className="text-base font-black text-text-primary">{item.assessment.title}</h4>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <div className="text-right">
                          <span className="text-[10px] text-text-secondary block">Score</span>
                          <span className="text-sm font-black">{item.attempt.score}%</span>
                        </div>
                        <span className={`text-[10px] font-black px-3 py-1 rounded border ${
                          item.attempt.passed ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'
                        }`}>
                          {item.attempt.passed ? 'PASS' : 'FAIL'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Attempt details */
              <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-6">
                <div className="border-b pb-4 flex justify-between items-start gap-4">
                  <div>
                    <button 
                      onClick={() => setSelectedAttempt(null)} 
                      className="text-[10px] font-bold text-indigo-600 hover:underline block mb-2"
                    >
                      ← Back to {selectedStudent.name}'s Assessments
                    </button>
                    <span className="text-[9px] font-bold text-indigo-650 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-sm uppercase tracking-wider">PAPER COMPLIANCE REPORT</span>
                    <h3 className="text-lg font-black text-text-primary mt-2">{selectedAttempt.assessment.title}</h3>
                    <p className="text-xs text-text-secondary">Grading Score: <strong>{selectedAttempt.attempt.score}%</strong></p>
                  </div>
                  
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-xl uppercase ${
                    selectedAttempt.attempt.passed ? 'bg-emerald-55/15 text-emerald-700 border' : 'bg-rose-55/15 text-rose-700 border'
                  }`}>
                    {selectedAttempt.attempt.passed ? 'Passed Exam' : 'Failed'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-center">
                    <span className="block text-xl font-black text-emerald-700">{selectedAttempt.attempt.questionAnalysis.correctCount}</span>
                    <span className="text-[10px] text-text-secondary font-bold uppercase">Correct answers</span>
                  </div>
                  <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-center">
                    <span className="block text-xl font-black text-rose-700">{selectedAttempt.attempt.questionAnalysis.wrongCount}</span>
                    <span className="text-[10px] text-text-secondary font-bold uppercase">Wrong answers</span>
                  </div>
                  <div className="p-4 bg-slate-50 border border-border rounded-2xl text-center">
                    <span className="block text-xl font-black text-text-primary">{selectedAttempt.attempt.questionAnalysis.skippedCount}</span>
                    <span className="text-[10px] text-text-secondary font-bold uppercase">Skipped</span>
                  </div>
                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl text-center">
                    <span className="block text-xl font-black text-amber-700">-{selectedAttempt.attempt.questionAnalysis.negativeMarks}</span>
                    <span className="text-[10px] text-text-secondary font-bold uppercase">Negative Penalties</span>
                  </div>
                </div>

                {/* trace questions list */}
                <div className="space-y-3.5">
                  <h4 className="font-bold text-xs text-slate-455 uppercase tracking-widest">Question trace detail</h4>
                  <div className="space-y-2">
                    {selectedAttempt.attempt.questionAnalysis.detailed.map((det: any, idx: any) => (
                      <div key={idx} className="p-3 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-750 truncate mr-4">{det.question}</span>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                            det.correct ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                            det.skipped ? 'bg-slate-100 text-slate-655 border border-border' :
                            'bg-rose-50 text-rose-700 border border-rose-150'
                          }`}>
                            {det.correct ? 'Correct' : det.skipped ? 'Skipped' : 'Wrong'}
                          </span>
                          <span className="font-mono font-bold text-text-primary">
                            {det.marksGained > 0 ? `+${det.marksGained}` : det.marksGained} marks
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

