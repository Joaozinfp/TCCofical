import React, { useMemo, useState } from 'react';
import { Material } from '../../types';
import DashboardLayout from '../../layouts/DashboardLayout';
import './MateriaisPage.css';

const initialMaterials: Material[] = [
  { id: '1', title: 'Guia de Educação Ambiental', description: 'Material introdutório para atividades de educação ambiental.', type: 'Documento', url: '#', uploadedBy: 'Coordenação EEcoE', uploadedAt: '2024-06-01' },
  { id: '2', title: 'Identificação de Plantas Nativas', description: 'Vídeo de apoio para reconhecer espécies da Mata Atlântica.', type: 'Vídeo', url: '#', uploadedBy: 'Maria Fernanda Costa', uploadedAt: '2024-05-20' },
  { id: '3', title: 'Mapa das Trilhas do EEcoE', description: 'Mapa atualizado das trilhas interpretativas e pontos de interesse.', type: 'Imagem', url: '#', uploadedBy: 'Coordenação EEcoE', uploadedAt: '2024-05-10' },
  { id: '4', title: 'Roteiro de Visitação', description: 'Orientações para preparar e conduzir visitas escolares.', type: 'Documento', url: '#', uploadedBy: 'Carlos Eduardo Lima', uploadedAt: '2024-04-18' },
];

const icons: Record<Material['type'], string> = { Documento: 'bi-file-earmark-text', Vídeo: 'bi-play-btn', Áudio: 'bi-volume-up', Imagem: 'bi-image', Outro: 'bi-paperclip' };

const MateriaisPage: React.FC = () => {
  const [materials] = useState(initialMaterials);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<Material['type'] | 'Todos'>('Todos');
  const filteredMaterials = useMemo(() => materials.filter(material => (filterType === 'Todos' || material.type === filterType) && `${material.title} ${material.description}`.toLowerCase().includes(searchTerm.toLowerCase())), [filterType, materials, searchTerm]);

  return <DashboardLayout><div className="materiais-page"><div className="page-header"><div><h1 className="page-title">Materiais</h1><p className="page-subtitle">Consulte os materiais educativos do EEcoE</p></div><button className="btn btn-success"><i className="bi bi-upload"></i> Enviar material</button></div><div className="filters-bar"><div className="search-box"><i className="bi bi-search"></i><input value={searchTerm} onChange={event => setSearchTerm(event.target.value)} placeholder="Buscar materiais..." aria-label="Buscar materiais" /></div><select className="form-select" value={filterType} onChange={event => setFilterType(event.target.value as Material['type'] | 'Todos')} aria-label="Filtrar materiais por tipo"><option value="Todos">Todos os tipos</option>{(['Documento', 'Vídeo', 'Áudio', 'Imagem', 'Outro'] as Material['type'][]).map(type => <option key={type} value={type}>{type}</option>)}</select></div><div className="material-grid">{filteredMaterials.map(material => <article className="material-card" key={material.id}><div className="material-icon"><i className={`bi ${icons[material.type]}`}></i></div><div className="material-content"><span>{material.type}</span><h2>{material.title}</h2><p>{material.description}</p><small>{material.uploadedBy} · {new Date(material.uploadedAt).toLocaleDateString('pt-BR')}</small></div><a className="btn btn-outline-primary" href={material.url} download aria-label={`Baixar ${material.title}`}><i className="bi bi-download"></i></a></article>)}</div>{filteredMaterials.length === 0 && <div className="material-empty">Nenhum material encontrado.</div>}</div></DashboardLayout>;
};

export default MateriaisPage;