import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import LandingPage from './pages/Landing/LandingPage';
import Login from './pages/Login/LoginPage';
import Dashboard from './pages/Dashboard/DashboardPage';
import Visitacao from './pages/Visitacao/VisitacaoPage';
import Pesquisa from './pages/Pesquisa/PesquisaPage';
import Projetos from './pages/Projetos/ProjetosPage';
import Processos from './pages/Processos/ProcessosPage';
import Agenda from './pages/Agenda/AgendaPage';
import Materiais from './pages/Materiais/MateriaisPage';
import Perfil from './pages/Perfil/PerfilPage';
import Configuracoes from './pages/Configuracoes/ConfiguracoesPage';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/forms.css';
import './styles/responsive.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
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
            <Route
              path="/visitacao"
              element={
                <ProtectedRoute>
                  <Visitacao />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pesquisa"
              element={
                <ProtectedRoute>
                  <Pesquisa />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projetos"
              element={
                <ProtectedRoute>
                  <Projetos />
                </ProtectedRoute>
              }
            />
            <Route path="/processo-seletivo" element={<ProtectedRoute><Processos /></ProtectedRoute>} />
            <Route path="/agenda" element={<ProtectedRoute><Agenda /></ProtectedRoute>} />
            <Route path="/materiais" element={<ProtectedRoute><Materiais /></ProtectedRoute>} />
            <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
            <Route path="/configuracoes" element={<ProtectedRoute><Configuracoes /></ProtectedRoute>} />
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;