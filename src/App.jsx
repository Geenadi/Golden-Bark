import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Globe, Share2, MessageCircle, Users, ChevronRight, ChevronDown, MessageSquare } from 'lucide-react';
import './index.css';

/* =========================================
   GOLD PARTICLE CANVAS
========================================= */
function GoldParticles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const GOLD = ['rgba(201,168,76,0.9)', 'rgba(255,215,0,0.8)', 'rgba(184,134,11,0.7)', 'rgba(255,224,130,0.6)'];
    const particles = Array.from({ length: 55 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.4 + 0.3,
      speedY: -(Math.random() * 0.28 + 0.06),
      phase: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.4 + 0.1,
      color: GOLD[i % GOLD.length],
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = Date.now() * 0.001;
      particles.forEach(p => {
        p.y += p.speedY;
        p.x += Math.sin(t * 0.6 + p.phase) * 0.18;
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
        const alpha = p.opacity * (0.5 + 0.5 * Math.sin(t * 0.8 + p.phase));
        ctx.save();
        ctx.globalAlpha = alpha * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="gold-particles-canvas" />;
}

/* =========================================
   SCROLL PROGRESS BAR
========================================= */
function ScrollProgressBar() {
  const barRef = useRef(null);
  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      if (barRef.current) barRef.current.style.width = pct + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <div className="scroll-progress" ref={barRef} />;
}

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';

/* =========================================
   CUSTOM CURSOR + SPARKLE TRAIL
========================================= */
function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const lastTrail = useRef(0);

  useEffect(() => {
    let reqId;
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Sparkle trail
      const now = Date.now();
      if (now - lastTrail.current > 55) {
        lastTrail.current = now;
        const sz = Math.random() * 3 + 2;
        const spark = document.createElement('div');
        spark.className = 'cursor-trail';
        spark.style.cssText = `left:${mouseX}px;top:${mouseY}px;width:${sz}px;height:${sz}px;`;
        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 750);
      }
    };

    const updatePosition = () => {
      const speed = 0.2;
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      reqId = requestAnimationFrame(updatePosition);
    };

    const addHover = () => dotRef.current?.classList.add('hovered');
    const removeHover = () => dotRef.current?.classList.remove('hovered');

    document.addEventListener('mousemove', move);
    reqId = requestAnimationFrame(updatePosition);

    const interactiveEls = document.querySelectorAll('a, button, .card, input, textarea, select');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(reqId);
      interactiveEls.forEach(el => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, []);

  return (
    <div className="custom-cursor" ref={cursorRef}>
      <div className="cursor-dot" ref={dotRef} />
    </div>
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
            <img src="/Logo-01.png" alt="Golden Bark Logo" onError={(e) => { e.target.style.display = 'none'; }} />
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
            <img src="/favicon.png" alt="Golden Bark" className="footer-brand-logo" onError={(e) => { e.target.style.display = 'none'; }} />
            <p className="footer-brand-desc">
              Golden Bark Exports Pvt Ltd is a premium Ceylon cinnamon exporter committed to delivering the finest quality spices from the heart of Sri Lanka to the world.
            </p>
            <div className="footer-social">
              <a href="https://www.facebook.com/share/1Dz9YGvnmU/?mibextid=wwXIfr" className="footer-social-link" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="footer-social-link" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="footer-social-link" aria-label="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
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
              {['Alba', 'C4/C5', 'H1/H2', 'M', 'Powder'].map(p => (
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
      <GoldParticles />
      <ScrollProgressBar />
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
