import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import DashboardLayout from '../../layouts/DashboardLayout';
import './ConfiguracoesPage.css';

const ConfiguracoesPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(() => localStorage.getItem('eecoe_email_notifications') !== 'false');
  const [saved, setSaved] = useState(false);
  const updateEmailNotifications = (checked: boolean) => { setEmailNotifications(checked); localStorage.setItem('eecoe_email_notifications', String(checked)); setSaved(true); };

  return <DashboardLayout><div className="config-page"><div className="page-header"><div><h1 className="page-title">Configurações</h1><p className="page-subtitle">Personalize sua experiência no EEcoE</p></div></div><div className="config-list"><section className="config-card"><div className="config-icon"><i className="bi bi-palette"></i></div><div><h2>Aparência</h2><p>Escolha como o sistema será exibido.</p><div className="theme-options"><button type="button" className={theme === 'light' ? 'selected' : ''} aria-pressed={theme === 'light'} onClick={() => setTheme('light')}><i className="bi bi-sun"></i> Claro</button><button type="button" className={theme === 'dark' ? 'selected' : ''} aria-pressed={theme === 'dark'} onClick={() => setTheme('dark')}><i className="bi bi-moon"></i> Escuro</button></div></div></section><section className="config-card"><div className="config-icon"><i className="bi bi-bell"></i></div><div className="config-copy"><h2>Notificações por e-mail</h2><p>Receba atualizações sobre pesquisas, visitas e processos.</p></div><label className="config-switch"><input type="checkbox" checked={emailNotifications} onChange={event => updateEmailNotifications(event.target.checked)} /><span></span></label></section></div>{saved && <p className="config-saved"><i className="bi bi-check-circle"></i> Preferências salvas.</p>}</div></DashboardLayout>;
};

export default ConfiguracoesPage;