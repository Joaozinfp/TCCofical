import React, { useMemo, useState } from 'react';
import { mockProcesses, mockProjects } from '../../data/mockData';
import { Candidate, ProcessSelection, ProcessStatus } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../layouts/DashboardLayout';
import './ProcessosPage.css';

const statuses: (ProcessStatus | 'Todos')[] = ['Todos', 'Aberto', 'Em análise', 'Fechado', 'Resultado Publicado'];

const ProcessosPage: React.FC = () => {
  const { user, hasPermission } = useAuth();
  const [processes, setProcesses] = useState<ProcessSelection[]>(mockProcesses);
  const [filterStatus, setFilterStatus] = useState<ProcessStatus | 'Todos'>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProcess, setSelectedProcess] = useState<ProcessSelection | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredProcesses = useMemo(() => processes.filter(process => {
    const term = searchTerm.toLowerCase();
    return (filterStatus === 'Todos' || process.status === filterStatus)
      && (process.title.toLowerCase().includes(term) || process.description.toLowerCase().includes(term));
  }), [filterStatus, processes, searchTerm]);

  const counts = {
    total: processes.length,
    open: processes.filter(process => process.status === 'Aberto').length,
    analysis: processes.filter(process => process.status === 'Em análise').length,
    closed: processes.filter(process => process.status === 'Fechado' || process.status === 'Resultado Publicado').length,
  };

  const handleCreate = (event: React.FormEvent) => {
    event.preventDefault();
    const newProcess: ProcessSelection = {
      id: `process-${Date.now()}`, title, description, projectId: mockProjects[0]?.id || '', status: 'Aberto',
      startDate, endDate, requirements: [], candidates: [],
    };
    setProcesses(current => [newProcess, ...current]);
    setTitle(''); setDescription(''); setStartDate(''); setEndDate(''); setShowModal(false);
  };

  const applyToProcess = (process: ProcessSelection) => {
    if (!user || process.candidates.some(candidate => candidate.userId === user.id)) return;
    const candidate: Candidate = { id: `candidate-${Date.now()}`, userId: user.id, processId: process.id, status: 'Inscrito', documents: [], submittedAt: new Date().toISOString() };
    const updated = { ...process, candidates: [...process.candidates, candidate] };
    setProcesses(current => current.map(item => item.id === process.id ? updated : item));
    setSelectedProcess(updated);
  };

  return (
    <DashboardLayout>
      <div className="processos-page">
        <div className="page-header"><div><h1 className="page-title">Processos Seletivos</h1><p className="page-subtitle">Encontre oportunidades e acompanhe inscrições</p></div>{hasPermission('canManageProcess') && <button className="btn btn-success" onClick={() => setShowModal(true)}><i className="bi bi-plus-lg"></i> Novo Processo</button>}</div>
        <div className="row g-3 mb-4 process-stats"><div className="col-6 col-xl-3"><div className="stat-mini-card"><i className="bi bi-clipboard-data text-primary"></i><div><h4>{counts.total}</h4><p>Total</p></div></div></div><div className="col-6 col-xl-3"><div className="stat-mini-card"><i className="bi bi-unlock text-success"></i><div><h4>{counts.open}</h4><p>Abertos</p></div></div></div><div className="col-6 col-xl-3"><div className="stat-mini-card"><i className="bi bi-hourglass-split text-warning"></i><div><h4>{counts.analysis}</h4><p>Em análise</p></div></div></div><div className="col-6 col-xl-3"><div className="stat-mini-card"><i className="bi bi-lock text-info"></i><div><h4>{counts.closed}</h4><p>Encerrados</p></div></div></div></div>
        <div className="filters-bar"><div className="search-box"><i className="bi bi-search"></i><input value={searchTerm} onChange={event => setSearchTerm(event.target.value)} placeholder="Buscar processos..." aria-label="Buscar processos seletivos" /></div><select className="form-select" value={filterStatus} onChange={event => setFilterStatus(event.target.value as ProcessStatus | 'Todos')} aria-label="Filtrar processos por status">{statuses.map(status => <option key={status} value={status}>{status}</option>)}</select></div>
        {filteredProcesses.length === 0 ? <div className="process-empty"><i className="bi bi-clipboard-x"></i><h3>Nenhum processo encontrado</h3><p>Não há processos com os filtros selecionados.</p></div> : <div className="process-grid">{filteredProcesses.map(process => <article className="process-card" key={process.id}><div className="process-card-header"><span className={`badge process-status-${process.status.toLowerCase().replace(' ', '-')}`}>{process.status}</span><span className="process-candidates"><i className="bi bi-people"></i> {process.candidates.length} inscritos</span></div><h3>{process.title}</h3><p>{process.description}</p><div className="process-dates"><span><i className="bi bi-calendar-event"></i> {new Date(process.startDate).toLocaleDateString('pt-BR')}</span><span><i className="bi bi-calendar-check"></i> {new Date(process.endDate).toLocaleDateString('pt-BR')}</span></div><div className="process-card-footer"><button className="btn btn-sm btn-outline-primary" onClick={() => setSelectedProcess(process)}>Ver detalhes</button>{process.status === 'Aberto' && <button className="btn btn-sm btn-success" onClick={() => applyToProcess(process)} disabled={!user || process.candidates.some(candidate => candidate.userId === user.id)}>Inscrever-se</button>}</div></article>)}</div>}
        {showModal && <div className="modal show d-block" tabIndex={-1}><div className="modal-dialog"><form className="modal-content" onSubmit={handleCreate}><div className="modal-header"><h5 className="modal-title">Novo Processo Seletivo</h5><button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Fechar"></button></div><div className="modal-body"><label className="form-label" htmlFor="process-title">Título</label><input id="process-title" className="form-control mb-3" value={title} onChange={event => setTitle(event.target.value)} required /><label className="form-label" htmlFor="process-description">Descrição</label><textarea id="process-description" className="form-control mb-3" rows={3} value={description} onChange={event => setDescription(event.target.value)} required /><div className="row"><div className="col"><label className="form-label" htmlFor="process-start">Início</label><input id="process-start" type="date" className="form-control" value={startDate} onChange={event => setStartDate(event.target.value)} required /></div><div className="col"><label className="form-label" htmlFor="process-end">Fim</label><input id="process-end" type="date" className="form-control" value={endDate} onChange={event => setEndDate(event.target.value)} required /></div></div></div><div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Voltar</button><button type="submit" className="btn btn-success">Criar processo</button></div></form></div></div>}
        {selectedProcess && <div className="modal show d-block" tabIndex={-1}><div className="modal-dialog"><div className="modal-content"><div className="modal-header"><h5 className="modal-title">Detalhes do processo</h5><button className="btn-close" onClick={() => setSelectedProcess(null)} aria-label="Fechar"></button></div><div className="modal-body"><span className="badge process-status-open">{selectedProcess.status}</span><h4 className="mt-3">{selectedProcess.title}</h4><p>{selectedProcess.description}</p><p><strong>Período:</strong> {new Date(selectedProcess.startDate).toLocaleDateString('pt-BR')} a {new Date(selectedProcess.endDate).toLocaleDateString('pt-BR')}</p><p><strong>Inscritos:</strong> {selectedProcess.candidates.length}</p><button className="btn btn-outline-secondary" onClick={() => setSelectedProcess(null)}>Fechar</button></div></div></div></div>}
      </div>
    </DashboardLayout>
  );
};

export default ProcessosPage;