import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { mockVisits, mockResearches, mockProjects, mockEvents } from '../../data/mockData';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);

  const stats = [
    { value: mockVisits.filter(v => v.status === 'Confirmada').length, label: 'Visitas agendadas', icon: 'bi-calendar-check', color: 'primary' },
    { value: mockResearches.filter(r => r.status === 'Em andamento').length, label: 'Pesquisas em andamento', icon: 'bi-book', color: 'success' },
    { value: mockProjects.filter(p => p.status === 'Em andamento').length, label: 'Projetos ativos', icon: 'bi-folder', color: 'warning' },
    { value: mockEvents.length, label: 'Eventos', icon: 'bi-calendar-event', color: 'info' },
  ];

  const recentActivities = [
    { id: 1, action: 'Nova visita solicitada', description: 'Colégio Estadual Pinheiral', time: '2 horas atrás', icon: 'bi-building' },
    { id: 2, action: 'Pesquisa atualizada', description: 'Levantamento de Aves no EEcoE', time: '5 horas atrás', icon: 'bi-book' },
    { id: 3, action: 'Projeto aprovado', description: 'Monitoramento de Biodiversidade', time: '1 dia atrás', icon: 'bi-check-circle' },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img src="/images/eecoe-logo.svg" alt="EEcoE Logo" className="sidebar-logo" />
          <h5>EEcoE Dashboard</h5>
          <button className="sidebar-close" onClick={toggleSidebar} aria-label="Fechar menu">
            <i className="bi bi-x"></i>
          </button>
        </div>
        
        <nav className="sidebar-nav" aria-label="Menu principal">
          <Link to="/dashboard" className="nav-item active" aria-current="page">
            <i className="bi bi-grid"></i> Dashboard
          </Link>
          <Link to="/visitacao" className="nav-item">
            <i className="bi bi-calendar"></i> Visitação
          </Link>
          <Link to="/pesquisa" className="nav-item">
            <i className="bi bi-book"></i> Pesquisa
          </Link>
          <Link to="/projetos" className="nav-item">
            <i className="bi bi-folder"></i> Projetos
          </Link>
          <Link to="/processo-seletivo" className="nav-item">
            <i className="bi bi-clipboard"></i> Processo Seletivo
          </Link>
          <Link to="/agenda" className="nav-item">
            <i className="bi bi-calendar-week"></i> Agenda
          </Link>
          <Link to="/materiais" className="nav-item">
            <i className="bi bi-file-earmark"></i> Materiais
          </Link>
          <Link to="/perfil" className="nav-item">
            <i className="bi bi-person"></i> Perfil
          </Link>
          <Link to="/configuracoes" className="nav-item">
            <i className="bi bi-gear"></i> Configurações
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="nav-item logout-btn">
            <i className="bi bi-box-arrow-right"></i> Sair
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <button className="menu-toggle" onClick={toggleSidebar} aria-label="Abrir menu">
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
                {unreadCount > 0 && (
                  <span className="notification-badge">{unreadCount}</span>
                )}
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

        {/* Dashboard Content */}
        <main className="dashboard-content">
          <div className="container-fluid">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-welcome">Bem-vindo, {user?.name}!</p>

            {/* Stats Cards */}
            <div className="row g-4 mb-4">
              {stats.map((stat, index) => (
                <div className="col-12 col-sm-6 col-xl-3" key={index}>
                  <div className="stat-card dashboard-stat">
                    <div className="stat-card-header">
                      <div className={`stat-icon bg-${stat.color}`}>
                        <i className={`bi ${stat.icon}`}></i>
                      </div>
                    </div>
                    <div className="stat-card-body">
                      <h3 className="stat-value">{stat.value}</h3>
                      <p className="stat-label">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activities and Upcoming Events */}
            <div className="row g-4">
              <div className="col-lg-8">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Atividades Recentes</h5>
                  </div>
                  <div className="card-body">
                    <div className="activity-list">
                      {recentActivities.map(activity => (
                        <div className="activity-item" key={activity.id}>
                          <div className="activity-icon">
                            <i className={`bi ${activity.icon}`}></i>
                          </div>
                          <div className="activity-content">
                            <h6>{activity.action}</h6>
                            <p>{activity.description}</p>
                            <span className="activity-time">{activity.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Próximos Eventos</h5>
                  </div>
                  <div className="card-body">
                    <div className="event-list">
                      {mockEvents.map(event => (
                        <div className="event-item" key={event.id}>
                          <div className="event-date">
                            <span className="event-day">{new Date(event.date).getDate()}</span>
                            <span className="event-month">{new Date(event.date).toLocaleDateString('pt-BR', { month: 'short' })}</span>
                          </div>
                          <div className="event-details">
                            <h6>{event.title}</h6>
                            <p>{event.time} - {event.location}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="card mt-4">
                  <div className="card-header">
                    <h5 className="card-title">Calendário</h5>
                  </div>
                  <div className="card-body">
                    <div className="mini-calendar">
                      <div className="calendar-header">
                        <button className="btn btn-link"><i className="bi bi-chevron-left"></i></button>
                        <h6>Junho 2024</h6>
                        <button className="btn btn-link"><i className="bi bi-chevron-right"></i></button>
                      </div>
                      <div className="calendar-grid">
                        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                          <div key={day} className="calendar-day-header">{day}</div>
                        ))}
                        {Array.from({ length: 30 }, (_, i) => (
                          <div key={i} className={`calendar-day ${i === 14 ? 'has-event' : ''}`}>
                            {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;