import React, { createContext, useEffect, useState, ReactNode } from 'react';
import api from '../services/api';

type User = {
  id?: string;
  login?: string;
  role?: 'ADMIN' | 'USER';
  [key: string]: any;
};

type AuthContextType = {
  user: User | null;
  login: (login: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      api.get('/auth/me')
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('jwt');
          setUser(null);
        });
    }
  }, []);

  const loginFn = async (login: string, password: string) => {
    const res = await api.post('/auth/login', { login, password });
    localStorage.setItem('jwt', res.data.token);
    const me = await api.get('/auth/me');
    setUser(me.data);
  };

  const logoutFn = () => {
    localStorage.removeItem('jwt');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login: loginFn, logout: logoutFn, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};