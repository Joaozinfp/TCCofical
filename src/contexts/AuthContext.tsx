import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, Permissions } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
  permissions: Permissions;
  hasPermission: (permission: keyof Permissions) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const rolePermissions: Record<UserRole, Permissions> = {
  'Administrador': {
    canCreateProject: true,
    canApproveResearch: true,
    canManageVisits: true,
    canManageUsers: true,
    canManageProcess: true,
    canViewDashboard: true,
    canSubmitResearch: true,
    canApplyProcess: true,
  },
  'Coordenação': {
    canCreateProject: true,
    canApproveResearch: true,
    canManageVisits: true,
    canManageUsers: false,
    canManageProcess: true,
    canViewDashboard: true,
    canSubmitResearch: true,
    canApplyProcess: true,
  },
  'Professor Orientador': {
    canCreateProject: true,
    canApproveResearch: true,
    canManageVisits: false,
    canManageUsers: false,
    canManageProcess: true,
    canViewDashboard: true,
    canSubmitResearch: false,
    canApplyProcess: false,
  },
  'Aluno': {
    canCreateProject: false,
    canApproveResearch: false,
    canManageVisits: false,
    canManageUsers: false,
    canManageProcess: false,
    canViewDashboard: true,
    canSubmitResearch: true,
    canApplyProcess: true,
  },
  'Bolsista': {
    canCreateProject: false,
    canApproveResearch: false,
    canManageVisits: false,
    canManageUsers: false,
    canManageProcess: false,
    canViewDashboard: true,
    canSubmitResearch: true,
    canApplyProcess: false,
  },
  'Estagiário': {
    canCreateProject: false,
    canApproveResearch: false,
    canManageVisits: false,
    canManageUsers: false,
    canManageProcess: false,
    canViewDashboard: true,
    canSubmitResearch: false,
    canApplyProcess: false,
  },
  'Voluntário': {
    canCreateProject: false,
    canApproveResearch: false,
    canManageVisits: false,
    canManageUsers: false,
    canManageProcess: false,
    canViewDashboard: false,
    canSubmitResearch: false,
    canApplyProcess: false,
  },
  'Visitante': {
    canCreateProject: false,
    canApproveResearch: false,
    canManageVisits: false,
    canManageUsers: false,
    canManageProcess: false,
    canViewDashboard: false,
    canSubmitResearch: false,
    canApplyProcess: true,
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [permissions, setPermissions] = useState<Permissions>(rolePermissions['Visitante']);

  useEffect(() => {
    const storedUser = localStorage.getItem('eecoe_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      setPermissions(rolePermissions[parsedUser.role as UserRole]);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      setPermissions(rolePermissions[foundUser.role]);
      localStorage.setItem('eecoe_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setPermissions(rolePermissions['Visitante']);
    localStorage.removeItem('eecoe_user');
  };

  const updateUser = (updates: Partial<User>) => {
    setUser(currentUser => {
      if (!currentUser) return currentUser;
      const updatedUser = { ...currentUser, ...updates };
      localStorage.setItem('eecoe_user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const hasPermission = (permission: keyof Permissions): boolean => {
    return permissions[permission];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isAuthenticated, permissions, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};