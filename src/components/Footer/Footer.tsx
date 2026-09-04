import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4">
            <div className="footer-brand">
              <img src="/images/eecoe-logo.svg" alt="EEcoE Logo" className="footer-logo" />
              <h4>EEcoE</h4>
            </div>
            <p className="footer-description">
              Espaço Ecológico Educativo do IFRJ Campus Pinheiral. Laboratório-Museu dedicado à educação ambiental, pesquisa e extensão.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook" className="social-link"><i className="bi bi-facebook"></i></a>
              <a href="#" aria-label="Instagram" className="social-link"><i className="bi bi-instagram"></i></a>
              <a href="#" aria-label="YouTube" className="social-link"><i className="bi bi-youtube"></i></a>
              <a href="#" aria-label="LinkedIn" className="social-link"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-4">
            <h5>Links Rápidos</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><a href="#sobre">Sobre</a></li>
              <li><a href="#projetos">Projetos</a></li>
              <li><a href="#trilhas">Trilhas</a></li>
              <li><a href="#visitacao">Visitação</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-4">
            <h5>Contato</h5>
            <ul className="footer-contact">
              <li><i className="bi bi-geo-alt"></i> Rodovia Sebastião Lacerda, s/n - Pinheiral, RJ</li>
              <li><i className="bi bi-envelope"></i> eecoe@ifrj.edu.br</li>
              <li><i className="bi bi-telephone"></i> (24) 3356-8200</li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-4">
            <h5>IFRJ Campus Pinheiral</h5>
            <p>Instituto Federal de Educação, Ciência e Tecnologia do Rio de Janeiro</p>
            <a href="https://ifrj.edu.br" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm">
              Saiba mais
            </a>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} EEcoE - Espaço Ecológico Educativo | IFRJ Campus Pinheiral. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;