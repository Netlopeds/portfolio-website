import { useState, useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { playHoverSound } from '../utils/audioUtils';

const CustomNavbar = ({ sections, scrollActiveSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Compact the navbar once the page is scrolled
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar expand="lg" fixed="top" collapseOnSelect className={`custom-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <Container>
        <Navbar.Brand href="#landing-section" className="custom-brand">
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
          <Nav className="ms-auto custom-nav" activeKey={scrollActiveSection}>
            {sections.map(({ id, label }) => (
              <Nav.Link key={id} href={`#${id}`} eventKey={id} className="custom-nav-link">
                {label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
