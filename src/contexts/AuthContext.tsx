
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: Omit<User, 'id'>) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('polytechnic-user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData: Omit<User, 'id'>) => {
    const newUser = {
      ...userData,
      id: Date.now().toString()
    };
    setUser(newUser);
    localStorage.setItem('polytechnic-user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('polytechnic-user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};
