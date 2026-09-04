import { User, Project, Research, Visit, ProcessSelection, Notification, Message, Material, Event } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ana Beatriz Santos',
    email: 'ana.santos@ifrj.edu.br',
    password: 'admin123',
    role: 'Administrador',
    department: 'Coordenação EEcoE',
    phone: '(24) 99999-9999',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Carlos Eduardo Lima',
    email: 'carlos.lima@ifrj.edu.br',
    password: 'coord123',
    role: 'Coordenação',
    department: 'Coordenação de Extensão',
    phone: '(24) 98888-8888',
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '3',
    name: 'Maria Fernanda Costa',
    email: 'maria.costa@ifrj.edu.br',
    password: 'prof123',
    role: 'Professor Orientador',
    department: 'Biologia',
    phone: '(24) 97777-7777',
    createdAt: '2024-02-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Pedro Henrique Alves',
    email: 'pedro.alves@aluno.ifrj.edu.br',
    password: 'aluno123',
    role: 'Aluno',
    department: 'Ciências Biológicas',
    phone: '(24) 96666-6666',
    createdAt: '2024-03-01T00:00:00Z'
  },
  {
    id: '5',
    name: 'Julia Oliveira',
    email: 'julia.oliveira@aluno.ifrj.edu.br',
    password: 'bolsista123',
    role: 'Bolsista',
    department: 'Gestão Ambiental',
    phone: '(24) 95555-5555',
    createdAt: '2024-03-15T00:00:00Z'
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Monitoramento de Biodiversidade',
    description: 'Projeto de monitoramento da fauna e flora do EEcoE para avaliação da saúde do ecossistema.',
    area: 'Ecologia',
    responsible: 'Maria Fernanda Costa',
    status: 'Em andamento',
    category: 'Pesquisa',
    images: ['/images/eco-placeholder.svg'],
    createdAt: '2024-03-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Educação Ambiental nas Escolas',
    description: 'Programa de educação ambiental para escolas públicas da região de Pinheiral.',
    area: 'Educação',
    responsible: 'Carlos Eduardo Lima',
    status: 'Em andamento',
    category: 'Extensão',
    images: ['/images/eco-placeholder.svg'],
    createdAt: '2024-02-15T00:00:00Z'
  },
  {
    id: '3',
    title: 'Recuperação de Áreas Degradadas',
    description: 'Projeto de recuperação de áreas degradadas dentro do campus com espécies nativas.',
    area: 'Restauração',
    responsible: 'Maria Fernanda Costa',
    status: 'Planejamento',
    category: 'Conservação',
    images: ['/images/eco-placeholder.svg'],
    createdAt: '2024-04-01T00:00:00Z'
  }
];

export const mockResearches: Research[] = [
  {
    id: '1',
    projectId: '1',
    studentId: '4',
    advisorId: '3',
    title: 'Levantamento de Aves no EEcoE',
    description: 'Pesquisa sobre a diversidade de aves presentes no Espaço Ecológico Educativo.',
    status: 'Em andamento',
    timeline: [
      { id: '1', event: 'Pesquisa iniciada', date: '2024-03-15T00:00:00Z', description: 'Início do levantamento de campo' }
    ],
    feedback: [],
    createdAt: '2024-03-15T00:00:00Z'
  }
];

export const mockVisits: Visit[] = [
  {
    id: '1',
    school: 'Escola Municipal João XXIII',
    date: '2024-06-15',
    time: '09:00',
    numberOfVisitors: 35,
    trailId: 'trilha1',
    status: 'Confirmada',
    responsible: 'Carlos Eduardo Lima',
    createdAt: '2024-05-20T00:00:00Z'
  },
  {
    id: '2',
    school: 'Colégio Estadual Pinheiral',
    date: '2024-06-20',
    time: '14:00',
    numberOfVisitors: 40,
    status: 'Solicitação',
    responsible: 'Carlos Eduardo Lima',
    createdAt: '2024-06-01T00:00:00Z'
  }
];

export const mockProcesses: ProcessSelection[] = [
  {
    id: '1',
    title: 'Bolsista de Iniciação Científica',
    description: 'Seleção para bolsista de iniciação científica no projeto de Monitoramento de Biodiversidade.',
    projectId: '1',
    status: 'Aberto',
    startDate: '2024-06-10',
    endDate: '2024-07-10',
    requirements: ['Estar matriculado no IFRJ', 'Coeficiente de rendimento ≥ 7.0', 'Disponibilidade de 20h semanais'],
    candidates: []
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'Nova visita solicitada',
    message: 'Colégio Estadual Pinheiral solicitou uma visita para 20/06/2024.',
    type: 'info',
    read: false,
    createdAt: '2024-06-01T00:00:00Z'
  },
  {
    id: '2',
    userId: '1',
    title: 'Pesquisa atualizada',
    message: 'A pesquisa "Levantamento de Aves no EEcoE" foi atualizada pelo aluno Pedro Henrique.',
    type: 'success',
    read: false,
    createdAt: '2024-06-02T00:00:00Z'
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Semana do Meio Ambiente',
    description: 'Evento especial em comemoração ao Dia Mundial do Meio Ambiente com trilhas guiadas e oficinas.',
    date: '2024-06-05',
    time: '08:00',
    location: 'EEcoE - Centro de Visitantes',
    organizer: 'Coordenação EEcoE'
  },
  {
    id: '2',
    title: 'Oficina de Identificação de Plantas',
    description: 'Oficina prática de identificação de espécies vegetais com uso de chaves dicotômicas.',
    date: '2024-06-12',
    time: '14:00',
    location: 'EEcoE - Pancoteca',
    organizer: 'Maria Fernanda Costa'
  }
];

export const trailData = [
  {
    id: 'trilha1',
    name: 'Trilha do Ipê-Amarelo',
    description: 'Trilha interpretativa que destaca a flora nativa, com foco especial nos ipês amarelos.',
    level: 'Fácil',
    duration: '1h30min',
    characteristics: ['Acessível', 'Interpretativa', 'Sombreada'],
    image: '/images/eco-placeholder.svg'
  },
  {
    id: 'trilha2',
    name: 'Trilha das Palmeiras',
    description: 'Percurso pela mata com diversas espécies de palmeiras nativas da Mata Atlântica.',
    level: 'Moderado',
    duration: '2h',
    characteristics: ['Observação de aves', 'Presença de nascente'],
    image: '/images/eco-placeholder.svg'
  },
  {
    id: 'trilha3',
    name: 'Trilha do Córrego',
    description: 'Trilha que acompanha o córrego com observação de fauna aquática e riparia.',
    level: 'Fácil',
    duration: '1h',
    characteristics: ['Aquática', 'Fauna variada'],
    image: '/images/eco-placeholder.svg'
  },
  {
    id: 'trilha4',
    name: 'Trilha do Mirante',
    description: 'Trilha com vista panorâmica para o campus e região de Pinheiral.',
    level: 'Difícil',
    duration: '2h30min',
    characteristics: ['Vista panorâmica', 'Maior elevação'],
    image: '/images/eco-placeholder.svg'
  },
  {
    id: 'trilha5',
    name: 'Trilha da Restauração',
    description: 'Trilha educativa sobre processos de restauração ecológica e recuperação ambiental.',
    level: 'Moderado',
    duration: '1h45min',
    characteristics: ['Educativa', 'Áreas em recuperação'],
    image: '/images/eco-placeholder.svg'
  }
];

export const structureData = [
  {
    id: 'museu',
    name: 'Museu',
    description: 'Espaço expositivo com acervo de espécimes da fauna e flora local, com foco em educação ambiental.',
    icon: 'bi-building',
  },
  {
    id: 'jardim-sensorial',
    name: 'Jardim Sensorial',
    description: 'Jardim projetado para estimular os sentidos com plantas aromáticas, texturas e cores variadas.',
    icon: 'bi-flower1',
  },
  {
    id: 'trilhas',
    name: 'Trilhas Interpretativas',
    description: 'Cinco trilhas sinalizadas que permitem explorar diferentes ambientes do EEcoE.',
    icon: 'bi-signpost-split',
  },
  {
    id: 'pancoteca',
    name: 'Pancoteca',
    description: 'Coleção de Plantas Alimentícias Não Convencionais com potencial gastronômico e nutricional.',
    icon: 'bi-basket',
  },
  {
    id: 'centro-visitantes',
    name: 'Centro de Visitantes',
    description: 'Estrutura de acolhimento com auditório, sala de exposições e área de convivência.',
    icon: 'bi-people',
  },
  {
    id: 'simulador-chuvas',
    name: 'Simulador de Chuvas',
    description: 'Equipamento educativo que demonstra os efeitos da chuva em diferentes tipos de solo.',
    icon: 'bi-cloud-rain',
  },
  {
    id: 'museu-ciencias',
    name: 'Museu de Ciências Naturais Ipê-Amarelo',
    description: 'Museu dedicado às ciências naturais com coleções didáticas de geologia, biologia e ecologia.',
    icon: 'bi-book',
  }
];