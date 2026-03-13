"use client";

import { useUser } from '@clerk/nextjs';
import { createContext, useContext } from 'react';

const AuthContext = createContext({});

type AuthProviderProps = {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { user } = useUser();
  
  return (    
    <AuthContext.Provider value={{ user }}>    
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}