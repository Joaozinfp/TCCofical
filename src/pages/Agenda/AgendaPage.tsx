import React, { useMemo, useState } from 'react';
import { mockEvents } from '../../data/mockData';
import { Event } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../layouts/DashboardLayout';
import './AgendaPage.css';

const AgendaPage: React.FC = () => {
  const { user, hasPermission } = useAuth();
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  const filteredEvents = useMemo(() => events.filter(event => {
    const term = searchTerm.toLowerCase();
    return event.title.toLowerCase().includes(term) || event.description.toLowerCase().includes(term) || event.location.toLowerCase().includes(term);
  }).sort((first, second) => first.date.localeCompare(second.date)), [events, searchTerm]);

  const handleCreate = (formEvent: React.FormEvent) => {
    formEvent.preventDefault();
    const newEvent: Event = { id: `event-${Date.now()}`, title, description, date, time, location, organizer: user?.name || 'EEcoE' };
    setEvents(current => [...current, newEvent]); setTitle(''); setDescription(''); setDate(''); setTime(''); setLocation(''); setShowModal(false);
  };

  return (
    <DashboardLayout>
      <div className="agenda-page"><div className="page-header"><div><h1 className="page-title">Agenda</h1><p className="page-subtitle">Consulte os próximos eventos do EEcoE</p></div>{hasPermission('canManageProcess') && <button className="btn btn-success" onClick={() => setShowModal(true)}><i className="bi bi-plus-lg"></i> Novo Evento</button>}</div><div className="agenda-toolbar"><div className="search-box"><i className="bi bi-search"></i><input value={searchTerm} onChange={event => setSearchTerm(event.target.value)} placeholder="Buscar eventos..." aria-label="Buscar eventos" /></div></div><div className="agenda-layout"><section className="agenda-list"><div className="agenda-section-heading"><h2>Próximos eventos</h2><span>{filteredEvents.length} eventos</span></div>{filteredEvents.length === 0 ? <div className="agenda-empty">Nenhum evento encontrado.</div> : filteredEvents.map(event => <article className="agenda-event" key={event.id}><div className="agenda-date"><strong>{new Date(event.date).getDate()}</strong><span>{new Date(event.date).toLocaleDateString('pt-BR', { month: 'short' })}</span></div><div className="agenda-event-content"><h3>{event.title}</h3><p>{event.description}</p><div><span><i className="bi bi-clock"></i> {event.time}</span><span><i className="bi bi-geo-alt"></i> {event.location}</span></div></div><button className="btn btn-sm btn-outline-primary" onClick={() => setSelectedEvent(event)} aria-label={`Ver detalhes de ${event.title}`}><i className="bi bi-eye"></i></button></article>)}</section><aside className="agenda-summary"><i className="bi bi-calendar3"></i><h2>Calendário</h2><p>Organize sua participação nos eventos e atividades do espaço.</p><div className="agenda-summary-value">{events.length}</div><span>eventos cadastrados</span></aside></div>
        {showModal && <div className="modal show d-block" tabIndex={-1}><div className="modal-dialog"><form className="modal-content" onSubmit={handleCreate}><div className="modal-header"><h5 className="modal-title">Novo Evento</h5><button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Fechar"></button></div><div className="modal-body"><label className="form-label" htmlFor="event-title">Título</label><input id="event-title" className="form-control mb-3" value={title} onChange={event => setTitle(event.target.value)} required /><label className="form-label" htmlFor="event-description">Descrição</label><textarea id="event-description" className="form-control mb-3" rows={3} value={description} onChange={event => setDescription(event.target.value)} required /><div className="row mb-3"><div className="col"><label className="form-label" htmlFor="event-date">Data</label><input id="event-date" type="date" className="form-control" value={date} onChange={event => setDate(event.target.value)} required /></div><div className="col"><label className="form-label" htmlFor="event-time">Horário</label><input id="event-time" type="time" className="form-control" value={time} onChange={event => setTime(event.target.value)} required /></div></div><label className="form-label" htmlFor="event-location">Local</label><input id="event-location" className="form-control" value={location} onChange={event => setLocation(event.target.value)} required /></div><div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Voltar</button><button type="submit" className="btn btn-success">Criar evento</button></div></form></div></div>}
        {selectedEvent && <div className="modal show d-block" tabIndex={-1}><div className="modal-dialog"><div className="modal-content"><div className="modal-header"><h5 className="modal-title">Detalhes do evento</h5><button className="btn-close" onClick={() => setSelectedEvent(null)} aria-label="Fechar"></button></div><div className="modal-body"><h4>{selectedEvent.title}</h4><p>{selectedEvent.description}</p><p><strong>Data:</strong> {new Date(selectedEvent.date).toLocaleDateString('pt-BR')} às {selectedEvent.time}</p><p><strong>Local:</strong> {selectedEvent.location}</p><p><strong>Organização:</strong> {selectedEvent.organizer}</p></div></div></div></div>}
      </div>
    </DashboardLayout>
  );
};

export default AgendaPage;