export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  institution?: string;
  phone?: string;
  createdAt: string;
}

export type UserRole = 
  | 'Administrador'
  | 'Coordenação'
  | 'Professor Orientador'
  | 'Aluno'
  | 'Bolsista'
  | 'Estagiário'
  | 'Voluntário'
  | 'Visitante';

export interface Permissions {
  canCreateProject: boolean;
  canApproveResearch: boolean;
  canManageVisits: boolean;
  canManageUsers: boolean;
  canManageProcess: boolean;
  canViewDashboard: boolean;
  canSubmitResearch: boolean;
  canApplyProcess: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  area: string;
  responsible: string;
  status: ProjectStatus;
  images: string[];
  category: ProjectCategory;
  createdAt: string;
}

export type ProjectStatus = 'Em andamento' | 'Concluído' | 'Suspenso' | 'Planejamento';
export type ProjectCategory = 'Pesquisa' | 'Extensão' | 'Ensino' | 'Conservação';

export interface Research {
  id: string;
  projectId: string;
  studentId: string;
  advisorId: string;
  title: string;
  description: string;
  status: ResearchStatus;
  timeline: ResearchTimeline[];
  feedback: Feedback[];
  createdAt: string;
}

export type ResearchStatus = 'Em andamento' | 'Em revisão' | 'Rejeitada' | 'Aprovada' | 'Finalizada';

export interface ResearchTimeline {
  id: string;
  event: string;
  date: string;
  description: string;
}

export interface Feedback {
  id: string;
  from: string;
  message: string;
  date: string;
  type: 'approval' | 'rejection' | 'correction' | 'comment';
}

export interface Visit {
  id: string;
  school: string;
  date: string;
  time: string;
  numberOfVisitors: number;
  trailId?: string;
  status: VisitStatus;
  responsible: string;
  notes?: string;
  materials?: string[];
  createdAt: string;
}

export type VisitStatus = 
  | 'Solicitação'
  | 'Em análise'
  | 'Confirmada'
  | 'Preparação'
  | 'Em andamento'
  | 'Finalizada'
  | 'Cancelada';

export interface ProcessSelection {
  id: string;
  title: string;
  description: string;
  projectId: string;
  status: ProcessStatus;
  startDate: string;
  endDate: string;
  requirements: string[];
  candidates: Candidate[];
}

export type ProcessStatus = 'Aberto' | 'Em análise' | 'Fechado' | 'Resultado Publicado';

export interface Candidate {
  id: string;
  userId: string;
  processId: string;
  status: CandidateStatus;
  documents: Document[];
  submittedAt: string;
}

export type CandidateStatus = 
  | 'Inscrito'
  | 'Em análise'
  | 'Selecionado'
  | 'Não selecionado'
  | 'Documentação pendente'
  | 'Aprovado'
  | 'Rejeitado';

export interface Document {
  id: string;
  name: string;
  type: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  url?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface Message {
  id: string;
  fromId: string;
  toId: string;
  subject: string;
  content: string;
  read: boolean;
  createdAt: string;
}

export interface Material {
  id: string;
  title: string;
  description: string;
  type: 'Documento' | 'Vídeo' | 'Áudio' | 'Imagem' | 'Outro';
  url: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
}