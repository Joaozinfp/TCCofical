import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('E-mail inválido.');
      setLoading(false);
      return;
    }

    try {
      const success = await login(email, password);
      if (success) {
        if (remember) {
          localStorage.setItem('eecoe_remember', email);
        }
        addNotification({
          userId: 'user',
          title: 'Login realizado',
          message: 'Bem-vindo de volta!',
          type: 'success',
          read: false,
        });
        navigate('/dashboard');
      } else {
        setError('E-mail ou senha incorretos.');
      }
    } catch (err) {
      setError('Erro ao realizar login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form-side">
          <div className="login-form-wrapper">
            <Link to="/" className="login-logo-link" aria-label="Voltar para página inicial">
              <img src="/images/eecoe-logo.svg" alt="EEcoE Logo" className="login-logo" />
              <h2>EEcoE</h2>
            </Link>
            
            <h1 className="login-title">Acesso ao Sistema</h1>
            <p className="login-subtitle">Entre com suas credenciais para acessar o sistema</p>

            {error && (
              <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle"></i> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">E-mail</label>
                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    aria-required="true"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Senha</label>
                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-lock"></i></span>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha"
                    required
                    aria-required="true"
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="remember"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="remember">
                    Lembrar login
                  </label>
                </div>
                <a href="#" className="forgot-password">Esqueci minha senha</a>
              </div>

              <button
                type="submit"
                className="btn btn-success w-100 login-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </button>
            </form>

            <div className="login-footer">
              <p>Ainda não possui conta? <Link to="/cadastro">Cadastre-se</Link></p>
              <div className="demo-credentials">
                <p className="demo-title">Credenciais de demonstração:</p>
                <p className="demo-info">admin@ifrj.edu.br / admin123</p>
              </div>
            </div>
          </div>
        </div>
        <div className="login-image-side">
          <div className="login-image-content">
            <h3>Bem-vindo ao EEcoE</h3>
            <p>Sistema de gestão do Espaço Ecológico Educativo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;