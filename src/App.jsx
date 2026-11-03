import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import CustomNavbar from './components/CustomNavbar';
import {
  playHoverSound,
  playClickSound,
  playHuhSound,
  playResetSound,
  playUnaSound,
  playNameHover
} from './utils/audioUtils';

const LINKEDIN_URL = 'https://www.linkedin.com/in/marco-arante/';
const GITHUB_URL = 'https://github.com/Netlopeds';
const CV_URL = import.meta.env.BASE_URL + 'Arante_Marco_Resume.pdf';

const sections = [
  { id: 'landing-section', label: 'Home' },
  { id: 'about-section', label: 'About' },
  { id: 'projects-section', label: 'Projects' },
  { id: 'certifications-section', label: 'Certifications' },
  { id: 'contact-section', label: 'Contact' }
];

const skillGroups = [
  { title: 'Data & Analytics', items: ['SQL', 'Python', 'Data Analysis', 'Business Analysis', 'Power BI', 'Prophet', 'Databricks'] },
  { title: 'Frontend & Design', items: ['React', 'TypeScript', 'Vue.js', 'UI/UX Design', 'Figma', 'Canva'] },
  { title: 'Backend & Databases', items: ['Node.js', 'PHP', 'Java', 'Supabase', 'MySQL', 'PostgreSQL'] },
  { title: 'Tools & Workflow', items: ['Git/GitHub', 'Jira', 'Miro', 'Agile/Scrum'] }
];

const projects = [
  {
    title: 'Demand Forecasting & Prescriptive Inventory Dashboard (USTore)',
    role: 'Developer',
    period: 'Jan 2026 - Nov 2026',
    points: [
      'Built a demand forecasting and prescriptive inventory management system for the University of Santo Tomas Store (USTore).',
      'Replaced paper-based sales records with a digital tallying interface, and implemented FSN analysis, demand forecasting, and Reorder Point/EOQ modules powering real-time stock alerts and automated monthly sales reports.'
    ],
    tech: ['Python', 'Prophet', 'PostgreSQL', 'Power BI']
  },
  {
    title: "Goat2Go: Tatuns Restaurant's Management System",
    role: 'Developer',
    period: 'Aug 2025 - May 2026',
    points: [
      'Architected and deployed a full-stack management system to streamline restaurant operations and data persistence.',
      'Developed a centralized dashboard with real-time business analytics to monitor KPIs and operational efficiency.'
    ],
    tech: ['Vite', 'React', 'Supabase']
  },
  {
    title: 'BayaniHub',
    role: 'Developer',
    period: 'Mar 2026 - May 2026',
    points: [
      'Developed scalable backend services and API integrations to support core platform functionalities.',
      'Refined frontend UI/UX components, improving responsive design and cross-browser compatibility.'
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'Supabase']
  },
  {
    title: 'Damayan',
    role: 'Chapter Lead',
    period: 'Feb 2026 - Mar 2026',
    points: [
      'Led the agile development lifecycle during Sprint 0 and Sprint 1, coordinating task distribution and milestone tracking.',
      "Architected the system's Call Flow Diagram, mapping logic paths and user interaction sequences to guide development."
    ],
    tech: ['Agile', 'Jira', 'Miro']
  },
  {
    title: 'Gambz Laundromat',
    role: 'Lead Developer',
    period: 'Oct 2025 - Dec 2025',
    points: [
      'Led the end-to-end development of a full-stack laundromat management system.',
      'Implemented transaction processing, customer management, and real-time service tracking modules.'
    ],
    tech: ['Vue.js', 'Node.js', 'MySQL']
  }
];

const certifications = [
  { name: 'Introduction to Data Analytics', issuer: 'IBM', logo: 'ibm.svg' },
  { name: 'AI/BI for Data Analysts', issuer: 'Databricks', logo: 'databricks.jpg' },
  { name: 'SQL Analytics on Databricks', issuer: 'Databricks', logo: 'databricks.jpg' },
  { name: 'SQL Intermediate', issuer: 'Sololearn', logo: 'solo.png' },
  { name: 'Introduction to SQL', issuer: 'Sololearn', logo: 'solo.png' },
  { name: 'IT for Business Success', issuer: 'HP LIFE', logo: 'hplife.png' }
];

function App() {
  const [scrollActiveSection, setScrollActiveSection] = useState('landing-section');
  const [patCount, setPatCount] = useState(0);
  const [logoScale, setLogoScale] = useState(1);

  // Handle logo patting
  const handleLogoPat = () => {
    setPatCount(prev => prev + 1);
    setLogoScale(prev => prev + 0.1); // Remove max scale limit - let it grow infinitely!
    playHoverSound(); // Play sound on each pat
  };

  // Reset pat counter and logo size
  const resetPats = () => {
    playResetSound(); // Play reset sound first
    setPatCount(0);
    setLogoScale(1);
  };

  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollTop = window.scrollY;
        const navbarHeight = 100;
        const atBottom = window.innerHeight + scrollTop >= document.documentElement.scrollHeight - 2;
        // The last section can be shorter than the viewport, so treat the page bottom as reaching it
        let newActiveSection = sections[0].id;
        if (atBottom) {
          newActiveSection = sections[sections.length - 1].id;
        } else {
          for (const { id } of sections) {
            const section = document.getElementById(id);
            if (section && scrollTop >= section.offsetTop - navbarHeight) newActiveSection = id;
          }
        }
        setScrollActiveSection(newActiveSection);
      }, 100); // 100ms debounce
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  // Fade elements in as they scroll into view
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <CustomNavbar sections={sections} scrollActiveSection={scrollActiveSection} />

      {/* Landing Section */}
      <section id="landing-section" className="landing-section">
        <div className="landing-content reveal">
          <div className="logo-pat-container">
            <img
              src={import.meta.env.BASE_URL + "/Image/temp_logo.png"}
              alt="Marco Arante Logo"
              className="landing-logo"
              onMouseEnter={playUnaSound}
              onClick={handleLogoPat}
              style={{
                transform: `scale(${logoScale})`,
                cursor: 'pointer',
                transition: 'transform 0.3s ease'
              }}
            />
            {patCount > 0 && (
              <div className="pat-counter">
                <span className="pat-text">Usagi pats: {patCount}</span>
                <button
                  className="reset-btn"
                  onClick={resetPats}
                  title="Reset pats"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
          <h1 className="landing-title">
            Hello, I'm <span className="name-highlight" onMouseEnter={playNameHover}>Marco</span><br />
            I'm a <span className="name-highlight" onMouseEnter={playNameHover}>Data Analyst & Frontend Developer.</span>
          </h1>
          <p className="landing-subtitle">
            Information Systems student at UST specializing in Business Analytics. I turn data into
            insights and ideas into user-friendly web experiences.
          </p>
          <div className="landing-actions">
            <button
              className="landing-btn"
              onClick={() => {
                playClickSound();
                document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              More Info About Me ↓
            </button>
            <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="landing-btn-secondary">
              View Resume
            </a>
          </div>
        </div>
        <button
          className="scroll-indicator"
          aria-label="Scroll to About section"
          onClick={() => {
            playClickSound();
            document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="scroll-mouse"><span className="scroll-wheel"></span></span>
          <span className="scroll-text">Scroll</span>
        </button>
      </section>

      {/* About Section */}
      <section id="about-section" className="hero-section">
        <Container>
          <div className="hero-content">
            <div className="hero-text reveal">
              <span className="section-eyebrow">About Me</span>
              <h2 className="hero-title">
                Hello! I'm Marco, a <span className="highlight">Data Analyst & Frontend Developer based in the Philippines.</span>
              </h2>
              <p className="hero-description">
                I am a passionate analyst and developer focused on turning business needs into practical, data-driven solutions.
                I'm skilled in SQL, Python, and data analysis, and I love building dashboards and websites that are creative, user-friendly, and visually appealing.
              </p>
              <p className="hero-description">
                I'm currently studying at the University of Santo Tomas (UST), taking up Information Systems with a
                specialization in Business Analytics, and I've been a Consistent Dean's Lister for 6 Terms. I've also
                earned credentials from IBM and Databricks, and I'm expected to graduate in June 2027.
              </p>
              <p className="hero-description">
                Through school projects and my time as a Marshal for the Thomasian Gaming Society, I've worked as a developer,
                lead developer, and chapter lead on cross-functional teams, building everything from restaurant and laundromat
                management systems to a demand forecasting dashboard for the USTore. These experiences shaped a working style
                that leans towards flexibility, clarity, and collaboration.
              </p>
              <p className="hero-description">
                I'm currently looking for opportunities as a data analyst or frontend developer, and I'm eager to learn from industry professionals. Want to hire me?
              </p>
              <div className="hero-stats">
                <div className="stat-card">
                  <span className="stat-value">6</span>
                  <span className="stat-label">Terms as Dean's Lister</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{projects.length}</span>
                  <span className="stat-label">Projects built</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{certifications.length}</span>
                  <span className="stat-label">Certifications earned</span>
                </div>
              </div>
              <div className="hero-buttons">
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="btn-linkedin">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  View LinkedIn
                </a>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn-github">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View Github
                </a>
                <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="btn-cv">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                  View my Resume/CV
                </a>
              </div>
            </div>
            <div className="hero-image reveal">
              <div className="profile-frame">
                <img
                  src={import.meta.env.BASE_URL + "/Image/website.jpg"}
                  alt="Marco Arante"
                  className="profile-image"
                  onClick={playHuhSound}
                />
              </div>
            </div>
          </div>

          <div className="skills reveal">
            <h3 className="skills-title">Skills & Tools</h3>
            <div className="skills-grid">
              {skillGroups.map((group) => (
                <div className="skill-group" key={group.title}>
                  <h4>{group.title}</h4>
                  <ul className="skill-list">
                    {group.items.map((item) => (
                      <li className="skill-chip" key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Projects Section */}
      <section id="projects-section" className="projects-section">
        <Container>
          <div className="section-heading reveal">
            <span className="section-eyebrow">Projects & Experience</span>
            <h2 className="section-title">My Projects</h2>
            <p className="section-subtitle">
              From forecasting dashboards to full-stack management systems, here's what I've built and led.
            </p>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <article
                className={`project-card reveal ${index === 0 ? 'featured' : ''}`}
                key={project.title}
                style={{ '--reveal-delay': `${index * 80}ms` }}
              >
                <div className="project-info">
                  <div className="project-meta">
                    <span className="project-role">{project.role}</span>
                    <span className="project-period">{project.period}</span>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <ul className="project-description">
                    {project.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <div className="project-tech">
                    {project.tech.map((tech) => (
                      <span className="tech-tag" key={tech}>{tech}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Licenses & Certifications Section */}
      <section id="certifications-section" className="certifications-section">
        <Container>
          <div className="section-heading reveal">
            <span className="section-eyebrow">Credentials</span>
            <h2 className="section-title">Licenses & Certifications</h2>
            <p className="section-subtitle">
              Continuous learning in data analytics, SQL, and business technology.
            </p>
          </div>
          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <div
                className="certification-card reveal"
                key={cert.name}
                style={{ '--reveal-delay': `${index * 60}ms` }}
              >
                <img
                  src={import.meta.env.BASE_URL + "/Image/certs/" + cert.logo}
                  alt={`${cert.issuer} logo`}
                  className="certification-logo"
                  loading="lazy"
                />
                <div>
                  <h3 className="certification-name">{cert.name}</h3>
                  <span className="certification-issuer">{cert.issuer}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact Section - Footer Style */}
      <section id="contact-section" className="contact-footer">
        <Container>
          <div className="footer-content">
            <div className="section-heading reveal">
              <span className="section-eyebrow">Contact</span>
              <h2 className="section-title">Let's work together!</h2>
              <p className="section-subtitle">
                I'm open to opportunities as a data analyst or frontend developer. Reach out through any of these!
              </p>
            </div>
            <div className="footer-links reveal">
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

              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="footer-link">
                <div className="footer-icon linkedin-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div className="footer-info">
                  <h4>LinkedIn</h4>
                  <span>in/marco-arante</span>
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

              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="footer-link">
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
              <a href="#landing-section" className="back-to-top">Back to top ↑</a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default App
