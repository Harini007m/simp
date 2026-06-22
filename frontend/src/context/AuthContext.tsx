"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/src/data/mock-users';
import { userService } from '@/src/services/user.service';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMockUser() {
      // For now, hardcode user '1' (Alice Freeman - Student) or '5' (Super Admin equivalent if created).
      // Let's use user '1' who has 'Student' role but give them a simulated login flow.
      try {
        // Find a super admin for this phase testing, or default to user 1.
        const users = await userService.getUsers();
        const admin = users.find(u => u.roleName === 'Super Admin') || users[0];
        setUser(admin);
      } catch (err) {
        console.error("Failed to load user auth", err);
      } finally {
        setLoading(false);
      }
    }
    loadMockUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
