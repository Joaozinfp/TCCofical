import React from 'react';
import { Visit, VisitStatus } from '../../types';
import { trailData } from '../../data/mockData';
import './VisitacaoComponents.css';

interface VisitacaoDetailsProps {
  visit: Visit;
  onClose: () => void;
  onUpdateStatus: (id: string, status: VisitStatus) => Promise<void>;
  canManage: boolean;
}

const VisitacaoDetails: React.FC<VisitacaoDetailsProps> = ({
  visit,
  onClose,
  onUpdateStatus,
  canManage,
}) => {
  const trail = trailData.find(t => t.id === visit.trailId);

  const getStatusFlow = (currentStatus: VisitStatus): VisitStatus[] => {
    const flow: VisitStatus[] = [
      'Solicitação',
      'Em análise',
      'Confirmada',
      'Preparação',
      'Em andamento',
      'Finalizada',
    ];
    
    const currentIndex = flow.indexOf(currentStatus);
    return flow.slice(currentIndex);
  };

  const handleStatusChange = async (newStatus: VisitStatus) => {
    await onUpdateStatus(visit.id, newStatus);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="modal show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Detalhes da Visita</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Fechar"
            ></button>
          </div>
          
          <div className="modal-body">
            <div className="visit-details-header">
              <div className="visit-school">
                <i className="bi bi-building"></i>
                <h3>{visit.school}</h3>
              </div>
              <span className={`badge badge-${visit.status.toLowerCase().replace(' ', '-')}`}>
                {visit.status}
              </span>
            </div>

            <div className="row g-4 mt-2">
              <div className="col-md-6">
                <div className="detail-card">
                  <h6><i className="bi bi-calendar"></i> Data</h6>
                  <p>{formatDate(visit.date)}</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="detail-card">
                  <h6><i className="bi bi-clock"></i> Horário</h6>
                  <p>{visit.time}</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="detail-card">
                  <h6><i className="bi bi-people"></i> Visitantes</h6>
                  <p>{visit.numberOfVisitors} pessoas</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="detail-card">
                  <h6><i className="bi bi-person"></i> Responsável</h6>
                  <p>{visit.responsible}</p>
                </div>
              </div>
              
              {trail && (
                <div className="col-12">
                  <div className="detail-card">
                    <h6><i className="bi bi-signpost"></i> Trilha Selecionada</h6>
                    <p>{trail.name}</p>
                    <small className="text-muted">
                      Nível: {trail.level} | Duração: {trail.duration}
                    </small>
                  </div>
                </div>
              )}

              {visit.notes && (
                <div className="col-12">
                  <div className="detail-card">
                    <h6><i className="bi bi-journal-text"></i> Observações</h6>
                    <p>{visit.notes}</p>
                  </div>
                </div>
              )}
            </div>

            {canManage && visit.status !== 'Finalizada' && visit.status !== 'Cancelada' && (
              <div className="status-management mt-4">
                <h5>Gerenciar Status</h5>
                <div className="status-timeline">
                  {getStatusFlow(visit.status).map((status, index) => (
                    <div key={status} className="status-step">
                      <div className="status-dot"></div>
                      <button
                        className={`status-btn ${status === visit.status ? 'current' : ''}`}
                        onClick={() => handleStatusChange(status)}
                        disabled={index === 0}
                      >
                        {status}
                      </button>
                      {index < getStatusFlow(visit.status).length - 1 && (
                        <div className="status-line"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitacaoDetails;