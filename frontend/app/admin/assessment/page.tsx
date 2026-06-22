"use client";

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useDashboard } from '@/src/context/DashboardContext';

export default function AssessmentPage() {
  const {
    showExamHUD,
    examHUDWarningCount,
    examHUDSecRemaining,
    examHUDCompleted,
    examHUDScore,
    handleExitExamHUD,
    mockExamQuestions,
    examHUDQuestionIndex,
    setExamHUDQuestionIndex,
    examHUDAnswers,
    handleAnswerQuestion,
    handleSubmitExam,
    assessmentPreflight,
    setAssessmentPreflight,
    pastExamResults,
    handleStartExam
  } = useDashboard();

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <span>Curriculum</span>
            <span>&gt;</span>
            <span className="text-blue-600 font-extrabold">Assessments</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">Proctored Examinations</h2>
          <p className="text-xs text-slate-500 mt-1">
            Access secure exam portals, verify pre-flight checklists, and view past scores.
          </p>
        </div>
      </div>

      {showExamHUD ? (
        /* EXAM INTERFACE OVERLAY */
        <div className="bg-white border border-red-200 rounded-2xl p-6 space-y-6 animate-slide-in relative shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-red-50 border border-red-100 p-4 gap-4 rounded-xl">
            <div>
              <span className="text-[8px] font-bold text-red-600 uppercase tracking-widest bg-red-100 border border-red-200 px-2 py-0.5 animate-pulse rounded-sm">
                PROCTOR ACTIVE
              </span>
              <h4 className="font-bold text-xs text-slate-800 mt-1.5">
                ERP Assessment Exam Gateway (Client Mode)
              </h4>
            </div>
            <div className="flex gap-4 text-xs font-bold">
              <div className="text-amber-600">
                Warnings: {examHUDWarningCount}/3
              </div>
              <div className="text-slate-800">
                Time Left: {Math.floor(examHUDSecRemaining / 60)}:{(examHUDSecRemaining % 60).toString().padStart(2, '0')}
              </div>
            </div>
          </div>

          {examHUDCompleted ? (
            <div className="text-center py-12 space-y-6 max-w-md mx-auto">
              <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <ShieldCheck className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-800">Assessment Exam Submitted</h3>
                <p className="text-xs text-slate-500">
                  Your scores have been parsed and synced with student analytics metrics.
                </p>
              </div>
              <div className="bg-slate-50 p-6 border border-slate-200 rounded-xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verified Score</span>
                <div className="text-3xl font-black text-slate-800 mt-2">{examHUDScore} / 100</div>
              </div>
              <button
                onClick={handleExitExamHUD}
                className="px-6 py-2.5 bg-blue-600 rounded-lg hover:bg-blue-700 text-xs font-bold text-white uppercase tracking-wider"
              >
                Exit Assessment Mode
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
                <h5 className="font-bold text-xs text-slate-700 uppercase tracking-wider">Question Palette</h5>
                <div className="grid grid-cols-4 gap-2">
                  {mockExamQuestions.map((q: any, idx: number) => {
                    const isCurrent = idx === examHUDQuestionIndex;
                    const isAnswered = examHUDAnswers[idx] !== undefined;
                    return (
                      <button
                        key={idx}
                        onClick={() => setExamHUDQuestionIndex(idx)}
                        className={`h-9 rounded-lg text-xs font-bold border transition-colors ${isCurrent
                            ? 'bg-blue-600 border-blue-500 text-white font-bold'
                            : isAnswered
                              ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                              : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700'
                          }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-3 bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-6">
                <div className="space-y-2 text-xs">
                  <span className="text-blue-600 font-bold uppercase tracking-wider text-[9px]">Question {examHUDQuestionIndex + 1} of {mockExamQuestions.length}</span>
                  <h4 className="text-sm font-bold text-slate-800 leading-relaxed">
                    {mockExamQuestions[examHUDQuestionIndex]?.question}
                  </h4>
                </div>

                <div className="space-y-2">
                  {mockExamQuestions[examHUDQuestionIndex]?.options.map((option: string, idx: number) => {
                    const isSelected = examHUDAnswers[examHUDQuestionIndex] === option;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerQuestion(option)}
                        className={`w-full text-left p-4 rounded-lg border transition-all text-xs flex items-center justify-between ${isSelected
                            ? 'bg-blue-50 border-blue-500 text-slate-800 font-medium'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100/50'
                          }`}
                      >
                        <span>{option}</span>
                        <span className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center text-[10px] ${isSelected
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'border-slate-300'
                          }`}>
                          {isSelected && '✓'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                  <button
                    disabled={examHUDQuestionIndex === 0}
                    onClick={() => setExamHUDQuestionIndex(examHUDQuestionIndex - 1)}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none text-xs font-bold text-slate-700 uppercase tracking-wider transition-colors"
                  >
                    Previous
                  </button>
                  {examHUDQuestionIndex === mockExamQuestions.length - 1 ? (
                    <button
                      onClick={() => handleSubmitExam()}
                      className="px-5 py-2 bg-emerald-600 rounded-lg hover:bg-emerald-700 text-xs font-bold text-white uppercase tracking-wider"
                    >
                      Submit Exam
                    </button>
                  ) : (
                    <button
                      onClick={() => setExamHUDQuestionIndex(examHUDQuestionIndex + 1)}
                      className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-xs font-bold text-white uppercase tracking-wider"
                    >
                      Next Question
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* EXAM PRE-FLIGHT GATEWAY */
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
            <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">Security Gateway</span>
            <h2 className="text-xl font-bold text-slate-800 mt-1">Pre-Flight Assessment Gateway</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Assessments are proctored examinations that lock down the browser frame. Complete the hardware check below to begin.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 space-y-6 shadow-sm">
              <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3">
                Device Diagnostic Checklist
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: 'camera', label: 'Camera / Webcam check', desc: 'Allows face detection proctoring.' },
                  { key: 'mic', label: 'Audio / Microphone check', desc: 'Allows background voice logs.' },
                  { key: 'screen', label: 'Screen Share permission', desc: 'Allows client screen checks.' },
                  { key: 'network', label: 'Network connection status', desc: 'Pings pinesphere ERP servers.', static: true }
                ].map((chk) => {
                  const isChecked = assessmentPreflight[chk.key as keyof typeof assessmentPreflight];
                  return (
                    <div key={chk.key} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-4">
                      <div className="space-y-1 pr-2">
                        <span className="text-xs font-bold text-slate-800 block">{chk.label}</span>
                        <span className="text-[10px] text-slate-400 block leading-tight">{chk.desc}</span>
                      </div>
                      {chk.static ? (
                        <span className="text-[10px] bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold px-2 py-1 uppercase rounded-sm">Connected</span>
                      ) : (
                        <button
                          onClick={() => setAssessmentPreflight({
                            ...assessmentPreflight,
                            [chk.key]: !isChecked
                          })}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors border ${isChecked
                              ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                              : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
                            }`}
                        >
                          {isChecked ? 'Ready ✓' : 'Verify'}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Past Exam Score History */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm mt-6">
                <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3">
                  Past Examination Scores History
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-widest font-bold">
                        <th className="py-2.5 px-4 font-semibold">Test Paper / Topic</th>
                        <th className="py-2.5 px-4">Completion Date</th>
                        <th className="py-2.5 px-4">Score Obtained</th>
                        <th className="py-2.5 px-4 text-right">Evaluation Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-slate-600">
                      {pastExamResults.map((result: any) => (
                        <tr key={result.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-4 font-semibold text-slate-800">{result.title}</td>
                          <td className="py-3 px-4 text-slate-500">{result.date}</td>
                          <td className="py-3 px-4 font-bold text-slate-800">{result.score} / 100</td>
                          <td className="py-3 px-4 text-right">
                            <span className="inline-block bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold px-2 py-0.5 rounded-sm">
                              {result.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3">
                  Start Exam Panel
                </h3>
                <div className="space-y-3 mt-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Test Paper:</span>
                    <span className="text-slate-800 font-bold">React Architecture Prep</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Duration:</span>
                    <span className="text-slate-800 font-bold">20 Minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Questions:</span>
                    <span className="text-slate-800 font-bold">4 MCQ Items</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleStartExam}
                className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white uppercase tracking-wider mt-6"
              >
                Launch Assessment HUD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
