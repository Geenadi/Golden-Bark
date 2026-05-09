import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Package, Star, CheckCircle, X } from 'lucide-react';
import './Products.css';

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(el => { if (el.isIntersecting) el.target.classList.add('revealed'); });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const grades = [
  {
    id: 'alba',
    name: 'Alba',
    subtitle: 'Ultra-thin Luxury',
    tag: 'Rarest Grade',
    stars: 5,
    desc: 'Alba is the most prized and rarest grade of Ceylon cinnamon. Recognised by its extraordinarily thin and delicate bark, it possesses an unrivalled sweetness and complexity of aroma. A favourite among Michelin-starred restaurants and artisan chocolatiers worldwide.',
    color: '#FFD700',
    thickness: '< 1mm bark',
    origin: 'Matara District, Sri Lanka',
    highlights: [
      'Thinnest, most delicate quills',
      'Exceptional sweetness and floral aroma',
      'Naturally high essential oil content',
      'Hand-selected by master peelers',
      'Premium retail & foodservice',
    ],
    image: 'https://images.unsplash.com/photo-1588277759339-05d459f0714e?w=700&q=80&auto=format',
  },
  {
    id: 'c5',
    name: 'C5',
    subtitle: 'Export Quality',
    tag: 'Volume Grade',
    stars: 4,
    desc: 'C5 grade is a dependable, export-quality cinnamon ideal for large-scale food production and branded retail. It retains the authentic Ceylon cinnamon character at a highly accessible price point.',
    color: '#C9A84C',
    thickness: '4–5mm bark',
    origin: 'Western Province, Sri Lanka',
    highlights: [
      'Industry-standard export quality',
      'Good flavour for food processing',
      'Available in large-volume shipments',
      'Consistent moisture content',
      'SLS approved and tested',
    ],
    image: 'https://images.unsplash.com/photo-1596040033229-a9821eec058b?w=700&q=80&auto=format',
  },
  {
    id: 'c4',
    name: 'C4',
    subtitle: 'Export Quality',
    tag: 'Popular Export',
    stars: 4,
    desc: 'C4 is a widely exported commercial grade, known for its reliability, consistent quality, and broad usability. It serves as the backbone of our export volumes and is trusted by major food manufacturers globally.',
    color: '#A0742A',
    thickness: '3–4mm bark',
    origin: 'Southern Province, Sri Lanka',
    highlights: [
      'Reliable, consistent quality',
      'Suitable for large-scale food processing',
      'Broader quill diameter',
      'Cost-effective for bulk orders',
      'Available in 25kg, 50kg sacks',
    ],
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=700&q=80&auto=format',
  },
  {
    id: 'h1',
    name: 'H1',
    subtitle: 'Industrial / Powder-grade Material',
    tag: 'Industrial',
    stars: 3,
    desc: 'H1 is an industrial-grade material commonly used for powder production. It offers a strong, aromatic flavour profile perfect for high-end spice blends, artisan beverages, and specialty food brands.',
    color: '#B8860B',
    thickness: '1–2mm bark',
    origin: 'Galle District, Sri Lanka',
    highlights: [
      'Strong, aromatic flavour profile',
      'High cinnamaldehyde content',
      'Ideal for powder grinding',
      'Cost-effective for industrial use',
      'Available in bulk shipments',
    ],
    image: 'https://images.unsplash.com/photo-1578900436920-2aa4cc7e5fd6?w=700&q=80&auto=format',
  },
  {
    id: 'h2',
    name: 'H2',
    subtitle: 'Industrial / Powder-grade Material',
    tag: 'Industrial',
    stars: 3,
    desc: 'H2 grade offers a fuller quill and robust flavour. It is a highly versatile industrial-grade material used by specialty spice brands and premium packaged food companies for large-scale powder grinding.',
    color: '#8B6914',
    thickness: '2–3mm bark',
    origin: 'Kalutara District, Sri Lanka',
    highlights: [
      'Robust and strong flavour profile',
      'Excellent for bulk powder production',
      'Good essential oil retention',
      'Cost-efficient bulk pricing',
      'Premium bulk packaging available',
    ],
    image: 'https://images.unsplash.com/photo-1561406636-b80293969660?w=700&q=80&auto=format',
  },
  {
    id: 'powder',
    name: 'Cinnamon Powder',
    subtitle: 'Premium Grade Powder',
    tag: 'Ready to Use',
    stars: 4,
    desc: 'Our finely ground Ceylon cinnamon powder is made from premium H1 and H2 industrial-grade materials. Perfect for bakeries, confectioneries, and retail spice jars, delivering instant robust flavour.',
    color: '#C9A84C',
    thickness: 'Fine Powder',
    origin: 'Southern & Western Provinces',
    highlights: [
      'Finely ground for immediate use',
      'Robust, aromatic flavour',
      'Perfect for baking and industrial use',
      'Consistent particle size',
      'Available in bulk and retail packs',
    ],
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=700&q=80&auto=format',
  },
];

function GradeModal({ grade, onClose }) {
  if (!grade) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box glass" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>
        <div className="modal-grid">
          <img src={grade.image} alt={grade.name} className="modal-img" />
          <div className="modal-content">
            <span className="badge">{grade.tag}</span>
            <h2 className="modal-title">
              {grade.name} Grade
              <span style={{ fontSize: '0.7em', opacity: 0.6, display: 'block', fontFamily: 'var(--font-body)', fontWeight: 400, letterSpacing: '2px', marginTop: '4px' }}>{grade.subtitle}</span>
            </h2>
            <div style={{ display: 'flex', gap: '4px', margin: '8px 0 16px' }}>
              {[...Array(grade.stars)].map((_, i) => (
                <Star key={i} size={14} fill="var(--gold-500)" color="var(--gold-500)" />
              ))}
              {[...Array(5 - grade.stars)].map((_, i) => (
                <Star key={i} size={14} color="var(--dark-400)" />
              ))}
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: '24px' }}>{grade.desc}</p>
            <div className="modal-specs">
              <div className="modal-spec">
                <span className="modal-spec-label">Bark Thickness</span>
                <span className="modal-spec-val">{grade.thickness}</span>
              </div>
              <div className="modal-spec">
                <span className="modal-spec-label">Origin</span>
                <span className="modal-spec-val">{grade.origin}</span>
              </div>
            </div>
            <ul className="modal-highlights">
              {grade.highlights.map(h => (
                <li key={h}>
                  <CheckCircle size={15} color="var(--gold-500)" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn btn-gold" style={{ marginTop: '24px' }} onClick={onClose}>
              Request This Grade <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  useScrollReveal();
  const [activeGrade, setActiveGrade] = useState(null);

  return (
    <div className="products-page">
      {/* ---- Page Hero ---- */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1578900436920-2aa4cc7e5fd6?w=1600&q=80&auto=format"
            alt="Ceylon Cinnamon Products"
            className="page-hero-img"
          />
          <div className="page-hero-overlay" />
        </div>
        <div className="container page-hero-content">
          <div className="section-tag" style={{ color: 'var(--gold-400)' }}>Our Products</div>
          <h1 className="page-hero-title">
            Six <span className="text-gold">Exceptional</span><br />Cinnamon Grades
          </h1>
          <p className="page-hero-sub">
            From the ultra-premium Alba to the reliable C5, every grade we export 
            meets the highest international standards of quality and purity.
          </p>
        </div>
      </section>

      {/* ---- Grades Overview ---- */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div className="section-tag" style={{ justifyContent: 'center' }}>Product Catalogue</div>
            <h2 className="section-title">
              Choose Your <span className="text-gold">Perfect Grade</span>
            </h2>
            <div className="gold-divider" style={{ margin: '20px auto' }} />
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Click on any grade card to explore its full profile, specifications, and ideal applications.
            </p>
          </div>

          <div className="grades-grid" style={{ marginTop: '60px' }}>
            {grades.map((g, i) => (
              <div
                className="card grade-card reveal"
                key={g.id}
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => setActiveGrade(g)}
              >
                <div className="grade-card-img-wrap">
                  <img src={g.image} alt={g.name} className="grade-card-img" />
                  <div className="grade-card-img-overlay" />
                  <span className="badge grade-card-badge">{g.tag}</span>
                </div>
                <div className="grade-card-body">
                  <div className="grade-card-header">
                    <div>
                      <div className="grade-card-name" style={{ color: g.color }}>{g.name}</div>
                      <div className="grade-card-sub">{g.subtitle}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(g.stars)].map((_, j) => (
                        <Star key={j} size={12} fill="var(--gold-500)" color="var(--gold-500)" />
                      ))}
                    </div>
                  </div>
                  <p className="grade-card-desc">{g.desc.slice(0, 110)}...</p>
                  <div className="grade-card-meta">
                    <span>{g.thickness}</span>
                    <span className="grade-card-view">View Details →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Comparison Table ---- */}
      <section className="section compare-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="section-tag" style={{ justifyContent: 'center' }}>Grade Comparison</div>
            <h2 className="section-title">
              <span className="text-gold">Compare</span> Our Grades
            </h2>
            <div className="gold-divider" style={{ margin: '20px auto' }} />
          </div>

          <div className="compare-table-wrap reveal">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Grade</th>
                  <th>Quality Tier</th>
                  <th>Bark Thickness</th>
                  <th>Best For</th>
                  <th>Availability</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Alba', 'Ultra-thin Luxury', '< 1mm', 'Luxury retail, fine dining', 'Limited'],
                  ['C5', 'Export Quality', '4–5mm', 'Large-scale manufacturing', 'High Volume'],
                  ['C4', 'Export Quality', '3–4mm', 'Industrial food processing', 'High Volume'],
                  ['H1', 'Industrial/Powder', '1–2mm', 'Specialty food brands, Grinding', 'Regular'],
                  ['H2', 'Industrial/Powder', '2–3mm', 'Specialty blends, Grinding', 'Regular'],
                  ['Powder', 'Ready to Use', 'Fine', 'Bakeries, Retail, FMCG', 'Regular'],
                ].map(([grade, tier, thick, best, avail]) => (
                  <tr key={grade}>
                    <td><strong style={{ color: 'var(--gold-500)', fontFamily: 'var(--font-display)' }}>{grade}</strong></td>
                    <td><span className="badge" style={{ fontSize: '10px' }}>{tier}</span></td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{thick}</td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{best}</td>
                    <td><span className="avail-dot" />{avail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="section" style={{ background: 'var(--dark-850)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="reveal">
            <Package size={36} color="var(--gold-500)" style={{ margin: '0 auto 20px' }} />
            <h2 className="section-title">
              Custom Packaging &<br /><span className="text-gold">Private Labelling</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '16px auto 36px', lineHeight: 1.8 }}>
              We offer custom packaging and private label solutions for all grades. 
              Tell us your requirements and our team will prepare a tailored proposal.
            </p>
            <Link to="/contact" className="btn btn-gold">
              Request a Custom Quote <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Modal */}
      <GradeModal grade={activeGrade} onClose={() => setActiveGrade(null)} />
    </div>
  );
}
