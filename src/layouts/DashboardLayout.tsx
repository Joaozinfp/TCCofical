import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import './DashboardLayout.css';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'bi-grid' },
  { path: '/visitacao', label: 'Visitação', icon: 'bi-calendar' },
  { path: '/pesquisa', label: 'Pesquisa', icon: 'bi-book' },
  { path: '/projetos', label: 'Projetos', icon: 'bi-folder' },
  { path: '/processo-seletivo', label: 'Processo Seletivo', icon: 'bi-clipboard' },
  { path: '/agenda', label: 'Agenda', icon: 'bi-calendar-week' },
  { path: '/materiais', label: 'Materiais', icon: 'bi-file-earmark' },
  { path: '/perfil', label: 'Perfil', icon: 'bi-person' },
  { path: '/configuracoes', label: 'Configurações', icon: 'bi-gear' },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard-page">
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img src="/images/eecoe-logo.svg" alt="EEcoE Logo" className="sidebar-logo" />
          <h5>EEcoE Dashboard</h5>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Fechar menu">
            <i className="bi bi-x"></i>
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Menu principal">
          {navigationItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              aria-current={location.pathname === item.path ? 'page' : undefined}
            >
              <i className={`bi ${item.icon}`}></i> {item.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="nav-item logout-btn">
            <i className="bi bi-box-arrow-right"></i> Sair
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      <div className="main-content">
        <header className="dashboard-header">
          <button className="menu-toggle" onClick={() => setSidebarOpen(true)} aria-label="Abrir menu">
            <i className="bi bi-list"></i>
          </button>

          <div className="header-search">
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Pesquisar..." aria-label="Pesquisar" />
          </div>

          <div className="header-actions">
            <div className="notification-dropdown">
              <button
                className="notification-btn"
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Notificações"
                aria-expanded={showNotifications}
              >
                <i className="bi bi-bell"></i>
                {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
              </button>

              {showNotifications && (
                <div className="notification-menu">
                  <div className="notification-header">
                    <h6>Notificações</h6>
                    <button onClick={markAllAsRead} className="btn btn-link btn-sm">
                      Marcar todas como lidas
                    </button>
                  </div>
                  <div className="notification-list">
                    {notifications.slice(0, 5).map(notification => (
                      <div key={notification.id} className={`notification-item ${!notification.read ? 'unread' : ''}`}>
                        <div className="notification-icon">
                          <i className={`bi bi-${notification.type === 'success' ? 'check-circle' : 'info-circle'}`}></i>
                        </div>
                        <div className="notification-content">
                          <h6>{notification.title}</h6>
                          <p>{notification.message}</p>
                          <span className="notification-time">
                            {new Date(notification.createdAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="user-menu">
              <div className="user-info">
                <img src={user?.avatar || '/images/avatar-default.svg'} alt={user?.name} className="user-avatar" />
                <div className="user-details">
                  <span className="user-name">{user?.name}</span>
                  <span className="user-role">{user?.role}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;