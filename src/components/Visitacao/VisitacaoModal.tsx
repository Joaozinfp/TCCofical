import React, { useState } from 'react';
import { Visit } from '../../types';
import { trailData } from '../../data/mockData';
import './VisitacaoComponents.css';

interface VisitacaoModalProps {
  onClose: () => void;
  onSubmit: (data: Omit<Visit, 'id' | 'createdAt' | 'status'>) => Promise<void>;
}

const VisitacaoModal: React.FC<VisitacaoModalProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    school: '',
    date: '',
    time: '09:00',
    numberOfVisitors: 1,
    trailId: '',
    responsible: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.school.trim()) {
      newErrors.school = 'Escola/Instituição é obrigatória';
    }

    if (!formData.date) {
      newErrors.date = 'Data é obrigatória';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Data não pode ser no passado';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Horário é obrigatório';
    }

    if (formData.numberOfVisitors < 1) {
      newErrors.numberOfVisitors = 'Número de visitantes deve ser maior que 0';
    }

    if (!formData.responsible.trim()) {
      newErrors.responsible = 'Responsável é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Erro ao criar visita:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numberOfVisitors' ? parseInt(value) || 0 : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="modal show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Nova Solicitação de Visita</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Fechar"
            ></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="school" className="form-label">
                    Escola/Instituição *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.school ? 'is-invalid' : ''}`}
                    id="school"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    placeholder="Nome da escola ou instituição"
                  />
                  {errors.school && (
                    <div className="invalid-feedback">{errors.school}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="responsible" className="form-label">
                    Responsável pela Instituição *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.responsible ? 'is-invalid' : ''}`}
                    id="responsible"
                    name="responsible"
                    value={formData.responsible}
                    onChange={handleChange}
                    placeholder="Nome do responsável"
                  />
                  {errors.responsible && (
                    <div className="invalid-feedback">{errors.responsible}</div>
                  )}
                </div>

                <div className="col-md-4">
                  <label htmlFor="date" className="form-label">
                    Data da Visita *
                  </label>
                  <input
                    type="date"
                    className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                  {errors.date && (
                    <div className="invalid-feedback">{errors.date}</div>
                  )}
                </div>

                <div className="col-md-4">
                  <label htmlFor="time" className="form-label">
                    Horário *
                  </label>
                  <input
                    type="time"
                    className={`form-control ${errors.time ? 'is-invalid' : ''}`}
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                  />
                  {errors.time && (
                    <div className="invalid-feedback">{errors.time}</div>
                  )}
                </div>

                <div className="col-md-4">
                  <label htmlFor="numberOfVisitors" className="form-label">
                    Número de Visitantes *
                  </label>
                  <input
                    type="number"
                    className={`form-control ${errors.numberOfVisitors ? 'is-invalid' : ''}`}
                    id="numberOfVisitors"
                    name="numberOfVisitors"
                    value={formData.numberOfVisitors}
                    onChange={handleChange}
                    min="1"
                    max="200"
                  />
                  {errors.numberOfVisitors && (
                    <div className="invalid-feedback">{errors.numberOfVisitors}</div>
                  )}
                </div>

                <div className="col-12">
                  <label htmlFor="trailId" className="form-label">
                    Trilha Selecionada
                  </label>
                  <select
                    className="form-select"
                    id="trailId"
                    name="trailId"
                    value={formData.trailId}
                    onChange={handleChange}
                  >
                    <option value="">Selecione uma trilha (opcional)</option>
                    {trailData.map(trail => (
                      <option key={trail.id} value={trail.id}>
                        {trail.name} ({trail.level} - {trail.duration})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12">
                  <label htmlFor="notes" className="form-label">
                    Observações
                  </label>
                  <textarea
                    className="form-control"
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Observações adicionais, necessidades especiais, etc."
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-success"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Enviando...
                  </>
                ) : (
                  'Solicitar Visita'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VisitacaoModal;