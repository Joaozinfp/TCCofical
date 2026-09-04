import { useState, useEffect, useCallback } from 'react';
import { Visit, VisitStatus } from '../types';
import { visitacaoService } from '../services/visitaçaoService';

interface UseVisitacaoReturn {
  visits: Visit[];
  loading: boolean;
  error: string | null;
  selectedVisit: Visit | null;
  stats: {
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  } | null;
  loadVisits: () => Promise<void>;
  loadVisit: (id: string) => Promise<void>;
  createVisit: (data: Omit<Visit, 'id' | 'createdAt' | 'status'>) => Promise<Visit>;
  updateVisit: (id: string, updates: Partial<Visit>) => Promise<void>;
  updateStatus: (id: string, status: VisitStatus) => Promise<void>;
  cancelVisit: (id: string, reason?: string) => Promise<void>;
  deleteVisit: (id: string) => Promise<void>;
  loadStats: () => Promise<void>;
}

export const useVisitacao = (): UseVisitacaoReturn => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [stats, setStats] = useState<UseVisitacaoReturn['stats']>(null);

  const loadVisits = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await visitacaoService.getVisits();
      setVisits(data);
    } catch (err) {
      setError('Erro ao carregar visitas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadVisit = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const visit = await visitacaoService.getVisitById(id);
      setSelectedVisit(visit);
    } catch (err) {
      setError('Erro ao carregar visita');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createVisit = useCallback(async (data: Omit<Visit, 'id' | 'createdAt' | 'status'>) => {
    setLoading(true);
    setError(null);
    try {
      const newVisit = await visitacaoService.createVisit(data);
      await loadVisits();
      return newVisit;
    } catch (err) {
      setError('Erro ao criar visita');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadVisits]);

  const updateVisit = useCallback(async (id: string, updates: Partial<Visit>) => {
    setLoading(true);
    setError(null);
    try {
      await visitacaoService.updateVisit(id, updates);
      await loadVisits();
      if (selectedVisit?.id === id) {
        await loadVisit(id);
      }
    } catch (err) {
      setError('Erro ao atualizar visita');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadVisits, loadVisit, selectedVisit]);

  const updateStatus = useCallback(async (id: string, status: VisitStatus) => {
    await updateVisit(id, { status });
  }, [updateVisit]);

  const cancelVisit = useCallback(async (id: string, reason?: string) => {
    setLoading(true);
    setError(null);
    try {
      await visitacaoService.cancelVisit(id, reason);
      await loadVisits();
      if (selectedVisit?.id === id) {
        await loadVisit(id);
      }
    } catch (err) {
      setError('Erro ao cancelar visita');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadVisits, loadVisit, selectedVisit]);

  const deleteVisit = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await visitacaoService.deleteVisit(id);
      await loadVisits();
      if (selectedVisit?.id === id) {
        setSelectedVisit(null);
      }
    } catch (err) {
      setError('Erro ao excluir visita');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadVisits, selectedVisit]);

  const loadStats = useCallback(async () => {
    try {
      const data = await visitacaoService.getVisitStats();
      setStats(data);
    } catch (err) {
      console.error('Erro ao carregar estatísticas:', err);
    }
  }, []);

  useEffect(() => {
    loadVisits();
    loadStats();
  }, [loadVisits, loadStats]);

  return {
    visits,
    loading,
    error,
    selectedVisit,
    stats,
    loadVisits,
    loadVisit,
    createVisit,
    updateVisit,
    updateStatus,
    cancelVisit,
    deleteVisit,
    loadStats,
  };
};