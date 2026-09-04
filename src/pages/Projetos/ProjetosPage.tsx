import React, { useMemo, useState } from 'react';
import { mockProjects } from '../../data/mockData';
import { Project, ProjectCategory, ProjectStatus } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../layouts/DashboardLayout';
import './ProjetosPage.css';

const categories: (ProjectCategory | 'Todas')[] = ['Todas', 'Pesquisa', 'Extensão', 'Ensino', 'Conservação'];
const statuses: (ProjectStatus | 'Todos')[] = ['Todos', 'Em andamento', 'Planejamento', 'Concluído', 'Suspenso'];

const statusClass: Record<ProjectStatus, string> = {
  'Em andamento': 'project-status-progress',
  Planejamento: 'project-status-planning',
  Concluído: 'project-status-complete',
  Suspenso: 'project-status-suspended',
};

const ProjetosPage: React.FC = () => {
  const { user, hasPermission } = useAuth();
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [category, setCategory] = useState<ProjectCategory | 'Todas'>('Todas');
  const [status, setStatus] = useState<ProjectStatus | 'Todos'>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [area, setArea] = useState('');
  const [projectCategory, setProjectCategory] = useState<ProjectCategory>('Pesquisa');

  const filteredProjects = useMemo(() => projects.filter(project => {
    const normalizedSearch = searchTerm.toLowerCase();
    return (category === 'Todas' || project.category === category)
      && (status === 'Todos' || project.status === status)
      && (project.title.toLowerCase().includes(normalizedSearch)
        || project.description.toLowerCase().includes(normalizedSearch)
        || project.area.toLowerCase().includes(normalizedSearch));
  }), [category, projects, searchTerm, status]);

  const counts = {
    total: projects.length,
    active: projects.filter(project => project.status === 'Em andamento').length,
    planning: projects.filter(project => project.status === 'Planejamento').length,
    completed: projects.filter(project => project.status === 'Concluído').length,
  };

  const handleCreateProject = (event: React.FormEvent) => {
    event.preventDefault();
    const newProject: Project = {
      id: `project-${Date.now()}`,
      title,
      description,
      area,
      responsible: user?.name || 'Não informado',
      status: 'Planejamento',
      images: ['/images/eco-placeholder.svg'],
      category: projectCategory,
      createdAt: new Date().toISOString(),
    };
    setProjects(current => [newProject, ...current]);
    setTitle('');
    setDescription('');
    setArea('');
    setShowModal(false);
  };

  return (
    <DashboardLayout>
      <div className="projetos-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Gestão de Projetos</h1>
            <p className="page-subtitle">Acompanhe os projetos de ensino, pesquisa e extensão</p>
          </div>
          {hasPermission('canCreateProject') && <button className="btn btn-success" onClick={() => setShowModal(true)}><i className="bi bi-plus-lg"></i> Novo Projeto</button>}
        </div>

        <div className="row g-3 mb-4 project-stats">
          <div className="col-6 col-xl-3"><div className="stat-mini-card"><i className="bi bi-kanban text-primary"></i><div><h4>{counts.total}</h4><p>Total</p></div></div></div>
          <div className="col-6 col-xl-3"><div className="stat-mini-card"><i className="bi bi-play-circle text-success"></i><div><h4>{counts.active}</h4><p>Em andamento</p></div></div></div>
          <div className="col-6 col-xl-3"><div className="stat-mini-card"><i className="bi bi-calendar3 text-warning"></i><div><h4>{counts.planning}</h4><p>Em planejamento</p></div></div></div>
          <div className="col-6 col-xl-3"><div className="stat-mini-card"><i className="bi bi-check2-circle text-info"></i><div><h4>{counts.completed}</h4><p>Concluídos</p></div></div></div>
        </div>

        <div className="filters-bar project-filters">
          <div className="search-box"><i className="bi bi-search"></i><input value={searchTerm} onChange={event => setSearchTerm(event.target.value)} placeholder="Buscar por título, área ou descrição..." aria-label="Buscar projetos" /></div>
          <select className="form-select" value={category} onChange={event => setCategory(event.target.value as ProjectCategory | 'Todas')} aria-label="Filtrar por categoria">{categories.map(item => <option key={item} value={item}>{item}</option>)}</select>
          <select className="form-select" value={status} onChange={event => setStatus(event.target.value as ProjectStatus | 'Todos')} aria-label="Filtrar por status">{statuses.map(item => <option key={item} value={item}>{item}</option>)}</select>
        </div>

        {filteredProjects.length === 0 ? <div className="project-empty"><i className="bi bi-folder-x"></i><h3>Nenhum projeto encontrado</h3><p>Não há projetos com os filtros selecionados.</p></div> : <div className="project-grid">{filteredProjects.map(project => <article className="project-card" key={project.id}><div className="project-card-image"><img src={project.images[0] || '/images/eco-placeholder.svg'} alt="" /><span className={`badge ${statusClass[project.status]}`}>{project.status}</span></div><div className="project-card-body"><span className="project-category">{project.category} · {project.area}</span><h3>{project.title}</h3><p>{project.description}</p><div className="project-card-footer"><span><i className="bi bi-person"></i> {project.responsible}</span><button className="btn btn-sm btn-outline-primary" onClick={() => setSelectedProject(project)} aria-label={`Ver detalhes de ${project.title}`}><i className="bi bi-eye"></i></button></div></div></article>)}</div>}

        {showModal && <div className="modal show d-block" tabIndex={-1}><div className="modal-dialog"><form className="modal-content" onSubmit={handleCreateProject}><div className="modal-header"><h5 className="modal-title">Novo Projeto</h5><button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Fechar"></button></div><div className="modal-body"><label className="form-label" htmlFor="project-title">Título</label><input id="project-title" className="form-control mb-3" value={title} onChange={event => setTitle(event.target.value)} required /><label className="form-label" htmlFor="project-area">Área</label><input id="project-area" className="form-control mb-3" value={area} onChange={event => setArea(event.target.value)} required /><label className="form-label" htmlFor="project-category">Categoria</label><select id="project-category" className="form-select mb-3" value={projectCategory} onChange={event => setProjectCategory(event.target.value as ProjectCategory)}>{categories.slice(1).map(item => <option key={item} value={item}>{item}</option>)}</select><label className="form-label" htmlFor="project-description">Descrição</label><textarea id="project-description" className="form-control" rows={4} value={description} onChange={event => setDescription(event.target.value)} required /></div><div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Voltar</button><button type="submit" className="btn btn-success">Criar projeto</button></div></form></div></div>}

        {selectedProject && <div className="modal show d-block" tabIndex={-1}><div className="modal-dialog"><div className="modal-content"><div className="modal-header"><h5 className="modal-title">Detalhes do projeto</h5><button className="btn-close" onClick={() => setSelectedProject(null)} aria-label="Fechar"></button></div><div className="modal-body"><span className={`badge ${statusClass[selectedProject.status]}`}>{selectedProject.status}</span><h4 className="mt-3">{selectedProject.title}</h4><p>{selectedProject.description}</p><p><strong>Categoria:</strong> {selectedProject.category}</p><p><strong>Área:</strong> {selectedProject.area}</p><p><strong>Responsável:</strong> {selectedProject.responsible}</p></div></div></div></div>}
      </div>
    </DashboardLayout>
  );
};

export default ProjetosPage;