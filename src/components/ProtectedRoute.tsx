import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredPermission }) => {
  const { isAuthenticated, hasPermission } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission as any)) {
    return (
      <div className="container mt-5 pt-5">
        <div className="alert alert-warning" role="alert">
          <i className="bi bi-shield-exclamation"></i> Você não possui permissão para acessar esta página.
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;