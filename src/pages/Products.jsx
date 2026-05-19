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
    desc: 'The highest quality and most expensive tier of Ceylon cinnamon. These quills are exceptionally thin, ranging from 6 to 10 mm in diameter, characterised by their light golden-brown colour, very smooth surface, and a delicate, highly refined sweetness. Because of their fragile nature and the skill required to roll them, they are considered a premium product globally.',
    color: '#FFD700',
    thickness: '6–10 mm diameter',
    origin: 'Sri Lanka',
    highlights: [
      'Exceptionally thin, 6–10 mm diameter quills',
      'Light golden-brown colour with smooth surface',
      'Delicate, highly refined sweetness',
      'Requires skilled master peelers to produce',
      'Premium product for fine dining & luxury retail',
    ],
    image: 'https://images.unsplash.com/photo-1588277759339-05d459f0714e?w=700&q=80&auto=format',
  },
  {
    id: 'c5-special',
    name: 'C5 Special',
    subtitle: 'Continental Grade — Premium',
    tag: 'Continental',
    stars: 5,
    desc: 'Part of the Continental category, C5 Special sits at the pinnacle of the C5 tier. These quills are slightly thicker than Alba, typically measuring between 10 and 12 mm, yet maintain a very smooth texture and pale appearance. They offer a powerful yet sweet aroma, highly sought after by European markets for their balance of aesthetic beauty and rich flavour.',
    color: '#E8C84A',
    thickness: '10–12 mm diameter',
    origin: 'Sri Lanka',
    highlights: [
      'Smooth texture with pale, elegant appearance',
      'Powerful yet sweet aroma',
      'Highly sought after by European markets',
      'Perfect balance of aesthetics and rich flavour',
      'Ideal for premium retail and food service',
    ],
    image: 'https://images.unsplash.com/photo-1596040033229-a9821eec058b?w=700&q=80&auto=format',
  },
  {
    id: 'c5',
    name: 'C5',
    subtitle: 'Continental Grade',
    tag: 'Continental',
    stars: 4,
    desc: 'A premium Continental grade offering excellent quality and consistency. C5 quills deliver the authentic sweetness and aroma of true Ceylon cinnamon, making them ideal for large-scale food production, branded retail, and export to international markets.',
    color: '#C9A84C',
    thickness: '10–12 mm diameter',
    origin: 'Sri Lanka',
    highlights: [
      'Reliable, consistent Continental grade',
      'Authentic Ceylon cinnamon sweetness',
      'Ideal for large-scale food production',
      'Available in high-volume export shipments',
      'Trusted by international food manufacturers',
    ],
    image: 'https://images.unsplash.com/photo-1596040033229-a9821eec058b?w=700&q=80&auto=format',
  },
  {
    id: 'c4',
    name: 'C4',
    subtitle: 'Continental Grade — Popular Export',
    tag: 'Continental',
    stars: 4,
    desc: 'A popular Continental choice that offers excellent quality at a more accessible price point than Alba or C5. The quills usually have a diameter of 13 to 15 mm. While thicker, they still possess a sweet fragrance and a relatively smooth bark, making them ideal for high-end retail packaging and culinary use.',
    color: '#A0742A',
    thickness: '13–15 mm diameter',
    origin: 'Sri Lanka',
    highlights: [
      'Sweet fragrance with relatively smooth bark',
      'Diameter of 13–15 mm',
      'Excellent quality at an accessible price',
      'Ideal for high-end retail packaging',
      'Suitable for culinary and industrial use',
    ],
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=700&q=80&auto=format',
  },
  {
    id: 'h1',
    name: 'H1',
    subtitle: 'Hamburg Grade — Top Tier',
    tag: 'Hamburg',
    stars: 3,
    desc: 'The top tier of the Hamburg category. H1 consists of quills that are significantly thicker and sturdier, often reaching up to 23 mm in diameter. The bark is darker and more brittle compared to C grades. H1 is prized for its robust, spicy flavour profile and is frequently used in traditional cooking and by manufacturers requiring a stronger cinnamon punch.',
    color: '#B8860B',
    thickness: 'Up to 23 mm diameter',
    origin: 'Sri Lanka',
    highlights: [
      'Significantly thicker and sturdier quills',
      'Darker bark with a robust, spicy flavour',
      'Frequently used in traditional cooking',
      'Ideal for manufacturers needing strong cinnamon',
      'High cinnamaldehyde content for bold flavour',
    ],
    image: 'https://images.unsplash.com/photo-1578900436920-2aa4cc7e5fd6?w=700&q=80&auto=format',
  },
  {
    id: 'h2',
    name: 'H2',
    subtitle: 'Hamburg Grade — Economical',
    tag: 'Hamburg',
    stars: 3,
    desc: 'A more economical Hamburg grade featuring quills that are thicker and more fibrous than H1. These quills may have a rougher surface and often consist of more broken pieces or "fillings." While it lacks the delicate appearance of premium grades, H2 still provides a strong, authentic flavour, making it a staple for grinding into high-quality cinnamon powder.',
    color: '#8B6914',
    thickness: 'Thick & fibrous',
    origin: 'Sri Lanka',
    highlights: [
      'Thicker, more fibrous quills than H1',
      'Stronger, authentic cinnamon flavour',
      'Staple for high-quality cinnamon powder',
      'Cost-efficient for large-scale grinding',
      'Available in bulk and industrial packaging',
    ],
    image: 'https://images.unsplash.com/photo-1561406636-b80293969660?w=700&q=80&auto=format',
  },
  {
    id: 'm',
    name: 'M Grade',
    subtitle: 'Mexican Grade',
    tag: 'Mexican',
    stars: 3,
    desc: 'The M grade, or "Mexican" grade, is specifically categorised for its popularity in Latin American markets. These quills are generally thinner than H grades but possess a rougher texture and a more reddish-brown hue. Known for a pungent, sharp aroma and a distinct taste that complements the bold flavours found in Mexican beverages and desserts.',
    color: '#A0522D',
    thickness: 'Thinner than H grades',
    origin: 'Sri Lanka',
    highlights: [
      'Rougher texture with reddish-brown hue',
      'Pungent, sharp aroma and distinct taste',
      'Popular in Latin American markets',
      'Ideal for Mexican beverages and desserts',
      'Complements bold, traditional flavour profiles',
    ],
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=700&q=80&auto=format',
  },
  {
    id: 'powder',
    name: 'Cinnamon Powder',
    subtitle: 'Premium Grade Powder',
    tag: 'Ready to Use',
    stars: 4,
    desc: 'Our finely ground Ceylon cinnamon powder is made from premium H1 and H2 Hamburg-grade material. It delivers an instant, robust aromatic flavour profile ideal for bakeries, confectioneries, specialty food brands, and retail spice jars.',
    color: '#C9A84C',
    thickness: 'Fine Powder',
    origin: 'Sri Lanka',
    highlights: [
      'Finely ground from premium H1 & H2 material',
      'Instant, robust aromatic flavour',
      'Perfect for baking and confectionery',
      'Consistent particle size throughout',
      'Available in bulk and retail packaging',
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
            Eight <span className="text-gold">Exceptional</span><br />Cinnamon Grades
          </h1>
          <p className="page-hero-sub">
            From the ultra-premium Alba to our ready-to-use Cinnamon Powder, every grade
            we export meets the highest international standards of quality and purity.
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
                  ['Alba', 'Ultra-thin Luxury', '6–10 mm diameter', 'Luxury retail, fine dining', 'Limited'],
                  ['C5 Special', 'Continental — Premium', '10–12 mm diameter', 'European markets, premium retail', 'Regular'],
                  ['C5', 'Continental', '10–12 mm diameter', 'Large-scale food production', 'High Volume'],
                  ['C4', 'Continental — Popular', '13–15 mm diameter', 'High-end retail, culinary use', 'High Volume'],
                  ['H1', 'Hamburg — Top Tier', 'Up to 23 mm diameter', 'Traditional cooking, manufacturers', 'Regular'],
                  ['H2', 'Hamburg — Economical', 'Thick & fibrous', 'Grinding, cinnamon powder', 'Regular'],
                  ['M Grade', 'Mexican', 'Thinner than H grades', 'Latin American beverages & desserts', 'Regular'],
                  ['Cinnamon Powder', 'Ready to Use', 'Fine Powder', 'Bakeries, confectioneries, retail', 'Regular'],
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
