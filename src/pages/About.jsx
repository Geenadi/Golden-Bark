import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Heart, Users, Sprout, Award } from 'lucide-react';
import './About.css';
import backgroundHero from '../assets/backgrd.jpg';
import peelersImage from '../assets/cinnamon_peelers.png';
import cinnamonWithLeavesImage from '../assets/cinnamon-with-leaves.jpg';

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(el => { if (el.isIntersecting) el.target.classList.add('revealed'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const timeline = [
  { year: '2025', title: 'Official Registration', desc: 'Golden Bark Exports Pvt Ltd was officially incorporated, marking the beginning of our journey to formalise Sri Lanka\'s cinnamon export sector.' },
  { year: '2025', title: 'Global Operations', desc: 'Established our primary export hub in Ambalangoda.'},
  { year: '2025', title: 'Network Expansion', desc: 'Consolidated our network of traditional partner farms across Galle district.' },
  { year: 'Future', title: 'Global Leadership', desc: 'Aiming to become the most trusted name in Ceylon cinnamon, setting new standards for quality and ethical trade.' },
];

const values = [
  { Icon: Award, title: 'Uncompromising Quality', desc: 'Every batch of cinnamon is meticulously graded, inspected, and tested before export. We accept nothing less than excellence.' },
  { Icon: Heart, title: 'Ethical Sourcing', desc: 'We build long-term relationships with farming families, ensuring fair wages and sustainable harvesting practices.' },
  { Icon: Sprout, title: 'Sustainability First', desc: 'Our operations are designed to protect Sri Lanka\'s biodiversity and support regenerative agricultural practices.' },
  { Icon: Users, title: 'Community Impact', desc: 'We invest in the communities we source from — supporting education, healthcare, and infrastructure in rural areas.' },
];

export default function About() {
  useScrollReveal();

  return (
    <div className="about-page">
      {/* ---- Page Hero ---- */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img
            src={backgroundHero}
            alt="Cinnamon Farm Sri Lanka"
            className="page-hero-img"
          />
          <div className="page-hero-overlay" />
        </div>
        <div className="container page-hero-content">
          <div className="section-tag" style={{ color: 'var(--gold-400)' }}>Our Story</div>
          <h1 className="page-hero-title">
            Crafting <span className="text-gold">Excellence</span><br />Since 2025
          </h1>
          <p className="page-hero-sub">
            A new chapter in Ceylon cinnamon — blending generations of traditional farming wisdom with modern export excellence to bring the world's finest spice to your doorstep.
          </p>
        </div>
      </section>

      {/* ---- Story ---- */}
      <section className="section">
        <div className="container">
          <div className="about-story-grid">
            <div className="reveal">
              <div className="section-tag">Who We Are</div>
              <h2 className="section-title">
                A Legacy Built on<br /><span className="text-gold">True Cinnamon</span>
              </h2>
              <div className="gold-divider" />
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: '20px' }}>
                Golden Bark Exports Pvt Ltd was registered in 2025 with a clear mission: to 
                bring professional export standards to the traditional Ceylon cinnamon trade. 
                While the company is a new entity, our roots run deep in the Galle district, 
                where our team has been part of the cinnamon-growing community for generations.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: '20px' }}>
                Today, we partner with hundreds of skilled cinnamon peelers across the Southern and 
                Western provinces — artisans who have practiced their craft for generations. This human 
                element is at the core of everything we do.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: '36px' }}>
                We are not just an exporter. We are custodians of Sri Lanka's most celebrated botanical 
                heritage, and we take that responsibility seriously in every shipment we send.
              </p>
              <Link to="/contact" className="btn btn-gold">
                Partner With Us <ArrowRight size={16} />
              </Link>
            </div>

            <div className="about-story-images reveal" style={{ animationDelay: '0.2s' }}>
              <img
                src={peelersImage}
                alt="Cinnamon Peelers Sri Lanka"
                className="about-img-main"
              />
              <img
                src={cinnamonWithLeavesImage}
                alt="Ceylon Cinnamon Sticks"
                className="about-img-accent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---- Mission & Vision ---- */}
      <section className="section mv-section">
        <div className="container">
          <div className="mv-grid">
            <div className="card mv-card reveal">
              <div className="mv-icon">
                <Target size={28} color="var(--gold-500)" />
              </div>
              <h3 className="mv-title">Our Mission</h3>
              <div className="gold-divider" />
              <p className="mv-text">
                To deliver the world's finest Ceylon cinnamon with uncompromising quality, 
                complete traceability, and a deep commitment to ethical sourcing — creating 
                lasting value for our partners, our farmers, and the planet.
              </p>
            </div>
            <div className="card mv-card reveal" style={{ animationDelay: '0.15s' }}>
              <div className="mv-icon">
                <Eye size={28} color="var(--gold-500)" />
              </div>
              <h3 className="mv-title">Our Vision</h3>
              <div className="gold-divider" />
              <p className="mv-text">
                To be the world's most trusted and recognised Ceylon cinnamon brand — championing 
                Sri Lankan agricultural heritage, empowering rural communities, and setting the 
                global standard for premium spice exports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Timeline ---- */}
      <section className="section timeline-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="section-tag" style={{ justifyContent: 'center' }}>Our Journey</div>
            <h2 className="section-title">
              Our Journey to <span className="text-gold">Excellence</span>
            </h2>
            <div className="gold-divider" style={{ margin: '20px auto' }} />
          </div>

          <div className="timeline">
            {timeline.map((item, i) => (
              <div className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'} reveal`} key={item.year} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="timeline-dot" />
                <div className="card timeline-card">
                  <div className="timeline-year text-gold">{item.year}</div>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              </div>
            ))}
            <div className="timeline-line" />
          </div>
        </div>
      </section>

      {/* ---- Values ---- */}
      <section className="section values-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="section-tag" style={{ justifyContent: 'center' }}>What We Stand For</div>
            <h2 className="section-title">
              Our Core <span className="text-gold">Values</span>
            </h2>
            <div className="gold-divider" style={{ margin: '20px auto' }} />
          </div>

          <div className="values-grid">
            {values.map((v, i) => (
              <div className="card values-card reveal" key={v.title} style={{ animationDelay: `${i * 0.12}s` }}>
                <div className="values-icon">
                  <v.Icon size={24} color="var(--gold-500)" />
                </div>
                <h3 className="values-title">{v.title}</h3>
                <p className="values-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="section" style={{ background: 'var(--dark-950)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="reveal">
            <div className="section-tag" style={{ justifyContent: 'center' }}>Get in Touch</div>
            <h2 className="section-title">
              Let's Build Something <span className="text-gold">Great Together</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '16px auto 36px', lineHeight: 1.8 }}>
              Whether you're a retailer, distributor, or brand looking for the finest Ceylon cinnamon, we'd love to hear from you.
            </p>
            <Link to="/contact" className="btn btn-gold">
              Contact Our Export Team <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
