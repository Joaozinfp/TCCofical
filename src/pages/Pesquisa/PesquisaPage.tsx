import React, { useMemo, useState } from 'react';
import { mockProjects, mockResearches } from '../../data/mockData';
import { Research, ResearchStatus } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../layouts/DashboardLayout';
import './PesquisaPage.css';

const statusOptions: (ResearchStatus | 'Todos')[] = [
  'Todos',
  'Em andamento',
  'Em revisão',
  'Aprovada',
  'Finalizada',
  'Rejeitada',
];

const statusClass: Record<ResearchStatus, string> = {
  'Em andamento': 'research-status-info',
  'Em revisão': 'research-status-warning',
  Aprovada: 'research-status-success',
  Finalizada: 'research-status-success',
  Rejeitada: 'research-status-danger',
};

const PesquisaPage: React.FC = () => {
  const { user, hasPermission } = useAuth();
  const [researches, setResearches] = useState<Research[]>(mockResearches);
  const [filterStatus, setFilterStatus] = useState<ResearchStatus | 'Todos'>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResearch, setSelectedResearch] = useState<Research | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState(mockProjects[0]?.id || '');

  const filteredResearches = useMemo(() => researches.filter(research => {
    const matchesStatus = filterStatus === 'Todos' || research.status === filterStatus;
    const normalizedSearch = searchTerm.toLowerCase();
    const matchesSearch = research.title.toLowerCase().includes(normalizedSearch)
      || research.description.toLowerCase().includes(normalizedSearch);
    return matchesStatus && matchesSearch;
  }), [filterStatus, researches, searchTerm]);

  const counts = {
    total: researches.length,
    ongoing: researches.filter(research => research.status === 'Em andamento').length,
    review: researches.filter(research => research.status === 'Em revisão').length,
    approved: researches.filter(research => research.status === 'Aprovada' || research.status === 'Finalizada').length,
  };

  const handleCreateResearch = (event: React.FormEvent) => {
    event.preventDefault();
    const newResearch: Research = {
      id: `research-${Date.now()}`,
      projectId,
      studentId: user?.id || '',
      advisorId: '',
      title,
      description,
      status: 'Em revisão',
      timeline: [{
        id: `timeline-${Date.now()}`,
        event: 'Pesquisa enviada',
        date: new Date().toISOString(),
        description: 'Pesquisa enviada para análise.',
      }],
      feedback: [],
      createdAt: new Date().toISOString(),
    };
    setResearches(current => [newResearch, ...current]);
    setTitle('');
    setDescription('');
    setShowModal(false);
  };

  const updateStatus = (research: Research, status: ResearchStatus) => {
    setResearches(current => current.map(item => item.id === research.id ? { ...item, status } : item));
    setSelectedResearch({ ...research, status });
  };

  return (
    <DashboardLayout>
      <div className="pesquisa-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Gestão de Pesquisas</h1>
            <p className="page-subtitle">Acompanhe e gerencie as pesquisas do EEcoE</p>
          </div>
          {hasPermission('canSubmitResearch') && (
            <button className="btn btn-success" onClick={() => setShowModal(true)}>
              <i className="bi bi-plus-lg"></i> Nova Pesquisa
            </button>
          )}
        </div>

        <div className="row g-3 mb-4 research-stats">
          <div className="col-6 col-xl-3"><div className="stat-mini-card"><i className="bi bi-journal-text text-primary"></i><div><h4>{counts.total}</h4><p>Total</p></div></div></div>
          <div className="col-6 col-xl-3"><div className="stat-mini-card"><i className="bi bi-hourglass-split text-warning"></i><div><h4>{counts.ongoing}</h4><p>Em andamento</p></div></div></div>
          <div className="col-6 col-xl-3"><div className="stat-mini-card"><i className="bi bi-clock-history text-info"></i><div><h4>{counts.review}</h4><p>Em revisão</p></div></div></div>
          <div className="col-6 col-xl-3"><div className="stat-mini-card"><i className="bi bi-check-circle text-success"></i><div><h4>{counts.approved}</h4><p>Aprovadas</p></div></div></div>
        </div>

        <div className="filters-bar">
          <div className="search-box"><i className="bi bi-search"></i><input value={searchTerm} onChange={event => setSearchTerm(event.target.value)} placeholder="Buscar por título ou descrição..." aria-label="Buscar pesquisas" /></div>
          <select className="form-select" value={filterStatus} onChange={event => setFilterStatus(event.target.value as ResearchStatus | 'Todos')} aria-label="Filtrar pesquisas por status">
            {statusOptions.map(status => <option key={status} value={status}>{status}</option>)}
          </select>
        </div>

        {filteredResearches.length === 0 ? (
          <div className="research-empty"><i className="bi bi-journal-x"></i><h3>Nenhuma pesquisa encontrada</h3><p>Não há pesquisas com os filtros selecionados.</p></div>
        ) : (
          <div className="research-table-container"><table className="table table-hover"><thead><tr><th>Pesquisa</th><th>Projeto</th><th>Data de criação</th><th>Status</th><th>Ações</th></tr></thead><tbody>
            {filteredResearches.map(research => <tr key={research.id}><td><strong>{research.title}</strong><small>{research.description}</small></td><td>{mockProjects.find(project => project.id === research.projectId)?.title || 'Não informado'}</td><td>{new Date(research.createdAt).toLocaleDateString('pt-BR')}</td><td><span className={`badge ${statusClass[research.status]}`}>{research.status}</span></td><td><button className="btn btn-sm btn-outline-primary" onClick={() => setSelectedResearch(research)} aria-label={`Ver detalhes de ${research.title}`}><i className="bi bi-eye"></i></button></td></tr>)}
          </tbody></table></div>
        )}

        {showModal && <div className="modal show d-block" tabIndex={-1}><div className="modal-dialog"><form className="modal-content" onSubmit={handleCreateResearch}><div className="modal-header"><h5 className="modal-title">Nova Pesquisa</h5><button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Fechar"></button></div><div className="modal-body"><label className="form-label" htmlFor="research-title">Título</label><input id="research-title" className="form-control mb-3" value={title} onChange={event => setTitle(event.target.value)} required /><label className="form-label" htmlFor="research-project">Projeto relacionado</label><select id="research-project" className="form-select mb-3" value={projectId} onChange={event => setProjectId(event.target.value)}>{mockProjects.map(project => <option key={project.id} value={project.id}>{project.title}</option>)}</select><label className="form-label" htmlFor="research-description">Descrição</label><textarea id="research-description" className="form-control" rows={4} value={description} onChange={event => setDescription(event.target.value)} required /></div><div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Voltar</button><button type="submit" className="btn btn-success">Enviar pesquisa</button></div></form></div></div>}

        {selectedResearch && <div className="modal show d-block" tabIndex={-1}><div className="modal-dialog"><div className="modal-content"><div className="modal-header"><h5 className="modal-title">Detalhes da pesquisa</h5><button className="btn-close" onClick={() => setSelectedResearch(null)} aria-label="Fechar"></button></div><div className="modal-body"><h4>{selectedResearch.title}</h4><p>{selectedResearch.description}</p><p><strong>Status:</strong> {selectedResearch.status}</p>{hasPermission('canApproveResearch') && selectedResearch.status === 'Em revisão' && <div className="research-review-actions"><button className="btn btn-success" onClick={() => updateStatus(selectedResearch, 'Aprovada')}>Aprovar</button><button className="btn btn-outline-danger" onClick={() => updateStatus(selectedResearch, 'Rejeitada')}>Rejeitar</button></div>}</div></div></div></div>}
      </div>
    </DashboardLayout>
  );
};

export default PesquisaPage;