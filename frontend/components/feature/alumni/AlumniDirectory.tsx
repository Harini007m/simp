'use client';
import { useState, useEffect } from 'react';
import { AlumniProfile } from '@/src/types/alumni.types';
import { AlumniService } from '@/src/services/alumni.service';
import { GraduationCap, Link, Briefcase, MapPin, Search, Filter, Plus, Loader2, Mail, CheckCircle, Trash2, Phone, Calendar, Award, Building, User } from 'lucide-react';
import { Drawer } from '../ui/Drawer';

export default function AlumniDirectory() {
  const [alumni, setAlumni] = useState<AlumniProfile[]>([]);
  const [loading, setLoading] = useState(true);

  // Add Alumni Drawer state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [batch, setBatch] = useState('Class of 2025');
  const [graduationYear, setGraduationYear] = useState<number>(2025);
  const [currentCompany, setCurrentCompany] = useState('');
  const [currentDesignation, setCurrentDesignation] = useState('');
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [isMentoring, setIsMentoring] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Profile View Drawer state
  const [selectedAlumni, setSelectedAlumni] = useState<AlumniProfile | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [mentoringFilter, setMentoringFilter] = useState<'All' | 'Mentoring' | 'Not Mentoring'>('All');
  const [yearFilter, setYearFilter] = useState<'All' | '2026' | '2025' | '2024' | '2023'>('All');

  useEffect(() => {
    loadAlumni();
  }, []);

  const loadAlumni = async () => {
    setLoading(true);
    try {
      const data = await AlumniService.getAlumni();
      setAlumni(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = async (id: string) => {
    setLoadingDetail(true);
    setIsViewOpen(true);
    try {
      const detail = await AlumniService.getAlumniById(id);
      setSelectedAlumni(detail);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleCreateAlumni = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      await AlumniService.createAlumni({
        name,
        email,
        phone,
        batch,
        graduationYear,
        currentCompany: currentCompany || 'Self-Employed',
        currentDesignation: currentDesignation || 'Software Engineer',
        linkedInUrl,
        isMentoring
      });

      // Clear fields
      setName('');
      setEmail('');
      setPhone('');
      setBatch('Class of 2025');
      setGraduationYear(2025);
      setCurrentCompany('');
      setCurrentDesignation('');
      setLinkedInUrl('');
      setIsMentoring(false);
      setIsAddOpen(false);

      // Refresh
      await loadAlumni();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAlumni = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this alumni profile? This action will permanently remove the record from the database.")) return;
    try {
      await AlumniService.deleteAlumni(id);
      await loadAlumni();
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered alumni profiles
  const filteredAlumni = alumni.filter(al => {
    const matchesSearch = 
      al.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      al.currentCompany.toLowerCase().includes(searchQuery.toLowerCase()) || 
      al.currentDesignation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      al.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesMentoring = true;
    if (mentoringFilter === 'Mentoring') matchesMentoring = al.isMentoring;
    else if (mentoringFilter === 'Not Mentoring') matchesMentoring = !al.isMentoring;

    let matchesYear = true;
    if (yearFilter !== 'All') matchesYear = String(al.graduationYear) === yearFilter;

    return matchesSearch && matchesMentoring && matchesYear;
  });

  return (
    <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden mt-6 font-sans">
      
      {/* Header section with search filters and Add Profile button */}
      <div className="p-5 border-b border-border flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-slate-50/50">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-text-primary tracking-tight flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-indigo-650" /> Global Alumni Network
          </h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search bar */}
          <div className="relative flex-grow sm:w-64">
            <Search className="h-4 w-4 text-text-secondary absolute left-3 top-3.5" />
            <input 
              type="text" 
              placeholder="Search alumni..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-border rounded-xl pl-9.5 pr-4 py-2.5 text-xs focus:outline-none focus:border-primary font-medium text-text-primary"
            />
          </div>

          {/* Mentoring Filter selector */}
          <select
            value={mentoringFilter}
            onChange={(e) => setMentoringFilter(e.target.value as any)}
            className="bg-white border border-border rounded-xl px-3 py-2 text-xs font-bold text-text-primary focus:outline-none cursor-pointer"
          >
            <option value="All">All Mentoring Status</option>
            <option value="Mentoring">Active Mentors Only</option>
            <option value="Not Mentoring">Not Mentoring</option>
          </select>

          {/* Graduation Year selector */}
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value as any)}
            className="bg-white border border-border rounded-xl px-3 py-2 text-xs font-bold text-text-primary focus:outline-none cursor-pointer"
          >
            <option value="All">All Class Years</option>
            <option value="2026">Class of 2026</option>
            <option value="2025">Class of 2025</option>
            <option value="2024">Class of 2024</option>
            <option value="2023">Class of 2023</option>
          </select>

          <button 
            onClick={() => setIsAddOpen(true)}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-black transition-all font-bold text-xs cursor-pointer shadow-md shadow-slate-900/10"
          >
            <Plus className="h-4 w-4" /> Add Alumni
          </button>
        </div>
      </div>

      {/* Alumni Cards Grid */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-text-secondary font-semibold">
            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
            Loading alumni network directory...
          </div>
        ) : (
          filteredAlumni.map(al => (
            <div 
              key={al.id} 
              onClick={() => handleViewProfile(al.id)}
              className="bg-white rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden flex flex-col justify-between min-h-[190px] cursor-pointer"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div>
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-full bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center font-extrabold text-indigo-650 text-base shadow-sm">
                    {al.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-text-primary leading-tight truncate group-hover:text-indigo-650 transition-colors">{al.name}</h3>
                    <p className="text-[10px] text-indigo-650 font-bold mt-0.5 uppercase tracking-wider">{al.batch} • Class of {al.graduationYear}</p>
                  </div>
                  <div className="flex gap-2">
                    {al.linkedInUrl && (
                      <a 
                        href={al.linkedInUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={(e) => e.stopPropagation()}
                        className="text-text-secondary hover:text-indigo-650 transition-colors"
                      >
                        <Link className="h-4.5 w-4.5" />
                      </a>
                    )}
                    <button 
                      onClick={(e) => handleDeleteAlumni(e, al.id)}
                      className="text-text-secondary hover:text-rose-600 transition-colors cursor-pointer"
                      title="Delete Profile"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
                    <Briefcase className="h-4 w-4 text-text-secondary shrink-0" />
                    <span className="truncate">
                      {al.currentDesignation} at <span className="font-bold text-text-primary">{al.currentCompany}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary font-medium">
                    <MapPin className="h-4 w-4 text-text-secondary shrink-0" />
                    <span>{al.careerHistory?.[0]?.location || 'Bangalore'}</span>
                  </div>
                </div>
              </div>
              
              {al.isMentoring && (
                <div className="mt-4 pt-3.5 border-t border-border flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
                    <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                    Active Peer Mentor
                  </span>
                </div>
              )}
            </div>
          ))
        )}

        {filteredAlumni.length === 0 && !loading && (
          <div className="col-span-full py-12 text-center text-text-secondary font-medium">
            No alumni match current search filters.
          </div>
        )}
      </div>

      {/* --- DRAWERS --- */}

      {/* Profile View Drawer */}
      <Drawer
        isOpen={isViewOpen}
        onClose={() => {
          setIsViewOpen(false);
          setSelectedAlumni(null);
        }}
        title="Alumni Profile Detail"
      >
        {loadingDetail ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-text-secondary">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
            <p className="font-semibold">Fetching detailed profile...</p>
          </div>
        ) : selectedAlumni ? (
          <div className="flex-1 flex flex-col overflow-y-auto">
            {/* Profile Header */}
            <div className="p-8 bg-gradient-to-br from-slate-50 to-white border-b border-border">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="h-24 w-24 rounded-3xl bg-indigo-600 flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-indigo-200">
                  {selectedAlumni.name.charAt(0)}
                </div>
                <div className="text-center md:text-left space-y-2">
                  <h2 className="text-3xl font-black text-text-primary tracking-tight">{selectedAlumni.name}</h2>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">
                      {selectedAlumni.batch}
                    </span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold uppercase tracking-wider">
                      {selectedAlumni.program || 'Engineering'}
                    </span>
                    {selectedAlumni.isMentoring && (
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Mentor
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                    {selectedAlumni.linkedInUrl && (
                      <a href={selectedAlumni.linkedInUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:underline">
                        <Link className="w-4 h-4" /> LinkedIn Profile
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-8 space-y-10">
              {/* Contact Information */}
              <section>
                <h3 className="text-xs font-black text-text-secondary uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
                  <User className="w-4 h-4" /> Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <Mail className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Email Address</p>
                      <p className="text-sm font-bold text-text-primary">{selectedAlumni.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <Phone className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Phone Number</p>
                      <p className="text-sm font-bold text-text-primary">{selectedAlumni.phone || 'Not Provided'}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Current Role */}
              <section>
                <h3 className="text-xs font-black text-text-secondary uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Current Placement
                </h3>
                <div className="p-6 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
                  <Building className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10" />
                  <div className="relative z-10">
                    <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Current Role</p>
                    <h4 className="text-2xl font-black mb-1">{selectedAlumni.currentDesignation}</h4>
                    <p className="text-lg font-bold text-indigo-100 mb-6">at {selectedAlumni.currentCompany}</p>
                    
                    <div className="flex gap-8">
                      <div>
                        <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest mb-1">Location</p>
                        <p className="text-sm font-bold flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" /> Bangalore, India
                        </p>
                      </div>
                      <div>
                        <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest mb-1">Member Since</p>
                        <p className="text-sm font-bold flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" /> {selectedAlumni.graduationYear}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Career History */}
              <section>
                <h3 className="text-xs font-black text-text-secondary uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Career Progression
                </h3>
                <div className="space-y-4">
                  {selectedAlumni.careerHistory && selectedAlumni.careerHistory.length > 0 ? (
                    selectedAlumni.careerHistory.map((job, idx) => (
                      <div key={job.id} className="relative pl-8 pb-4">
                        {idx !== selectedAlumni.careerHistory.length - 1 && (
                          <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-slate-100" />
                        )}
                        <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full bg-white border-2 border-indigo-500 flex items-center justify-center z-10">
                          <div className={`h-2 w-2 rounded-full ${job.isCurrent ? 'bg-indigo-500 animate-pulse' : 'bg-slate-300'}`} />
                        </div>
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-text-primary">{job.designation}</h4>
                            <span className="text-[10px] font-black text-text-secondary uppercase bg-slate-100 px-2 py-0.5 rounded-md">
                              {new Date(job.startDate).getFullYear()} - {job.isCurrent ? 'Present' : job.endDate ? new Date(job.endDate).getFullYear() : ''}
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-indigo-600">{job.companyName}</p>
                          <p className="text-xs text-text-secondary mt-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {job.location}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <p className="text-sm font-bold text-text-secondary">No career history recorded.</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Stats & Impact */}
              <section className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">Referrals</span>
                  </div>
                  <p className="text-2xl font-black text-emerald-700">{selectedAlumni.referralsProvided || 0}</p>
                  <p className="text-[10px] font-bold text-emerald-600 uppercase mt-1">Students Referred</p>
                </div>
                <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-[10px] font-black text-blue-700 uppercase tracking-wider">Mentorship</span>
                  </div>
                  <p className="text-2xl font-black text-blue-700">{selectedAlumni.isMentoring ? 'Active' : 'Inactive'}</p>
                  <p className="text-[10px] font-bold text-blue-600 uppercase mt-1">Mentor Status</p>
                </div>
              </section>
            </div>
            
            <div className="mt-auto p-8 border-t border-border bg-slate-50 flex justify-between items-center">
              <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                Last Profile Update: {new Date(selectedAlumni.lastUpdated).toLocaleDateString()}
              </p>
              <button 
                onClick={() => setIsViewOpen(false)}
                className="px-6 py-2.5 bg-white border border-border rounded-xl font-bold text-xs text-text-primary hover:bg-slate-50 transition-all shadow-sm"
              >
                Close Profile
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-text-secondary">
            <p className="font-semibold">Failed to load alumni profile.</p>
          </div>
        )}
      </Drawer>

      {/* Add Alumni Drawer */}
      <Drawer
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add Alumni Directory Profile"
      >
        <form onSubmit={handleCreateAlumni} className="flex-1 flex flex-col p-6 space-y-5 overflow-y-auto">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., John Doe"
              className="w-full bg-slate-50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all font-medium text-text-primary placeholder-slate-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Batch Name</label>
              <input
                type="text"
                required
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                placeholder="e.g., Class of 2025"
                className="w-full bg-slate-50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all font-medium text-text-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Graduation Year</label>
              <input
                type="number"
                required
                value={graduationYear}
                onChange={(e) => setGraduationYear(parseInt(e.target.value) || 2025)}
                className="w-full bg-slate-50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all font-mono font-bold text-text-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Contact Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g., john@example.com"
                className="w-full bg-slate-50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all font-medium text-text-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Phone number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g., 9876543210"
                className="w-full bg-slate-50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all font-medium text-text-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Current Company</label>
              <input
                type="text"
                required
                value={currentCompany}
                onChange={(e) => setCurrentCompany(e.target.value)}
                placeholder="e.g., Google"
                className="w-full bg-slate-50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all font-medium text-text-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Designation</label>
              <input
                type="text"
                required
                value={currentDesignation}
                onChange={(e) => setCurrentDesignation(e.target.value)}
                placeholder="e.g., Senior Developer"
                className="w-full bg-slate-50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all font-medium text-text-primary"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">LinkedIn Profile URL</label>
            <input
              type="url"
              value={linkedInUrl}
              onChange={(e) => setLinkedInUrl(e.target.value)}
              placeholder="e.g., https://linkedin.com/in/johndoe"
              className="w-full bg-slate-50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all font-medium text-text-primary"
            />
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-border">
            <input
              type="checkbox"
              id="isMentoring"
              checked={isMentoring}
              onChange={(e) => setIsMentoring(e.target.checked)}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
            <label htmlFor="isMentoring" className="text-xs font-bold text-text-primary cursor-pointer">
              Willing to mentor current students?
            </label>
          </div>

          <div className="pt-4 mt-auto border-t border-border flex gap-3">
            <button
              type="button"
              onClick={() => setIsAddOpen(false)}
              className="flex-1 px-4 py-3 border border-border rounded-xl text-sm font-bold text-text-secondary hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-2 px-4 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all shadow-lg shadow-slate-900/10 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Create Alumni Profile'
              )}
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}
