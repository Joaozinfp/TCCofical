import React, { useState, useEffect } from 'react';
import { Visit, VisitStatus } from '../../types';
import { useVisitacao } from '../../hooks/useVisitacao';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import VisitacaoModal from '../../components/Visitacao/VisitacaoModal';
import VisitacaoDetails from '../../components/Visitacao/VisitacaoDetails';
import DashboardLayout from '../../layouts/DashboardLayout';
import './VisitacaoPage.css';

const VisitacaoPage: React.FC = () => {
  const {
    visits,
    loading,
    error,
    stats,
    createVisit,
    updateStatus,
    cancelVisit,
    loadVisits,
  } = useVisitacao();

  const { user, hasPermission } = useAuth();
  const { addNotification } = useNotifications();

  const [showModal, setShowModal] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [filterStatus, setFilterStatus] = useState<VisitStatus | 'Todos'>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  const statusOptions: (VisitStatus | 'Todos')[] = [
    'Todos',
    'Solicitação',
    'Em análise',
    'Confirmada',
    'Preparação',
    'Em andamento',
    'Finalizada',
    'Cancelada',
  ];

  const filteredVisits = visits.filter(visit => {
    const matchesStatus = filterStatus === 'Todos' || visit.status === filterStatus;
    const matchesSearch = 
      visit.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visit.responsible.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (visit.notes && visit.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesStatus && matchesSearch;
  });

  const handleCreateVisit = async (data: Omit<Visit, 'id' | 'createdAt' | 'status'>) => {
    try {
      const newVisit = await createVisit(data);
      setShowModal(false);
      addNotification({
        userId: user?.id || '',
        title: 'Visita solicitada',
        message: `Visita para ${newVisit.school} foi solicitada com sucesso.`,
        type: 'success',
        read: false,
      });
    } catch (error) {
      addNotification({
        userId: user?.id || '',
        title: 'Erro',
        message: 'Não foi possível criar a solicitação de visita.',
        type: 'error',
        read: false,
      });
    }
  };

  const handleUpdateStatus = async (id: string, status: VisitStatus) => {
    try {
      await updateStatus(id, status);
      addNotification({
        userId: user?.id || '',
        title: 'Status atualizado',
        message: `Visita atualizada para ${status}.`,
        type: 'success',
        read: false,
      });
    } catch (error) {
      addNotification({
        userId: user?.id || '',
        title: 'Erro',
        message: 'Não foi possível atualizar o status da visita.',
        type: 'error',
        read: false,
      });
    }
  };

  const handleCancelVisit = async () => {
    if (selectedVisit) {
      try {
        await cancelVisit(selectedVisit.id, cancelReason);
        setShowCancelModal(false);
        setCancelReason('');
        setSelectedVisit(null);
        addNotification({
          userId: user?.id || '',
          title: 'Visita cancelada',
          message: 'A visita foi cancelada com sucesso.',
          type: 'warning',
          read: false,
        });
      } catch (error) {
        addNotification({
          userId: user?.id || '',
          title: 'Erro',
          message: 'Não foi possível cancelar a visita.',
          type: 'error',
          read: false,
        });
      }
    }
  };

  const getStatusBadge = (status: VisitStatus) => {
    const statusMap: Record<VisitStatus, string> = {
      'Solicitação': 'badge-info',
      'Em análise': 'badge-warning',
      'Confirmada': 'badge-success',
      'Preparação': 'badge-warning',
      'Em andamento': 'badge-info',
      'Finalizada': 'badge-success',
      'Cancelada': 'badge-danger',
    };
    return statusMap[status] || 'badge-secondary';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="loading-container visitacao-loading">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p>Carregando visitas...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="visitacao-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestão de Visitação</h1>
          <p className="page-subtitle">Gerencie as visitas ao EEcoE</p>
        </div>
        {hasPermission('canManageVisits') && (
          <button 
            className="btn btn-success"
            onClick={() => setShowModal(true)}
            aria-label="Nova solicitação de visita"
          >
            <i className="bi bi-plus-lg"></i> Nova Visita
          </button>
        )}
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="stat-mini-card">
              <i className="bi bi-calendar text-primary"></i>
              <div>
                <h4>{stats.total}</h4>
                <p>Total</p>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="stat-mini-card">
              <i className="bi bi-clock text-warning"></i>
              <div>
                <h4>{stats.pending}</h4>
                <p>Pendentes</p>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="stat-mini-card">
              <i className="bi bi-check-circle text-success"></i>
              <div>
                <h4>{stats.confirmed}</h4>
                <p>Confirmadas</p>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="stat-mini-card">
              <i className="bi bi-x-circle text-danger"></i>
              <div>
                <h4>{stats.cancelled}</h4>
                <p>Canceladas</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Buscar por escola, responsável..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Buscar visitas"
          />
        </div>
        <select
          className="form-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as VisitStatus | 'Todos')}
          aria-label="Filtrar por status"
        >
          {statusOptions.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle"></i> {error}
        </div>
      )}

      {/* Visits List */}
      {filteredVisits.length === 0 ? (
        <div className="empty-state">
          <i className="bi bi-calendar-x"></i>
          <h3>Nenhuma visita encontrada</h3>
          <p>Não há visitas com os filtros selecionados.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Escola/Instituição</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Visitantes</th>
                <th>Responsável</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisits.map(visit => (
                <tr key={visit.id}>
                  <td>
                    <strong>{visit.school}</strong>
                  </td>
                  <td>{formatDate(visit.date)}</td>
                  <td>{visit.time}</td>
                  <td>{visit.numberOfVisitors}</td>
                  <td>{visit.responsible}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(visit.status)}`}>
                      {visit.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setSelectedVisit(visit)}
                        aria-label={`Ver detalhes da visita para ${visit.school}`}
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      {hasPermission('canManageVisits') && (
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => {
                            setSelectedVisit(visit);
                            setShowCancelModal(true);
                          }}
                          aria-label={`Cancelar visita para ${visit.school}`}
                        >
                          <i className="bi bi-x-circle"></i>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Visit Modal */}
      {showModal && (
        <VisitacaoModal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateVisit}
        />
      )}

      {/* Visit Details Modal */}
      {selectedVisit && !showCancelModal && (
        <VisitacaoDetails
          visit={selectedVisit}
          onClose={() => setSelectedVisit(null)}
          onUpdateStatus={handleUpdateStatus}
          canManage={hasPermission('canManageVisits')}
        />
      )}

      {/* Cancel Modal */}
      {showCancelModal && selectedVisit && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Cancelar Visita</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowCancelModal(false);
                    setCancelReason('');
                  }}
                  aria-label="Fechar"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Tem certeza que deseja cancelar a visita para{' '}
                  <strong>{selectedVisit.school}</strong>?
                </p>
                <div className="mb-3">
                  <label htmlFor="cancelReason" className="form-label">
                    Motivo do cancelamento (opcional)
                  </label>
                  <textarea
                    className="form-control"
                    id="cancelReason"
                    rows={3}
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowCancelModal(false);
                    setCancelReason('');
                  }}
                >
                  Voltar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleCancelVisit}
                >
                  Confirmar Cancelamento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </DashboardLayout>
  );
};

export default VisitacaoPage;