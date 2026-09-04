import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top" role="navigation" aria-label="Navegação principal">
      <div className="container">
        <Link className="navbar-brand" to="/" aria-label="EEcoE - Página inicial">
          <img src="/images/eecoe-logo.svg" alt="EEcoE Logo" className="navbar-logo" />
          <span className="navbar-title">EEcoE</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-label="Abrir menu de navegação"
          aria-expanded={isOpen}
        >
          <i className="bi bi-list"></i>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#sobre">Sobre</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#projetos">Projetos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#trilhas">Trilhas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#visitacao">Visitação</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#pesquisa">Pesquisa</a>
            </li>
          </ul>

          <div className="navbar-actions">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn btn-outline-light btn-sm">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="btn btn-light btn-sm">
                  Sair
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-light btn-sm">
                <i className="bi bi-person"></i> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;