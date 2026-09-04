import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './LandingPage.css';
import { trailData, structureData, mockProjects } from '../../data/mockData';

const LandingPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = React.useState('Todos');

  const filters = ['Todos', 'Pesquisa', 'Extensão', 'Ensino', 'Conservação'];
  
  const filteredProjects = activeFilter === 'Todos' 
    ? mockProjects 
    : mockProjects.filter(p => p.category === activeFilter);

  const stats = [
    { value: 12500, label: 'Visitantes', icon: 'bi-people' },
    { value: 45, label: 'Projetos', icon: 'bi-folder' },
    { value: 5, label: 'Trilhas', icon: 'bi-signpost-split' },
    { value: 37, label: 'Hectares', icon: 'bi-tree' },
    { value: 60, label: 'Pesquisas', icon: 'bi-book' },
  ];

  const useCountUp = (target: number, duration: number = 2000) => {
    const [count, setCount] = React.useState(0);
    
    React.useEffect(() => {
      let startTime: number | null = null;
      let animationFrame: number;
      
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration;
        
        if (progress < 1) {
          setCount(Math.floor(target * progress));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [target, duration]);
    
    return count;
  };

  const StatCard = ({ value, label, icon }: { value: number; label: string; icon: string }) => {
    const count = useCountUp(value);
    return (
      <div className="stat-card">
        <i className={`bi ${icon} stat-icon`}></i>
        <div className="stat-value">{count}</div>
        <div className="stat-label">{label}</div>
      </div>
    );
  };

  return (
    <div className="landing-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-background"></div>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <div className="row">
            <div className="col-lg-8">
              <h1 className="hero-title">
                Espaço Ecológico <span className="hero-highlight">Educativo</span>
              </h1>
              <p className="hero-subtitle">
                Laboratório-Museu do IFRJ Campus Pinheiral dedicado à educação ambiental, 
                ensino, pesquisa e extensão em uma área de 37 hectares.
              </p>
              <div className="hero-buttons">
                <a href="#sobre" className="btn btn-success btn-lg">
                  Conheça o EEcoE
                </a>
                <a href="#visitacao" className="btn btn-outline-light btn-lg">
                  Agende uma visita
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="sobre">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 slide-in-left">
              <div className="about-image-wrapper">
                <img src="/images/about-eecoe.jpg" alt="Espaço Ecológico Educativo" className="about-image" />
                <div className="about-image-badge">37 hectares</div>
              </div>
            </div>
            <div className="col-lg-6 slide-in-right">
              <h2 className="section-title">Sobre o EEcoE</h2>
              <p className="about-text">
                O Espaço Ecológico Educativo (EEcoE) é um Laboratório-Museu e Museu Vivo do 
                IFRJ Campus Pinheiral, dedicado à educação ambiental, ao ensino, à pesquisa 
                e à extensão.
              </p>
              <div className="about-features">
                <div className="feature-item">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Educação Ambiental integrada</span>
                </div>
                <div className="feature-item">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Pesquisa científica aplicada</span>
                </div>
                <div className="feature-item">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Extensão comunitária</span>
                </div>
                <div className="feature-item">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Conservação da biodiversidade</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structures Section */}
      <section className="structures-section" id="estruturas">
        <div className="container">
          <h2 className="section-title text-center">Nossas Estruturas</h2>
          <p className="section-subtitle text-center">
            Espaços projetados para proporcionar experiências educativas únicas
          </p>
          <div className="row g-4">
            {structureData.map((structure, index) => (
              <div className="col-md-6 col-lg-4" key={structure.id}>
                <div className="structure-card hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="structure-icon">
                    <i className={`bi ${structure.icon}`}></i>
                  </div>
                  <h3 className="structure-title">{structure.name}</h3>
                  <p className="structure-description">{structure.description}</p>
                  <button className="btn btn-link" aria-label={`Saiba mais sobre ${structure.name}`}>
                    Saiba mais <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section" id="projetos">
        <div className="container">
          <h2 className="section-title text-center">Projetos</h2>
          <p className="section-subtitle text-center">
            Iniciativas de pesquisa, extensão e conservação
          </p>
          
          <div className="project-filters">
            {filters.map(filter => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
                aria-label={`Filtrar por ${filter}`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="row g-4">
            {filteredProjects.map((project) => (
              <div className="col-md-6 col-lg-4" key={project.id}>
                <div className="project-card hover-lift">
                  <div className="project-image-wrapper">
                    <img src={project.images[0]} alt={project.title} className="project-image" />
                    <span className={`badge bg-${project.status === 'Em andamento' ? 'success' : 'warning'}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="project-content">
                    <span className="project-category">{project.category}</span>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-details">
                      <span><i className="bi bi-bookmark"></i> {project.area}</span>
                      <span><i className="bi bi-person"></i> {project.responsible}</span>
                    </div>
                    <button className="btn btn-outline-success btn-sm">
                      Ver detalhes
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trails Section */}
      <section className="trails-section" id="trilhas">
        <div className="container">
          <h2 className="section-title text-center">Trilhas Interpretativas</h2>
          <p className="section-subtitle text-center">
            Cinco percursos que revelam a biodiversidade do EEcoE
          </p>
          <div className="row g-4">
            {trailData.map((trail) => (
              <div className="col-md-6 col-lg-4" key={trail.id}>
                <div className="trail-card hover-lift">
                  <div className="trail-image-wrapper">
                    <img src={trail.image} alt={trail.name} className="trail-image" />
                    <span className={`trail-level trail-${trail.level.toLowerCase()}`}>
                      {trail.level}
                    </span>
                  </div>
                  <div className="trail-content">
                    <h3 className="trail-title">{trail.name}</h3>
                    <p className="trail-description">{trail.description}</p>
                    <div className="trail-info">
                      <span><i className="bi bi-clock"></i> {trail.duration}</span>
                    </div>
                    <div className="trail-characteristics">
                      {trail.characteristics.map(char => (
                        <span key={char} className="badge bg-success">{char}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section" id="galeria">
        <div className="container">
          <h2 className="section-title text-center">Galeria</h2>
          <div id="galleryCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#galleryCarousel" data-bs-slide-to="0" className="active" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#galleryCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#galleryCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/images/gallery1.jpg" alt="Trilhas do EEcoE" className="d-block w-100" />
                <div className="carousel-caption">
                  <h5>Trilhas Interpretativas</h5>
                </div>
              </div>
              <div className="carousel-item">
                <img src="/images/gallery2.jpg" alt="Atividades educativas" className="d-block w-100" />
                <div className="carousel-caption">
                  <h5>Atividades Educativas</h5>
                </div>
              </div>
              <div className="carousel-item">
                <img src="/images/gallery3.jpg" alt="Pesquisas científicas" className="d-block w-100" />
                <div className="carousel-caption">
                  <h5>Pesquisas Científicas</h5>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#galleryCarousel" data-bs-slide="prev" aria-label="Anterior">
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#galleryCarousel" data-bs-slide="next" aria-label="Próximo">
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section" id="estatisticas">
        <div className="container">
          <h2 className="section-title text-center">Nossos Números</h2>
          <div className="row g-4">
            {stats.map((stat, index) => (
              <div className="col-6 col-md-4 col-lg" key={index}>
                <StatCard {...stat} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visitation Section */}
      <section className="visitation-section" id="visitacao">
        <div className="container">
          <h2 className="section-title text-center">Como Visitar</h2>
          <p className="section-subtitle text-center">
            Siga os passos para agendar sua visita ao EEcoE
          </p>
          <div className="visitation-steps">
            <div className="step">Solicitação</div>
            <div className="step-arrow"><i className="bi bi-arrow-down"></i></div>
            <div className="step">Análise de disponibilidade</div>
            <div className="step-arrow"><i className="bi bi-arrow-down"></i></div>
            <div className="step">Confirmação</div>
            <div className="step-arrow"><i className="bi bi-arrow-down"></i></div>
            <div className="step">Preparação</div>
            <div className="step-arrow"><i className="bi bi-arrow-down"></i></div>
            <div className="step">Visita</div>
            <div className="step-arrow"><i className="bi bi-arrow-down"></i></div>
            <div className="step">Finalização</div>
          </div>
          <div className="text-center mt-4">
            <a href="/login" className="btn btn-success btn-lg">
              Agende uma visita
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contato">
        <div className="container">
          <h2 className="section-title text-center">Contato</h2>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="contact-info">
                <div className="contact-item">
                  <i className="bi bi-geo-alt-fill"></i>
                  <div>
                    <h4>Endereço</h4>
                    <p>Rodovia Sebastião Lacerda, s/n<br />Pinheiral - RJ, CEP: 27197-000</p>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="bi bi-envelope-fill"></i>
                  <div>
                    <h4>E-mail</h4>
                    <p>eecoe@ifrj.edu.br</p>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="bi bi-telephone-fill"></i>
                  <div>
                    <h4>Telefone</h4>
                    <p>(24) 3356-8200</p>
                  </div>
                </div>
              </div>
              <div className="contact-map">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.5!2d-44.0!3d-22.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDMwJzAwLjAiUyA0NMKwMDAnMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1700000000000" 
                  width="100%" 
                  height="300" 
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen 
                  loading="lazy"
                  title="Mapa do IFRJ Campus Pinheiral"
                ></iframe>
              </div>
            </div>
            <div className="col-lg-6">
              <form className="contact-form" aria-label="Formulário de contato">
                <div className="mb-3">
                  <label htmlFor="contactName" className="form-label">Nome completo</label>
                  <input type="text" className="form-control" id="contactName" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="contactEmail" className="form-label">E-mail</label>
                  <input type="email" className="form-control" id="contactEmail" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="contactPhone" className="form-label">Telefone</label>
                  <input type="tel" className="form-control" id="contactPhone" />
                </div>
                <div className="mb-3">
                  <label htmlFor="contactMessage" className="form-label">Mensagem</label>
                  <textarea className="form-control" id="contactMessage" rows={5} required></textarea>
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Enviar mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;