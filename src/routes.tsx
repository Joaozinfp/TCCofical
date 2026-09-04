import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/DashboardPage';
import LandingPage from './pages/Landing/LandingPage';
import Login from './pages/Login/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<div>Página não encontrada</div>} />
    </Routes>
  );
}
