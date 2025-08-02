import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Container, Nav, Navbar, Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [activeSection, setActiveSection] = useState('landing-section');
  const [scrollActiveSection, setScrollActiveSection] = useState('landing-section');

  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        // Get section positions
        const landingSection = document.querySelector('.landing-section');
        const aboutSection = document.getElementById('about-section');
        const projectsSection = document.getElementById('projects-section');
        const contactSection = document.getElementById('contact-section');
        // Define breakpoints (start of each section minus navbar height)
        const navbarHeight = 100;
        const aboutStart = aboutSection ? aboutSection.offsetTop - navbarHeight : 0;
        const projectsStart = projectsSection ? projectsSection.offsetTop - navbarHeight : 0;
        const contactStart = contactSection ? contactSection.offsetTop - navbarHeight : 0;
        // Determine active section based on scroll position
        let newActiveSection;
        if (scrollTop >= contactStart) {
          newActiveSection = 'contact-section';
        } else if (scrollTop >= projectsStart) {
          newActiveSection = 'projects-section';
        } else if (scrollTop >= aboutStart) {
          newActiveSection = 'about-section';
        } else {
          newActiveSection = 'landing-section';
        }
        // Only update if changed to avoid unnecessary re-renders
        if (newActiveSection !== scrollActiveSection) {
          setScrollActiveSection(newActiveSection);
        }
      }, 100); // 100ms debounce
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [scrollActiveSection]);

  return (
    <>
      <Navbar expand="lg" fixed="top" className="custom-navbar">
        <Container>
          <Navbar.Brand href="#home" className="custom-brand">
            <div className="brand-container">
              <img src={import.meta.env.BASE_URL + "/Image/temp_logo.png"} alt="Marco Arante Logo" className="navbar-logo" />
              <span className="brand-text">MARCO ARANTE</span>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto custom-nav">
              <Nav.Link 
                href="#landing-section" 
                className={`custom-nav-link ${scrollActiveSection === 'landing-section' ? 'active' : ''}`}
                onClick={() => {
                  document.querySelector('.landing-section').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                HOME
              </Nav.Link>
              <Nav.Link 
                href="#about-section" 
                className={`custom-nav-link ${scrollActiveSection === 'about-section' ? 'active' : ''}`}
                onClick={() => {
                  document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                ABOUT
              </Nav.Link>
              <Nav.Link 
                href="#projects-section" 
                className={`custom-nav-link ${scrollActiveSection === 'projects-section' ? 'active' : ''}`}
                onClick={() => {
                  document.getElementById('projects-section').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                PROJECTS
              </Nav.Link>
              <Nav.Link 
                href="#contact-section" 
                className={`custom-nav-link ${scrollActiveSection === 'contact-section' ? 'active' : ''}`}
                onClick={() => {
                  document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                CONTACT
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      
      {/* Landing Section */}
      <div className="landing-section">
        <div className="landing-content">
          <img src={import.meta.env.BASE_URL + "/Image/temp_logo.png"} alt="Marco Arante Logo" className="landing-logo" />
          <h1 className="landing-title">
            Hello, I'm <span className="name-highlight">Marco</span>.<br />
            I'm an Information Systems Analyst.
          </h1>
          <button 
            className="landing-btn"
            onClick={() => document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' })}
          >
            More Info About Me ↓
          </button>
        </div>
      </div>

      {/* About Section */}
      <div id="about-section" className="hero-section">
        <Container>
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Hello! I'm Marco, a <span className="highlight">developer based in Philippines.</span>
              </h1>
              <p className="hero-description">
                I love building tools that are user-friendly, simple and delightful.
              </p>
              <p className="hero-description">
                I was a student at University of Santo Tomas (UST) where I spent 4 years learning the fundamentals 
                of Information Systems . I also worked at "blah"where my role 
                was ....
              </p>
              <p className="hero-description">
                Through these experiences, I had the opportunity to work with both small and large, 
                specialised and cross-functional teams across different time zones and developed a 
                working style that leans towards flexibility, clarity, and collaboration.
              </p>
              <p className="hero-description">
                I'm currently looking for a new role as a developer. Hire me?
              </p>
              <div className="hero-buttons">
                <button className="btn-linkedin">View LinkedIn</button>
                <a href="https://github.com/Netlopeds" target="_blank" rel="noopener noreferrer">
                  <button className="btn-github">View Github</button>
                </a>
              </div>
            </div>
            <div className="hero-image">
              <img src={import.meta.env.BASE_URL + "/Image/picture_homepage.png"} alt="Marco Arante" className="profile-image" />
            </div>
          </div>
        </Container>
      </div>

      {/* Projects Section */}
      <div id="projects-section" className="projects-section">
        <Container>
          <div className="projects-content">
            <h2 className="section-title">My Projects</h2>
            <div className="projects-grid">
              <div className="project-card">
                <div className="project-image">
                  <div className="project-placeholder">Project Image</div>
                </div>
                <div className="project-info">
                  <h3 className="project-title">Project One</h3>
                  <p className="project-description">
                    A web application built with React and Node.js that demonstrates 
                    full-stack development capabilities.
                  </p>
                  <div className="project-tech">
                    <span className="tech-tag">React</span>
                    <span className="tech-tag">Node.js</span>
                    <span className="tech-tag">MongoDB</span>
                  </div>
                  <div className="project-links">
                    <button className="btn-project">View Live</button>
                    <button className="btn-project-secondary">View Code</button>
                  </div>
                </div>
              </div>
              
              <div className="project-card">
                <div className="project-image">
                  <div className="project-placeholder">Project Image</div>
                </div>
                <div className="project-info">
                  <h3 className="project-title">Project Two</h3>
                  <p className="project-description">
                    A mobile-responsive dashboard for data visualization and analytics 
                    with interactive charts and reports.
                  </p>
                  <div className="project-tech">
                    <span className="tech-tag">Vue.js</span>
                    <span className="tech-tag">Python</span>
                    <span className="tech-tag">PostgreSQL</span>
                  </div>
                  <div className="project-links">
                    <button className="btn-project">View Live</button>
                    <button className="btn-project-secondary">View Code</button>
                  </div>
                </div>
              </div>
              
              <div className="project-card">
                <div className="project-image">
                  <div className="project-placeholder">Project Image</div>
                </div>
                <div className="project-info">
                  <h3 className="project-title">Project Three</h3>
                  <p className="project-description">
                    An e-commerce platform with payment integration and inventory 
                    management system.
                  </p>
                  <div className="project-tech">
                    <span className="tech-tag">Next.js</span>
                    <span className="tech-tag">Stripe</span>
                    <span className="tech-tag">MySQL</span>
                  </div>
                  <div className="project-links">
                    <button className="btn-project">View Live</button>
                    <button className="btn-project-secondary">View Code</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Contact Section - Footer Style */}
      <div id="contact-section" className="contact-footer">
        <Container>
          <div className="footer-content">
            <h2 className="footer-title">Contact Me Through These!</h2>
            <div className="footer-links">
              <a href="mailto:arante.marco14@gmail.com" className="footer-link">
                <div className="footer-icon email-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div className="footer-info">
                  <h4>Email</h4>
                  <span>arante.marco14@gmail.com</span>
                </div>
              </a>
              
              <a href="tel:+639155232123" className="footer-link">
                <div className="footer-icon phone-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div className="footer-info">
                  <h4>Phone</h4>
                  <span>+639155232123</span>
                </div>
              </a>
              
              <a href="https://facebook.com/marco.arante.1" target="_blank" rel="noopener noreferrer" className="footer-link">
                <div className="footer-icon facebook-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div className="footer-info">
                  <h4>Facebook</h4>
                  <span>facebook.com/marco.arante.1</span>
                </div>
              </a>
              
              <a href="https://github.com/Netlopeds" target="_blank" rel="noopener noreferrer" className="footer-link">
                <div className="footer-icon github-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div className="footer-info">
                  <h4>GitHub</h4>
                  <span>github.com/Netlopeds</span>
                </div>
              </a>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2025 Marco Arante. All rights reserved.</p>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default App