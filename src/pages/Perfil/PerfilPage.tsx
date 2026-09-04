import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../layouts/DashboardLayout';
import './PerfilPage.css';

const PerfilPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [saved, setSaved] = useState(false);
  const [avatarError, setAvatarError] = useState('');
  const handleSubmit = (event: React.FormEvent) => { event.preventDefault(); updateUser({ name, phone }); setSaved(true); };
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setAvatarError('Selecione um arquivo de imagem.'); return; }
    if (file.size > 2 * 1024 * 1024) { setAvatarError('A imagem deve ter no máximo 2 MB.'); return; }
    const reader = new FileReader();
    reader.onload = () => { if (typeof reader.result === 'string') { updateUser({ avatar: reader.result }); setAvatarError(''); setSaved(true); } };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  return <DashboardLayout><div className="perfil-page"><div className="page-header"><div><h1 className="page-title">Meu Perfil</h1><p className="page-subtitle">Gerencie suas informações pessoais</p></div></div><div className="profile-layout"><section className="profile-card profile-summary"><img src={user?.avatar || '/images/avatar-default.svg'} alt={user?.name} /><label className="avatar-upload"><i className="bi bi-camera"></i> Alterar imagem<input type="file" accept="image/*" onChange={handleAvatarChange} /></label>{avatarError && <small className="avatar-error">{avatarError}</small>}<h2>{name}</h2><span>{user?.role}</span><p>{user?.department || 'EEcoE'}</p></section><section className="profile-card"><form onSubmit={handleSubmit}><h2>Dados pessoais</h2><div className="row g-3"><div className="col-md-6"><label className="form-label" htmlFor="profile-name">Nome completo</label><input id="profile-name" className="form-control" value={name} onChange={event => setName(event.target.value)} required /></div><div className="col-md-6"><label className="form-label" htmlFor="profile-email">E-mail</label><input id="profile-email" className="form-control" value={user?.email || ''} disabled /></div><div className="col-md-6"><label className="form-label" htmlFor="profile-phone">Telefone</label><input id="profile-phone" className="form-control" value={phone} onChange={event => setPhone(event.target.value)} /></div><div className="col-md-6"><label className="form-label" htmlFor="profile-role">Perfil de acesso</label><input id="profile-role" className="form-control" value={user?.role || ''} disabled /></div></div><div className="profile-actions"><button className="btn btn-success" type="submit"><i className="bi bi-check-lg"></i> Salvar alterações</button>{saved && <span className="profile-saved">Alterações salvas nesta sessão.</span>}</div></form></section></div></div></DashboardLayout>;
};

export default PerfilPage;