"use client";

import React, { useState } from 'react';
import { Drawer } from '@/components/admin/ui/Drawer';
import { Stepper } from '@/components/admin/ui/Stepper';
import { Button } from '@/components/admin/ui/Button';
import { Search, ChevronRight, ChevronLeft, Upload, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '@/components/admin/ui/Card';
import { Module } from '@/src/data/mock-modules';
import { moduleService } from '@/src/services/module.service';
import { permissionService } from '@/src/services/permission.service';

interface CreateRoleWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = ['Role Details', 'Module Assignment', 'Permission Assignment', 'Review & Create'];

export function CreateRoleWizard({ isOpen, onClose }: CreateRoleWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [assignedModules, setAssignedModules] = useState<string[]>([]);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [permissionsMap, setPermissionsMap] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function loadData() {
      try {
        const mods = await moduleService.getModules();
        setModules(mods);
        setAssignedModules(mods.slice(0, 3).map(m => m.id)); // Pre-assign a few
        if (mods.length > 0) setExpandedModules([mods[0].id]);
      } catch (err) {
        console.error('Failed to load modules', err);
      } finally {
        setLoading(false);
      }
    }
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  React.useEffect(() => {
    async function fetchPermissions() {
      const newMap: Record<string, string[]> = {};
      for (const modId of assignedModules) {
        if (!permissionsMap[modId]) {
          newMap[modId] = await permissionService.getPermissionsForModule(modId);
        }
      }
      if (Object.keys(newMap).length > 0) {
        setPermissionsMap(prev => ({...prev, ...newMap}));
      }
    }
    fetchPermissions();
  }, [assignedModules, permissionsMap]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const toggleModule = (id: string) => {
    setAssignedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const toggleExpand = (id: string) => {
    setExpandedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Role Name</label>
                <input type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="e.g. Student" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Role Code</label>
                <input type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="e.g. ROLE_STUDENT" />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium text-slate-700">Description</label>
                <textarea className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" rows={3} placeholder="Brief description of this role's responsibilities" />
              </div>
            </div>
            
            <div className="pt-4 space-y-4">
              <label className="text-sm font-medium text-slate-700">Role Icon</label>
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-slate-300 px-6 pt-5 pb-6 hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-10 w-10 text-slate-400" />
                  <div className="flex text-sm text-slate-600 justify-center">
                    <span className="relative rounded-md font-medium text-blue-600 hover:text-blue-500">
                      Upload SVG or PNG
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Suggested size: 64x64px</p>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <label className="text-sm font-medium text-slate-700">Status</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="status" className="text-blue-600 focus:ring-blue-600" defaultChecked />
                  <span className="text-sm font-medium text-slate-900">Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="status" className="text-blue-600 focus:ring-blue-600" />
                  <span className="text-sm font-medium text-slate-900">Inactive</span>
                </label>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Select Modules</h3>
                <p className="text-xs text-slate-500">Choose the modules this role will have access to.</p>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="text" placeholder="Search modules..." className="w-56 rounded-md border border-slate-300 pl-8 pr-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {modules.map((module) => {
                const isSelected = assignedModules.includes(module.id);
                return (
                  <div 
                    key={module.id}
                    onClick={() => toggleModule(module.id)}
                    className={`relative rounded-xl border p-4 cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600' 
                        : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white'}`}>
                        {isSelected && <CheckCircle2 className="h-3 w-3" />}
                      </div>
                      <div>
                        <p className={`text-sm font-semibold ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>{module.name}</p>
                        <p className="text-xs text-slate-500 mt-1">{module.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Configure Permissions</h3>
              <p className="text-xs text-slate-500">Set fine-grained access controls for each assigned module.</p>
            </div>

            <div className="space-y-3">
              {assignedModules.map(moduleId => {
                const module = modules.find(m => m.id === moduleId);
                if (!module) return null;
                const perms = permissionsMap[moduleId] || ['View', 'Create', 'Edit', 'Delete'];
                const isExpanded = expandedModules.includes(moduleId);

                return (
                  <div key={moduleId} className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                    <div 
                      className="flex items-center justify-between p-4 cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors"
                      onClick={() => toggleExpand(moduleId)}
                    >
                      <span className="font-semibold text-sm text-slate-900">{module.name}</span>
                      {isExpanded ? <ChevronUp className="h-5 w-5 text-slate-500" /> : <ChevronDown className="h-5 w-5 text-slate-500" />}
                    </div>
                    
                    {isExpanded && (
                      <div className="p-4 border-t border-slate-200 bg-white">
                        <div className="grid grid-cols-2 gap-3">
                          {perms.map(perm => (
                            <label key={perm} className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-50 cursor-pointer">
                              <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600" defaultChecked={perm === 'View'} />
                              <span className="text-sm font-medium text-slate-700">{perm}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              {assignedModules.length === 0 && (
                <div className="text-center py-8 text-sm text-slate-500 bg-slate-50 rounded-lg border border-slate-200 border-dashed">
                  No modules assigned. Go back to assign modules.
                </div>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="p-6 space-y-6">
            <Card>
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-semibold text-slate-900">Role Summary</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500">Role Name</p>
                    <p className="text-sm font-medium text-slate-900">Student</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Role Code</p>
                    <p className="text-sm font-medium text-slate-900">ROLE_STUDENT</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-slate-500">Description</p>
                    <p className="text-sm font-medium text-slate-900">Can access LMS and submit tasks.</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Status</p>
                    <span className="inline-flex items-center rounded-md bg-emerald-100 px-2 py-1 mt-1 text-xs font-medium text-emerald-700">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-semibold text-slate-900">Permissions Overview</h3>
              </div>
              <div className="p-4 space-y-4">
                {assignedModules.map(moduleId => {
                  const module = modules.find(m => m.id === moduleId);
                  if (!module) return null;
                  return (
                    <div key={moduleId} className="space-y-2 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                      <p className="text-sm font-semibold text-slate-900">{module.name}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 border border-slate-200">
                          View
                        </span>
                        <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 border border-slate-200">
                          Edit
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Create New Role">
      <div className="flex flex-col h-[calc(100vh-65px)]">
        <Stepper steps={STEPS} currentStep={currentStep} />
        
        <div className="flex-1 overflow-y-auto bg-white">
          {renderStepContent()}
        </div>
        
        <div className="shrink-0 border-t border-slate-200 p-4 bg-slate-50 flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={currentStep === 0 ? onClose : handleBack}
          >
            {currentStep === 0 ? 'Cancel' : (
              <>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </>
            )}
          </Button>
          
          <Button 
            onClick={currentStep === STEPS.length - 1 ? onClose : handleNext}
          >
            {currentStep === STEPS.length - 1 ? 'Create Role' : (
              <>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
