
import { Visit, VisitStatus } from '../types';
import { mockVisits } from '../data/mockData';

// Simulação de API - futuramente será substituído por chamadas reais
const STORAGE_KEY = 'eecoe_visits';
const DELAY = 500; // Simula latência da rede

// Inicializa o localStorage com dados mock se não existir
const initializeStorage = (): void => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockVisits));
  }
};

// Obtém todas as visitas do localStorage
const getVisitsFromStorage = (): Visit[] => {
  initializeStorage();
  const visits = localStorage.getItem(STORAGE_KEY);
  return visits ? JSON.parse(visits) : [];
};

// Salva visitas no localStorage
const saveVisitsToStorage = (visits: Visit[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(visits));
};

// Simula delay de API
const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const visitacaoService = {
  // Lista todas as visitas
  async getVisits(): Promise<Visit[]> {
    await delay(DELAY);
    return getVisitsFromStorage();
  },

  // Busca uma visita por ID
  async getVisitById(id: string): Promise<Visit | null> {
    await delay(DELAY);
    const visits = getVisitsFromStorage();
    return visits.find(visit => visit.id === id) || null;
  },

  // Cria nova solicitação de visita
  async createVisit(visitData: Omit<Visit, 'id' | 'createdAt' | 'status'>): Promise<Visit> {
    await delay(DELAY);
    const visits = getVisitsFromStorage();
    
    const newVisit: Visit = {
      ...visitData,
      id: `visit-${Date.now()}`,
      status: 'Solicitação',
      createdAt: new Date().toISOString(),
    };
    
    visits.push(newVisit);
    saveVisitsToStorage(visits);
    return newVisit;
  },

  // Atualiza uma visita existente
  async updateVisit(id: string, updates: Partial<Visit>): Promise<Visit> {
    await delay(DELAY);
    const visits = getVisitsFromStorage();
    const index = visits.findIndex(visit => visit.id === id);
    
    if (index === -1) {
      throw new Error('Visita não encontrada');
    }
    
    visits[index] = { ...visits[index], ...updates };
    saveVisitsToStorage(visits);
    return visits[index];
  },

  // Atualiza o status de uma visita
  async updateVisitStatus(id: string, status: VisitStatus): Promise<Visit> {
    return this.updateVisit(id, { status });
  },

  // Cancela uma visita
  async cancelVisit(id: string, reason?: string): Promise<Visit> {
    await delay(DELAY);
    const visits = getVisitsFromStorage();
    const index = visits.findIndex(visit => visit.id === id);
    
    if (index === -1) {
      throw new Error('Visita não encontrada');
    }
    
    visits[index] = {
      ...visits[index],
      status: 'Cancelada',
      notes: reason ? `Motivo do cancelamento: ${reason}` : visits[index].notes,
    };
    
    saveVisitsToStorage(visits);
    return visits[index];
  },

  // Remove uma visita
  async deleteVisit(id: string): Promise<void> {
    await delay(DELAY);
    const visits = getVisitsFromStorage();
    const filteredVisits = visits.filter(visit => visit.id !== id);
    saveVisitsToStorage(filteredVisits);
  },

  // Filtra visitas por status
  async getVisitsByStatus(status: VisitStatus): Promise<Visit[]> {
    await delay(DELAY);
    const visits = getVisitsFromStorage();
    return visits.filter(visit => visit.status === status);
  },

  // Busca visitas por período
  async getVisitsByDateRange(startDate: string, endDate: string): Promise<Visit[]> {
    await delay(DELAY);
    const visits = getVisitsFromStorage();
    return visits.filter(visit => {
      const visitDate = new Date(visit.date);
      return visitDate >= new Date(startDate) && visitDate <= new Date(endDate);
    });
  },

  // Obtém estatísticas de visitas
  async getVisitStats(): Promise<{
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  }> {
    await delay(DELAY);
    const visits = getVisitsFromStorage();
    
    return {
      total: visits.length,
      pending: visits.filter(v => v.status === 'Solicitação' || v.status === 'Em análise').length,
      confirmed: visits.filter(v => v.status === 'Confirmada' || v.status === 'Preparação').length,
      completed: visits.filter(v => v.status === 'Finalizada').length,
      cancelled: visits.filter(v => v.status === 'Cancelada').length,
    };
  },
};