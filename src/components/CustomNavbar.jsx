import { Container, Nav, Navbar } from 'react-bootstrap';
import { playHoverSound } from '../utils/audioUtils';

const CustomNavbar = ({ scrollActiveSection }) => {
  return (
    <Navbar expand="lg" fixed="top" className="custom-navbar">
      <Container>
        <Navbar.Brand href="#home" className="custom-brand">
          <div className="brand-container">
            <img 
              src={import.meta.env.BASE_URL + "/Image/temp_logo.png"} 
              alt="Marco Arante Logo" 
              className="navbar-logo"
              onMouseEnter={playHoverSound}
            />
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
  );
};

export default CustomNavbar;
