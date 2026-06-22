"use client";

import React, { useState, useEffect } from 'react';
import { Drawer } from '@/components/admin/ui/Drawer';
import { Stepper } from '@/components/admin/ui/Stepper';
import { Button } from '@/components/admin/ui/Button';
import { Search, CheckCircle2, ChevronRight, ChevronLeft, Shield, Upload } from 'lucide-react';
import { Card } from '@/components/admin/ui/Card';
import { Role } from '@/src/data/mock-roles';
import { Module } from '@/src/data/mock-modules';
import { roleService } from '@/src/services/role.service';
import { moduleService } from '@/src/services/module.service';

interface CreateUserWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = ['Basic Information', 'Role Assignment', 'Module Override', 'Review & Create'];

export function CreateUserWizard({ isOpen, onClose }: CreateUserWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [assignedModules, setAssignedModules] = useState<string[]>([]);
  
  const [roles, setRoles] = useState<Role[]>([]);
  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [loadedRoles, loadedModules] = await Promise.all([
          roleService.getRoles(),
          moduleService.getModules()
        ]);
        setRoles(loadedRoles);
        setModules(loadedModules);
        
        // Initial defaults
        if (loadedModules.length > 0 && assignedModules.length === 0) {
          setAssignedModules([loadedModules[0].id, loadedModules[1].id]);
        }
      } catch (err) {
        console.error('Failed to load user wizard data', err);
      }
    }
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  // When role changes, we might want to update assigned modules to match the role's default modules
  // For now, we simulate this by assigning random modules
  useEffect(() => {
    if (selectedRole && modules.length > 0) {
      setAssignedModules(modules.slice(0, 3).map(m => m.id));
    }
  }, [selectedRole, modules]);

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

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <input type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Username</label>
                <input type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="johndoe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <input type="email" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Phone Number</label>
                <input type="tel" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="+1 (555) 000-0000" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <input type="password" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Confirm Password</label>
                <input type="password" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="••••••••" />
              </div>
            </div>
            
            <div className="pt-4 space-y-4">
              <label className="text-sm font-medium text-slate-700">Profile Picture</label>
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-slate-300 px-6 pt-5 pb-6 hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-10 w-10 text-slate-400" />
                  <div className="flex text-sm text-slate-600 justify-center">
                    <span className="relative rounded-md font-medium text-blue-600 hover:text-blue-500">
                      Upload a file
                    </span>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
                <span className="text-sm text-slate-700">Send Credentials By Email</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
                <span className="text-sm text-slate-700">Force Password Change On First Login</span>
              </label>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="flex h-full p-6 gap-6">
            <div className="flex-1 space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">Select Role</h3>
              <div className="grid gap-3">
                {roles.map((role) => (
                  <div 
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`relative rounded-lg border p-4 cursor-pointer transition-all ${
                      selectedRole === role.id 
                        ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600' 
                        : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-md ${selectedRole === role.id ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                          <Shield className="h-5 w-5" />
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${selectedRole === role.id ? 'text-blue-900' : 'text-slate-900'}`}>{role.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{role.desc}</p>
                        </div>
                      </div>
                      {selectedRole === role.id && (
                        <CheckCircle2 className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-1/3 shrink-0">
              <div className="sticky top-0 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Modules Inherited</h3>
                {selectedRole ? (
                  <ul className="space-y-2">
                    {assignedModules.map(id => {
                      const mod = modules.find(m => m.id === id);
                      return mod ? (
                        <li key={id} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {mod.name}
                        </li>
                      ) : null;
                    })}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-500 italic">Select a role to preview modules.</p>
                )}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex h-full p-6 gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">Available Modules</h3>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input type="text" placeholder="Search..." className="w-48 rounded-md border border-slate-300 pl-8 pr-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {modules.map((module) => {
                  const isAssigned = assignedModules.includes(module.id);
                  return (
                    <div 
                      key={module.id}
                      onClick={() => toggleModule(module.id)}
                      className={`flex items-center justify-between rounded-lg border p-3 cursor-pointer transition-all ${
                        isAssigned ? 'border-blue-200 bg-blue-50/30' : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-sm font-medium text-slate-700">{module.name}</span>
                      <div className={`flex h-5 w-5 items-center justify-center rounded border ${isAssigned ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white'}`}>
                        {isAssigned && <CheckCircle2 className="h-3 w-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="w-1/3 shrink-0">
              <div className="sticky top-0 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Final Access</h3>
                <ul className="space-y-2">
                  {assignedModules.map(id => {
                    const mod = modules.find(m => m.id === id);
                    return mod ? (
                      <li key={id} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {mod.name}
                      </li>
                    ) : null;
                  })}
                  {assignedModules.length === 0 && (
                    <p className="text-sm text-slate-500 italic">No modules assigned.</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="p-6 space-y-6">
            <Card>
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-semibold text-slate-900">User Summary</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500">Full Name</p>
                    <p className="text-sm font-medium text-slate-900">John Doe</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="text-sm font-medium text-slate-900">john@example.com</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Selected Role</p>
                    <p className="text-sm font-medium text-slate-900">
                      {selectedRole ? roles.find(r => r.id === selectedRole)?.name : 'None'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Credentials</p>
                    <p className="text-sm font-medium text-slate-900">Send via Email</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-semibold text-slate-900">Assigned Modules</h3>
              </div>
              <div className="p-4 flex flex-wrap gap-2">
                {assignedModules.map(id => {
                  const mod = modules.find(m => m.id === id);
                  return mod ? (
                    <span key={id} className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      {mod.name}
                    </span>
                  ) : null;
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
    <Drawer isOpen={isOpen} onClose={onClose} title="Create New User">
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
            {currentStep === STEPS.length - 1 ? 'Create User' : (
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
