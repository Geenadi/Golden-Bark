import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Ship, Leaf, Globe, Star, ChevronDown, Sprout } from 'lucide-react';
import './Home.css';
import sticksImage from '../assets/Ceylon_Cinnamon_Sticks.jpg';
import harvestImage from '../assets/Cinnamon_Harvest.jpg';
import cinnamonSticksImage from '../assets/cinnamon-2.jpg';



/* ---- Scroll Reveal ---- */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(el => {
        if (el.isIntersecting) el.target.classList.add('revealed');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const products = [
  { grade: 'Alba', tag: 'Ultra-thin Luxury', desc: 'The rarest and most prized grade. Exceptionally thin, 6–10 mm quills with light golden-brown colour, smooth surface, and a delicate, highly refined sweetness.', color: '#fff3cd', stars: 5 },
  { grade: 'C5 Special', tag: 'Continental — Premium', desc: 'Slightly thicker than Alba (10–12 mm), with very smooth texture and pale appearance. A powerful yet sweet aroma highly sought after by European markets.', color: '#f3e5d0', stars: 5 },
  { grade: 'C5', tag: 'Continental', desc: 'A premium Continental grade with authentic Ceylon cinnamon sweetness and aroma. Ideal for large-scale food production and export to international markets.', color: '#f3e5d0', stars: 4 },
  { grade: 'C4', tag: 'Continental — Popular', desc: 'Excellent quality at an accessible price. Quills of 13–15 mm diameter with sweet fragrance and smooth bark, perfect for high-end retail packaging.', color: '#ffe0b2', stars: 4 },
  { grade: 'H1', tag: 'Hamburg — Top Tier', desc: 'Significantly thicker quills (up to 23 mm), darker and sturdier. Prized for its robust, spicy flavour, ideal for traditional cooking and bold spice blends.', color: '#ffe0b2', stars: 3 },
  { grade: 'H2', tag: 'Hamburg — Economical', desc: 'Thicker, more fibrous than H1 with a rougher surface. Strong, authentic flavour makes it a staple for grinding into high-quality cinnamon powder.', color: '#ffe0b2', stars: 3 },
  { grade: 'M Grade', tag: 'Mexican', desc: 'Specifically popular in Latin American markets. Rougher texture with reddish-brown hue, known for a pungent, sharp aroma and bold, distinct taste.', color: '#f3e5d0', stars: 3 },
  { grade: 'Cinnamon Powder', tag: 'Ready to Use', desc: 'Finely ground from premium H1 & H2 material, delivering an instant, robust aromatic flavour ideal for bakeries, confectioneries, and retail spice jars.', color: '#ffe0b2', stars: 4 },
];



export default function Home() {
  useScrollReveal();
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="home">
      {/* ====== HERO ====== */}
      <section className="hero">
        <div className="hero-bg">
          <img
            src={sticksImage}
            alt="Ceylon Cinnamon"
            className="hero-bg-img"
            onLoad={() => setHeroLoaded(true)}
          />
          <div className="hero-overlay" />
        </div>

        <div className={`hero-content container ${heroLoaded ? 'hero-content--visible' : ''}`}>
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            <span>Sri Lanka's Finest Spice Exporter</span>
            <span className="hero-eyebrow-line" />
          </div>

          <h1 className="hero-title">
            The World's<br />
            <span className="text-gold">Finest Ceylon</span><br />
            Cinnamon
          </h1>

          <p className="hero-subtitle">
            From the lush green highlands of Sri Lanka, we bring you the authentic taste of
            true Ceylon cinnamon - pure, organic and ethically sourced since 2025.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="btn btn-gold">
              Explore Products <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Request a Sample
            </Link>
          </div>
        </div>

        <a href="#intro" className="hero-scroll-hint">
          <ChevronDown size={20} />
          <span>Scroll</span>
        </a>
      </section>



      {/* ====== INTRO ====== */}
      <section className="section" id="intro">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-images reveal">
              <img
                src={sticksImage}
                alt="Ceylon Cinnamon Sticks"
                className="intro-img intro-img-main"
              />
              <img
                src={harvestImage}
                alt="Cinnamon Harvest"
                className="intro-img intro-img-accent"
              />
              <div className="intro-badge glass">
                <Award size={22} color="var(--gold-500)" />
                <div>
                  <div className="intro-badge-title">Best Quality</div>
                  <div className="intro-badge-sub">Since 2025</div>
                </div>
              </div>
            </div>

            <div className="intro-text reveal" style={{ animationDelay: '0.2s' }}>
              <div className="section-tag">Our Heritage</div>
              <h2 className="section-title">
                The True Cinnamon<br />
                <span className="text-gold">From Sri Lanka</span>
              </h2>
              <div className="gold-divider" />
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: '16px' }}>
                Ceylon cinnamon — <em style={{ fontFamily: 'var(--font-elegant)', color: 'var(--text-primary)' }}>Cinnamomum verum</em> — is the only "true" cinnamon in the world.
                Unlike Cassia cinnamon, it is delicate, complex and naturally low in coumarin.
                Golden Bark Exports was officially registered in 2025, continuing a long family tradition of cinnamon cultivation with a modern commitment to global excellence.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: '32px' }}>
                We work directly with experienced peelers and farmers in Galle district,
                ensuring fair trade practices and the highest traceability from farm to shipment.
              </p>
              <div className="intro-features">
                {[
                  [Leaf, 'Farm to Export', '100% traceability from certified organic farms'],
                  [Award, 'Premium Quality', 'Graded, sorted and inspected by experts'],
                  [Ship, 'Global Logistics', 'Reliable export to many countries worldwide'],
                ].map(([Icon, title, desc], i) => (
                  <div className="intro-feature reveal" key={title} style={{ transitionDelay: `${i * 0.2}s` }}>
                    <div className="intro-feature-icon">
                      <Icon size={22} />
                    </div>
                    <div>
                      <div className="intro-feature-title">{title}</div>
                      <div className="intro-feature-desc">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn btn-outline" style={{ marginTop: '8px' }}>
                Our Story <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== PRODUCTS PREVIEW ====== */}
      <section className="section products-preview">
        <div className="container">
          <div className="reveal-left" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="section-tag" style={{ justifyContent: 'center' }}>Product Range</div>
            <h2 className="section-title">
              Our Finest <span className="text-gold">Cinnamon Grades</span>
            </h2>
            <div className="gold-divider" style={{ margin: '20px auto' }} />
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              We export six internationally recognised grades of Ceylon cinnamon sticks,
              each meeting the strictest quality standards.
            </p>
          </div>

          <div className="preview-scroll-container">
            <div className="preview-track">
              {/* Double the products for seamless infinite scroll */}
              {[...products, ...products, ...products].map((p, i) => (
                <div className="card preview-card" key={`${p.grade}-${i}`}>
                  <div className="preview-card-header">
                    <span className="badge">{p.tag}</span>
                    <span className="preview-grade">{p.grade}</span>
                  </div>
                  <h3 className="preview-card-title">{p.grade} {p.grade === 'Alba' ? 'Grade' : ''}</h3>
                  <p className="preview-card-desc">{p.desc}</p>
                  <div className="preview-stars">
                    {[...Array(p.stars || 4)].map((_, j) => (
                      <Star key={j} size={12} fill="var(--gold-500)" color="var(--gold-500)" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/products" className="btn btn-gold">
              View All 8 Grades <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ====== WHY CEYLON ====== */}
      <section className="section why-section">
        <div className="container">
          <div className="why-grid">
            <div className="reveal-left">
              <div className="section-tag">Why Ceylon Cinnamon?</div>
              <h2 className="section-title">
                Nature's Most<br /><span className="text-gold">Precious Spice</span>
              </h2>
              <div className="gold-divider" />
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: '32px' }}>
                Ceylon cinnamon has been treasured for millennia for its extraordinary flavour,
                fragrance, and health benefits. It is lower in coumarin, richer in essential oils,
                and infinitely more complex than any substitute.
              </p>
              <div className="why-points">
                {[
                  'Naturally low coumarin content - safe for daily use',
                  'Rich in cinnamaldehyde with powerful antioxidant properties',
                  'Delicate, sweet flavour that enhances both sweet and savoury dishes',
                  'Sustainably harvested using traditional Sri Lankan techniques',
                  'Supports hundreds of rural farming families across Sri Lanka',
                ].map((p, i) => (
                  <div className="why-point" key={i}>
                    <div className="why-point-dot" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="why-image-wrap reveal-right" style={{ transitionDelay: '0.2s' }}>
              <img
                src={cinnamonSticksImage}
                alt="Ceylon Cinnamon Close Up"
                className="why-image"
              />
              <div className="why-globe glass">
                <Sprout size={28} color="var(--gold-500)" />
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', background: 'var(--gold-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>100%</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>Natural</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ====== CTA ====== */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-box glass reveal">
            <div className="cta-ornament" />
            <div className="section-tag" style={{ justifyContent: 'center' }}>Start Exporting Today</div>
            <h2 className="section-title" style={{ textAlign: 'center' }}>
              Ready to Partner With <span className="text-gold">Golden Bark?</span>
            </h2>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.8 }}>
              Contact us today to request samples, get pricing, or learn more about our export capabilities and certification documentation.
            </p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <Link to="/contact" className="btn btn-gold">
                Contact Us Now <ArrowRight size={16} />
              </Link>
              <Link to="/products" className="btn btn-outline">
                View Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
