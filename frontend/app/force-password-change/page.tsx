"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/src/services/auth.service';
import Toast from '@/components/ui/toast';
import { useAuth } from '@/src/context/AuthContext';

export default function ForcePasswordChangePage() {
  const router = useRouter();
  const { login } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastConfig, setToastConfig] = useState<{ show: boolean; title: string; message: string; type: "success" | "error" | "warning" | "info" }>({ 
    show: false, title: '', message: '', type: 'error' 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setToastConfig({ show: true, title: 'Error', message: 'Passwords do not match.', type: 'error' });
      return;
    }
    
    setIsSubmitting(true);
    try {
      await authService.changePassword({ old_password: oldPassword, new_password: newPassword });
      setToastConfig({ show: true, title: 'Success', message: 'Password updated. Redirecting...', type: 'success' });
      
      // Refresh user context so forcePasswordChange is cleared
      await login();
      
      setTimeout(() => router.push('/dashboard'), 1500);
    } catch (err: any) {
      const errorMsg = err?.response?.data?.detail || 'Failed to update password. Please check your current password.';
      setToastConfig({ show: true, title: 'Error', message: errorMsg, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-[family-name:var(--font-work-sans)]">
      <div className="max-w-md w-full bg-white p-8 border border-slate-200 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-2 font-[family-name:var(--font-outfit)]">Force Password Change</h2>
        <p className="text-sm text-slate-600 text-center mb-6">Your administrator requires you to change your password before continuing.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Current Password</label>
            <input 
              type="password" 
              required 
              value={oldPassword} 
              onChange={e => setOldPassword(e.target.value)} 
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">New Password</label>
            <input 
              type="password" 
              required 
              value={newPassword} 
              onChange={e => setNewPassword(e.target.value)} 
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Confirm New Password</label>
            <input 
              type="password" 
              required 
              value={confirmPassword} 
              onChange={e => setConfirmPassword(e.target.value)} 
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border" 
            />
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 mt-6"
          >
            {isSubmitting ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
      {toastConfig.show && (
        <Toast 
          title={toastConfig.title} 
          message={toastConfig.message} 
          type={toastConfig.type} 
          onClose={() => setToastConfig(prev => ({ ...prev, show: false }))} 
        />
      )}
    </div>
  );
}
