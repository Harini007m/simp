"use client";

import React, { useState, useEffect } from 'react';
import { Play, Pause, Search, AlertCircle, CheckCircle2, UploadCloud, Upload, ChevronRight } from 'lucide-react';
import { lmsService } from '@/src/services/lms.service';
import { Course } from '@/src/data/mock-lms-courses';

export default function LMSPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLectureIndex, setSelectedLectureIndex] = useState(0);

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [lmsCategoryFilter, setLmsCategoryFilter] = useState('all');
  const [lmsSearch, setLmsSearch] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const data = await lmsService.getCourses();
        setCourses(data);
      } catch (err) {
        console.error('Failed to load courses', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setSelectedLectureIndex(0);
    setIsVideoPlaying(false);
  };

  const handleMarkLectureComplete = (courseId: string, lectureIndex: number) => {
    if (selectedCourse && selectedCourse.id === courseId) {
      const updatedCourse = { ...selectedCourse };
      updatedCourse.lectures[lectureIndex].completed = true;
      setSelectedCourse(updatedCourse);
      
      // Update the main courses array
      setCourses(courses.map(c => c.id === courseId ? updatedCourse : c));
    }
  };

  const showToastNotification = (msg: string) => {
    alert(msg);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <span>Execution</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-blue-600 font-extrabold">Learning Pathways</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">LMS Workspace</h2>
          <p className="text-xs text-slate-500 mt-1">
            Access assigned modules, video sessions, and learning materials.
          </p>
        </div>
      </div>

      {selectedCourse ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <button
              onClick={() => setSelectedCourse(null)}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer"
            >
              ← Back to Course Catalog
            </button>
            <h4 className="font-black text-xs text-slate-700 uppercase tracking-widest">{selectedCourse.title}</h4>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900 border border-slate-200 relative aspect-video overflow-hidden flex flex-col justify-between shadow-sm rounded-xl">
                <video
                  autoPlay={isVideoPlaying}
                  muted
                  loop
                  playsInline
                  src={selectedCourse.lectures[selectedLectureIndex]?.videoUrl}
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                {!isVideoPlaying && (
                  <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center z-20">
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="h-16 w-16 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                    >
                      <Play className="h-8 w-8 fill-current translate-x-0.5" />
                    </button>
                  </div>
                )}
                <div className="relative z-30 mt-auto bg-gradient-to-t from-slate-950 to-transparent p-4 flex items-center justify-between">
                  <button
                    onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                    className="h-8 w-8 bg-slate-900 border border-slate-800 text-white hover:text-blue-400 flex items-center justify-center transition-colors cursor-pointer rounded-lg"
                  >
                    {isVideoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current animate-pulse" />}
                  </button>
                  <span className="text-[10px] font-bold text-slate-300 tracking-wider">
                    Lecture {selectedLectureIndex + 1} of {selectedCourse.lectures.length} ({selectedCourse.lectures[selectedLectureIndex]?.duration})
                  </span>
                  <button
                    onClick={() => handleMarkLectureComplete(selectedCourse.id, selectedLectureIndex)}
                    className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border transition-colors rounded-lg cursor-pointer ${selectedCourse.lectures[selectedLectureIndex]?.completed
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500/20'
                      }`}
                  >
                    {selectedCourse.lectures[selectedLectureIndex]?.completed ? 'Completed ✓' : 'Mark Complete'}
                  </button>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
                <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3">
                  Lecture Syllabus & Notes
                </h3>
                <div className="text-xs leading-relaxed text-slate-600 space-y-4">
                  <h4 className="font-bold text-blue-600 text-sm">
                    {selectedCourse.lectures[selectedLectureIndex]?.title}
                  </h4>
                  <p className="bg-slate-50 p-4 border border-slate-150 font-mono text-slate-500 leading-relaxed rounded-lg">
                    {selectedCourse.lectures[selectedLectureIndex]?.notes}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
              <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3">
                Course Content
              </h3>
              <div className="space-y-2">
                {selectedCourse.lectures.map((lec: any, idx: number) => {
                  const isCurrent = idx === selectedLectureIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedLectureIndex(idx);
                        setIsVideoPlaying(false);
                      }}
                      className={`w-full text-left p-3.5 border transition-all text-xs flex justify-between items-center rounded-lg cursor-pointer ${isCurrent
                          ? 'bg-blue-600 border-blue-600 text-white font-bold shadow-md'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                    >
                      <div className="space-y-1 overflow-hidden pr-2">
                        <div className="font-bold truncate">{lec.title}</div>
                        <div className={`text-[9px] font-medium ${isCurrent ? 'text-blue-100' : 'text-slate-400'}`}>
                          {lec.duration}
                        </div>
                      </div>
                      <span className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold border shrink-0 ${lec.completed
                          ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                          : isCurrent ? 'bg-blue-500 border-blue-400 text-white' : 'bg-white border-slate-200 text-slate-400'
                        }`}>
                        {lec.completed ? '✓' : idx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 border border-blue-900 text-white p-6 shadow-md rounded-xl">
            <span className="text-[9px] font-bold text-blue-200 uppercase tracking-widest">Education Terminal</span>
            <h2 className="text-xl font-black text-white mt-1">LMS Learning Pathways</h2>
            <p className="text-xs text-blue-100 mt-2 max-w-xl">
              Enrolled modules designed by Pinesphere Enterprise. Watch sessions, log modules completed, and verify test components.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {[
                { key: 'all', label: 'All Pathways' },
                { key: 'frontend', label: 'Frontend UI' },
                { key: 'backend', label: 'Backend Dev' },
                { key: 'system', label: 'System Ops' }
              ].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setLmsCategoryFilter(cat.key)}
                  className={`px-4 py-2 text-xs font-bold transition-all border rounded-lg cursor-pointer ${lmsCategoryFilter === cat.key
                      ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search modules..."
                value={lmsSearch}
                onChange={(e) => setLmsSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.filter((course: Course) => {
              const matchesSearch = course.title.toLowerCase().includes(lmsSearch.toLowerCase()) || course.category.toLowerCase().includes(lmsSearch.toLowerCase());
              const matchesCategory = lmsCategoryFilter === 'all' || course.category.toLowerCase().includes(lmsCategoryFilter);
              return matchesSearch && matchesCategory;
            }).map((course: Course) => (
              <div key={course.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between hover:border-blue-600/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer group">
                <img src={course.image} alt={course.title} className="h-44 w-full object-cover border-b border-slate-100 group-hover:scale-105 transition-transform duration-500" />
                <div className="p-6 space-y-4 bg-white relative z-10 h-full flex flex-col">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">
                      {course.category}
                    </span>
                    {course.progress === 100 && (
                      <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-100 px-2 py-0.5 animate-pulse rounded">
                        ✓ Cleared
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-base text-slate-800 leading-snug line-clamp-2 min-h-[44px]">
                    {course.title}
                  </h3>

                  <div className="space-y-1.5 pt-2 mt-auto">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400">
                      <span>Progress Complete</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>

                  {course.progress === 100 ? (
                    <button
                      onClick={() => showToastNotification(`Pathway complete! Certificate is ready.`)}
                      className="w-full mt-4 py-2.5 bg-emerald-600 rounded-lg hover:bg-emerald-700 text-white text-xs font-bold transition-all uppercase tracking-wider shadow-sm cursor-pointer"
                    >
                      Claim Certificate
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSelectCourse(course)}
                      className="w-full mt-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 text-xs font-bold text-slate-700 transition-all uppercase tracking-wider cursor-pointer"
                    >
                      Open Curriculum
                    </button>
                  )}
                </div>
              </div>
            ))}

            {courses.filter((course: Course) => {
              const matchesSearch = course.title.toLowerCase().includes(lmsSearch.toLowerCase()) || course.category.toLowerCase().includes(lmsSearch.toLowerCase());
              const matchesCategory = lmsCategoryFilter === 'all' || course.category.toLowerCase().includes(lmsCategoryFilter);
              return matchesSearch && matchesCategory;
            }).length === 0 && (
              <div className="col-span-full bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-400 space-y-2 shadow-sm">
                <AlertCircle className="h-8 w-8 text-slate-300 mx-auto" />
                <p className="text-sm font-medium text-slate-600">No courses found matching criteria.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
