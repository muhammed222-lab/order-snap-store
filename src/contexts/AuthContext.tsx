
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: any[];
  total: number;
  timestamp: string;
  userAgent: string;
  isSignedIn: boolean;
  status: 'pending' | 'completed';
}

interface AuthContextType {
  user: User | null;
  orders: Order[];
  login: (userData: Omit<User, 'id'>) => void;
  logout: () => void;
  addOrder: (order: Order) => void;
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

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('polytechnic-user-orders');
    return saved ? JSON.parse(saved) : [];
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
    setOrders([]);
    localStorage.removeItem('polytechnic-user');
    localStorage.removeItem('polytechnic-user-orders');
  };

  const addOrder = (order: Order) => {
    const updatedOrders = [...orders, order];
    setOrders(updatedOrders);
    localStorage.setItem('polytechnic-user-orders', JSON.stringify(updatedOrders));
  };

  return (
    <AuthContext.Provider value={{
      user,
      orders,
      login,
      logout,
      addOrder,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};
