import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Globe, Share2, MessageCircle, Users, ChevronRight, ChevronDown, MessageSquare } from 'lucide-react';
import './index.css';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';

/* =========================================
   CUSTOM CURSOR
========================================= */
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
      if (ringRef.current) {
        ringRef.current.style.left = e.clientX + 'px';
        ringRef.current.style.top = e.clientY + 'px';
      }
    };

    const addHover = () => ringRef.current?.classList.add('hovered');
    const removeHover = () => ringRef.current?.classList.remove('hovered');

    document.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, .card, input, textarea, select').forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => document.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}

/* =========================================
   NAVBAR
========================================= */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/products', label: 'Products' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <img src="/Logo-01.png" alt="Golden Bark Logo" onError={(e) => { e.target.style.display='none'; }} />
            <div className="navbar-logo-text">
              <span className="navbar-logo-name">Golden Bark</span>
              <span className="navbar-logo-sub">Exports Pvt Ltd</span>
            </div>
          </Link>

          <div className="navbar-nav">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn btn-gold navbar-cta">Get a Quote</Link>
          </div>

          <button className="navbar-hamburger" onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
            {mobileOpen ? <X size={22} color="var(--gold-500)" /> : (
              <>
                <span /><span /><span />
              </>
            )}
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}
        <Link to="/contact" className="btn btn-gold" onClick={() => setMobileOpen(false)}>Get a Quote</Link>
      </div>
    </>
  );
}

/* =========================================
   FOOTER
========================================= */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <img src="/Logo-01.png" alt="Golden Bark" className="footer-brand-logo" onError={(e) => { e.target.style.display='none'; }} />
            <p className="footer-brand-desc">
              Golden Bark Exports Pvt Ltd is a premium Ceylon cinnamon exporter committed to delivering the finest quality spices from the heart of Sri Lanka to the world.
            </p>
            <div className="footer-social">
              {[Globe, Share2, MessageCircle, Users].map((Icon, i) => (
                <a key={i} href="#" className="footer-social-link" aria-label="Social">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              {[['/', 'Home'], ['/about', 'About Us'], ['/products', 'Our Products'], ['/contact', 'Contact Us']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="footer-link">
                    <ChevronRight size={12} /> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="footer-col-title">Our Products</h4>
            <ul className="footer-links">
              {['Alba Grade', 'H1 Grade', 'H2 Grade', 'C4 Grade', 'C5 Grade', 'Cinnamon Powder'].map(p => (
                <li key={p}>
                  <Link to="/products" className="footer-link">
                    <ChevronRight size={12} /> {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer-col-title">Contact Us</h4>
            <div>
              <div className="footer-contact-item">
                <MapPin size={16} className="footer-contact-icon" />
                <span className="footer-contact-text">125/A, Thalgasgoda,<br />Ambalangoda, Sri Lanka</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={16} className="footer-contact-icon" />
                <span className="footer-contact-text">+94 70 693 5553</span>
              </div>
              <div className="footer-contact-item">
                <Mail size={16} className="footer-contact-icon" />
                <span className="footer-contact-text">goldenbarkexport@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} Golden Bark Exports Pvt Ltd. All rights reserved.
          </p>
          <div className="footer-cert">
            <span className="footer-cert-badge">Organic</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =========================================
   LAYOUT
========================================= */
function Layout({ children }) {
  return (
    <div className="page-enter">
      <Navbar />
      <main>{children}</main>
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/94706935553" 
        className="whatsapp-float" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={24} />
        <span className="whatsapp-tooltip">Chat with us!</span>
      </a>
    </div>
  );
}

/* =========================================
   APP
========================================= */
export default function App() {
  return (
    <Router>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/products" element={<Layout><Products /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
      </Routes>
    </Router>
  );
}
