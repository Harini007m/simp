"use client";

import React, { useState, useEffect } from 'react';
import { Drawer } from '@/components/admin/ui/Drawer';
import { Stepper } from '@/components/admin/ui/Stepper';
import { Button } from '@/components/admin/ui/Button';
import { Card } from '@/components/admin/ui/Card';
import { ChevronRight, ChevronLeft, Briefcase, Calendar, MapPin, Users, Info, DollarSign } from 'lucide-react';
import { programService } from '@/src/services/program.service';
import { opportunityService } from '@/src/services/opportunity.service';
import { Program } from '@/src/data/mock-programs';
import { Opportunity } from '@/src/data/mock-opportunities';

interface CreateOpportunityWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onOpportunityCreated?: () => void;
  opportunityToView?: Opportunity | null;
  viewMode?: boolean;
}

const STEPS = ['Opportunity Details', 'Review & Post'];

const COLOR_THEMES = [
  { name: 'Blue (Tech)', value: 'from-blue-600/20 to-cyan-600/20 border-blue-500/30 text-blue-400' },
  { name: 'Purple (Design)', value: 'from-purple-600/20 to-pink-600/20 border-purple-500/30 text-purple-400' },
  { name: 'Emerald (Analytics)', value: 'from-emerald-600/20 to-teal-600/20 border-emerald-500/30 text-emerald-400' }
];

export function CreateOpportunityWizard({ 
  isOpen, 
  onClose, 
  onOpportunityCreated, 
  opportunityToView, 
  viewMode = false 
}: CreateOpportunityWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [openings, setOpenings] = useState(1);
  const [locationType, setLocationType] = useState('Remote');
  const [status, setStatus] = useState<'Open' | 'Closed' | 'Draft'>('Open');

  // Landing Page Attributes
  const [type, setType] = useState('Tech');
  const [internshipType, setInternshipType] = useState<'will paid' | 'pay' | 'free' | 'stipend'>('free');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('6 Months');
  const [eligibility, setEligibility] = useState('B.Tech CS/IT (3rd or 4th Year)');
  const [startDate, setStartDate] = useState('Starts Jan 2024');
  const [color, setColor] = useState('from-blue-600/20 to-cyan-600/20 border-blue-500/30 text-blue-400');

  // Error state
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      if (opportunityToView) {
        setTitle(opportunityToView.title || '');
        setOpenings(opportunityToView.openings || 1);
        
        // Location Type matching: On-site, Online, Hybrid, Remote
        const loc = opportunityToView.location || 'Remote';
        if (['On-site', 'Online', 'Hybrid', 'Remote'].includes(loc)) {
          setLocationType(loc);
        } else {
          // Normalize legacy entries
          if (loc.includes('Remote')) setLocationType('Remote');
          else if (loc.includes('Hybrid')) setLocationType('Hybrid');
          else setLocationType('On-site');
        }
        
        setStatus(opportunityToView.status || 'Open');
        setType(opportunityToView.type || 'Tech');
        setInternshipType(opportunityToView.internshipType || 'free');
        setAmount(opportunityToView.amount || '');
        setDescription(opportunityToView.description || '');
        setDuration(opportunityToView.duration || '6 Months');
        setEligibility(opportunityToView.eligibility || 'B.Tech CS/IT (3rd or 4th Year)');
        setStartDate(opportunityToView.startDate || 'Starts Jan 2024');
        setColor(opportunityToView.color || 'from-blue-600/20 to-cyan-600/20 border-blue-500/30 text-blue-400');
        
        if (viewMode) {
          setCurrentStep(1);
        } else {
          setCurrentStep(0);
        }
      } else {
        // Reset form fields
        setTitle('');
        setOpenings(1);
        setLocationType('Remote');
        setStatus('Open');
        setType('Tech');
        setInternshipType('free');
        setAmount('');
        setDescription('');
        setDuration('6 Months');
        setEligibility('B.Tech CS/IT (3rd or 4th Year)');
        setStartDate('Starts Jan 2024');
        setColor('from-blue-600/20 to-cyan-600/20 border-blue-500/30 text-blue-400');
        setCurrentStep(0);
      }
      setErrors({});
    }
  }, [isOpen, opportunityToView, viewMode]);

  const validateStep0 = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!openings || openings < 1) {
      newErrors.openings = 'Openings must be a positive number';
    }
    if (internshipType !== 'free' && !amount.trim()) {
      newErrors.amount = 'Amount is required for paid/stipend positions';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!duration.trim()) {
      newErrors.duration = 'Duration is required';
    }
    if (!eligibility.trim()) {
      newErrors.eligibility = 'Eligibility is required';
    }
    if (!startDate.trim()) {
      newErrors.startDate = 'Start date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 0) {
      if (validateStep0()) {
        setCurrentStep(1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handlePostOpportunity = async () => {
    if (!validateStep0()) {
      setCurrentStep(0);
      return;
    }

    try {
      setIsSubmitting(true);

      await opportunityService.createOpportunity({
        title: title.trim(),
        programId: 'prog-1', // Default linked program
        openings: Number(openings),
        location: locationType,
        status: status,
        type: type.trim(),
        internshipType: internshipType,
        amount: internshipType === 'free' ? undefined : amount.trim(),
        value: 'High Demand', // Default value
        description: description.trim(),
        duration: duration.trim(),
        eligibility: eligibility.trim(),
        startDate: startDate.trim(),
        color: color
      });

      if (onOpportunityCreated) {
        onOpportunityCreated();
      }
      onClose();
    } catch (err) {
      console.error('Failed to post opportunity', err);
      alert('Failed to post opportunity.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDrawerTitle = () => {
    if (viewMode) return "View Opportunity Details";
    return "Post New Opportunity";
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="p-5 bg-white text-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 items-start">
              
              {/* Row 1: Title, Openings, Internship Type */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Opportunity Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => {
                    setTitle(e.target.value);
                    if (errors.title) setErrors(prev => ({ ...prev, title: '' }));
                  }}
                  className={`w-full rounded-lg border px-3 py-2 text-xs focus:outline-none focus:ring-1 transition-all ${
                    errors.title 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                      : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                  placeholder="e.g. Software Engineering Intern"
                />
                {errors.title && <p className="text-[10px] font-semibold text-red-500 mt-0.5">{errors.title}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Total Openings *</label>
                <input
                  type="number"
                  min="1"
                  value={openings}
                  onChange={e => {
                    setOpenings(parseInt(e.target.value) || 0);
                    if (errors.openings) setErrors(prev => ({ ...prev, openings: '' }));
                  }}
                  className={`w-full rounded-lg border px-3 py-2 text-xs focus:outline-none focus:ring-1 transition-all ${
                    errors.openings 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                      : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                  placeholder="e.g. 5"
                />
                {errors.openings && <p className="text-[10px] font-semibold text-red-500 mt-0.5">{errors.openings}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Internship Type *</label>
                <select
                  value={internshipType}
                  onChange={e => {
                    setInternshipType(e.target.value as any);
                    if (errors.amount) setErrors(prev => ({ ...prev, amount: '' }));
                  }}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all bg-white"
                >
                  <option value="free">Free / Unpaid</option>
                  <option value="stipend">Stipend</option>
                  <option value="pay">Pay</option>
                  <option value="will paid">Will Be Paid</option>
                </select>
              </div>

              {/* Row 2: Stipend Amount (conditional), Theme Color, Location Mode, Status */}
              {internshipType !== 'free' ? (
                <div className="space-y-1.5 animate-slide-in">
                  <label className="text-xs font-bold text-slate-700">
                    {internshipType === 'stipend' ? 'Stipend Amount *' : 'Payment Amount *'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400">$</span>
                    <input
                      type="text"
                      value={amount}
                      onChange={e => {
                        setAmount(e.target.value);
                        if (errors.amount) setErrors(prev => ({ ...prev, amount: '' }));
                      }}
                      className={`w-full rounded-lg border pl-6 pr-3 py-2 text-xs focus:outline-none focus:ring-1 transition-all ${
                        errors.amount 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                          : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                      }`}
                      placeholder={internshipType === 'stipend' ? '500/Month' : '25/Hour'}
                    />
                  </div>
                  {errors.amount && <p className="text-[10px] font-semibold text-red-500 mt-0.5">{errors.amount}</p>}
                </div>
              ) : null}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Card Color Theme *</label>
                <select
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all bg-white"
                >
                  {COLOR_THEMES.map(theme => (
                    <option key={theme.value} value={theme.value}>
                      {theme.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Mode *</label>
                <select
                  value={locationType}
                  onChange={e => setLocationType(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all bg-white"
                >
                  <option value="On-site">On-site</option>
                  <option value="Online">Online</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Status *</label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value as any)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all bg-white"
                >
                  <option value="Open">Open</option>
                  <option value="Draft">Draft</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              {/* Row 3: Opportunity Type, Duration, Start Date, Eligibility */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Opportunity Type *</label>
                <input
                  type="text"
                  value={type}
                  onChange={e => setType(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                  placeholder="e.g. Tech"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Duration *</label>
                <input
                  type="text"
                  value={duration}
                  onChange={e => {
                    setDuration(e.target.value);
                    if (errors.duration) setErrors(prev => ({ ...prev, duration: '' }));
                  }}
                  className={`w-full rounded-lg border px-3 py-2 text-xs focus:outline-none focus:ring-1 transition-all ${
                    errors.duration 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                      : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                  placeholder="e.g. 6 Months"
                />
                {errors.duration && <p className="text-[10px] font-semibold text-red-500 mt-0.5">{errors.duration}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Start Date *</label>
                <input
                  type="text"
                  value={startDate}
                  onChange={e => {
                    setStartDate(e.target.value);
                    if (errors.startDate) setErrors(prev => ({ ...prev, startDate: '' }));
                  }}
                  className={`w-full rounded-lg border px-3 py-2 text-xs focus:outline-none focus:ring-1 transition-all ${
                    errors.startDate 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                      : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                  placeholder="e.g. Starts Jan 2024"
                />
                {errors.startDate && <p className="text-[10px] font-semibold text-red-500 mt-0.5">{errors.startDate}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Eligibility Criteria *</label>
                <input
                  type="text"
                  value={eligibility}
                  onChange={e => {
                    setEligibility(e.target.value);
                    if (errors.eligibility) setErrors(prev => ({ ...prev, eligibility: '' }));
                  }}
                  className={`w-full rounded-lg border px-3 py-2 text-xs focus:outline-none focus:ring-1 transition-all ${
                    errors.eligibility 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                      : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                  placeholder="e.g. B.Tech CS/IT"
                />
                {errors.eligibility && <p className="text-[10px] font-semibold text-red-500 mt-0.5">{errors.eligibility}</p>}
              </div>

              {/* Row 4: Job Description (spans all columns) */}
              <div className="space-y-1.5 md:col-span-3 xl:col-span-4">
                <label className="text-xs font-bold text-slate-700">Job Description *</label>
                <textarea
                  value={description}
                  onChange={e => {
                    setDescription(e.target.value);
                    if (errors.description) setErrors(prev => ({ ...prev, description: '' }));
                  }}
                  rows={2}
                  className={`w-full rounded-lg border px-3 py-2 text-xs focus:outline-none focus:ring-1 transition-all ${
                    errors.description 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                      : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                  placeholder="Describe roles, responsibilities, and team context..."
                />
                {errors.description && <p className="text-[10px] font-semibold text-red-500 mt-0.5">{errors.description}</p>}
              </div>

            </div>
          </div>
        );
      case 1:
        return (
          <div className="p-6 space-y-6">
            <Card>
              <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Opportunity Overview</h3>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Opportunity Title</p>
                    <p className="text-sm font-semibold text-slate-900 mt-1">{title}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Status</p>
                    <div className="mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        status === 'Open' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : status === 'Draft'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-slate-400" /> Total Openings
                    </p>
                    <p className="text-sm font-semibold text-slate-900 mt-1">{openings} positions</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" /> Location / Mode
                    </p>
                    <p className="text-sm font-semibold text-slate-900 mt-1">{locationType}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Internship Type</p>
                    <p className="text-sm font-semibold text-slate-900 mt-1 capitalize">{internshipType}</p>
                  </div>
                  {internshipType !== 'free' && (
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Amount</p>
                      <p className="text-sm font-semibold text-slate-900 mt-1">{amount}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Duration</p>
                    <p className="text-sm font-semibold text-slate-900 mt-1">{duration}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Start Date</p>
                    <p className="text-sm font-semibold text-slate-900 mt-1">{startDate}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Eligibility</p>
                    <p className="text-sm font-semibold text-slate-900 mt-1">{eligibility}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Opportunity Type</p>
                    <p className="text-sm font-semibold text-slate-900 mt-1">{type}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Theme Color</p>
                    <p className="text-xs font-semibold mt-1 text-slate-650 truncate max-w-xs">{COLOR_THEMES.find(t => t.value === color)?.name || 'Custom'}</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Description</p>
                  <p className="text-sm text-slate-700 mt-1.5 whitespace-pre-line leading-relaxed">{description}</p>
                </div>
              </div>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={getDrawerTitle()}>
      <div className="flex flex-col h-[calc(100vh-65px)]">
        {!viewMode && <Stepper steps={STEPS} currentStep={currentStep} />}
        
        <div className="flex-1 overflow-y-auto bg-white">
          {renderStepContent()}
        </div>
        
        <div className="shrink-0 border-t border-slate-200 p-4 bg-slate-50 flex items-center justify-between">
          {viewMode ? (
            <div className="w-full flex justify-end">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={currentStep === 0 ? onClose : handleBack}
                disabled={isSubmitting}
              >
                {currentStep === 0 ? 'Cancel' : (
                  <>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </>
                )}
              </Button>
              
              <Button 
                onClick={currentStep === STEPS.length - 1 ? handlePostOpportunity : handleNext}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Posting...'
                ) : currentStep === STEPS.length - 1 ? (
                  'Post Opportunity'
                ) : (
                  <>
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </Drawer>
  );
}
