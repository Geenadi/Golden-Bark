import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import './Contact.css';

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(el => { if (el.isIntersecting) el.target.classList.add('revealed'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const contactInfo = [
  {
    Icon: Phone,
    title: 'Call Us',
    lines: ['+94 11 234 5678', '+94 77 890 1234 (WhatsApp)'],
  },
  {
    Icon: Mail,
    title: 'Email Us',
    lines: ['info@goldenbark.lk', 'exports@goldenbark.lk'],
  },
  {
    Icon: Clock,
    title: 'Business Hours',
    lines: ['Monday – Friday: 8:30AM – 5:30PM', 'Saturday: 9:00AM – 1:00PM'],
  },
];

export default function Contact() {
  useScrollReveal();
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', grade: '', quantity: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="contact-page">
      {/* ---- Page Hero ---- */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80&auto=format"
            alt="Contact Golden Bark"
            className="page-hero-img"
          />
          <div className="page-hero-overlay" />
        </div>
        <div className="container page-hero-content">
          <div className="section-tag" style={{ color: 'var(--gold-400)' }}>Contact Us</div>
          <h1 className="page-hero-title">
            Let's <span className="text-gold">Start</span><br />a Conversation
          </h1>
          <p className="page-hero-sub">
            Ready to import the world's finest Ceylon cinnamon? Our export team is here to guide you from sample to shipment.
          </p>
        </div>
      </section>

      {/* ---- Main Contact Grid ---- */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Info Panel */}
            <div className="reveal">
              <div className="section-tag">Get in Touch</div>
              <h2 className="section-title" style={{ fontSize: '2rem' }}>
                We'd Love to<br /><span className="text-gold">Hear From You</span>
              </h2>
              <div className="gold-divider" />
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: '40px', fontSize: '0.9rem' }}>
                Whether you're a new buyer looking to place your first order, a distributor seeking long-term supply, 
                or a brand interested in private labelling — our team is ready to assist you.
              </p>

              <div className="contact-info-cards">
                {contactInfo.map(({ Icon, title, lines }) => (
                  <div className="contact-info-card" key={title}>
                    <div className="contact-info-icon">
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="contact-info-title">{title}</div>
                      {lines.map(l => <div className="contact-info-line" key={l}>{l}</div>)}
                      {title === 'Business Hours' && (
                        <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                          <a href="#" style={{ color: 'var(--gold-500)' }} aria-label="Facebook" className="contact-social-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                          </a>
                          <a href="#" style={{ color: 'var(--gold-500)' }} aria-label="Instagram" className="contact-social-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="reveal" style={{ animationDelay: '0.2s' }}>
              {submitted ? (
                <div className="success-box glass">
                  <CheckCircle size={48} color="var(--gold-500)" style={{ margin: '0 auto 20px' }} />
                  <h3 className="success-title">Message Sent!</h3>
                  <p className="success-desc">
                    Thank you for reaching out. Our export team will review your enquiry and get back to you within 24 business hours.
                  </p>
                  <button className="btn btn-outline" style={{ margin: '0 auto' }} onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-form glass" onSubmit={handleSubmit}>
                  <div className="form-section-title">Export Enquiry Form</div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="John Smith"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Company Name</label>
                      <input
                        type="text"
                        name="company"
                        className="form-control"
                        placeholder="Your Company Ltd."
                        value={form.company}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="john@company.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        placeholder="+1 234 567 8901"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Grade of Interest</label>
                      <select name="grade" className="form-control" value={form.grade} onChange={handleChange}>
                        <option value="">Select a grade...</option>
                        <option value="alba">Alba (Ultra-thin Luxury)</option>
                        <option value="h1">H1 (Industrial / Powder)</option>
                        <option value="h2">H2 (Industrial / Powder)</option>
                        <option value="c4">C4 (Export Quality)</option>
                        <option value="c5">C5 (Export Quality)</option>
                        <option value="powder">Cinnamon Powder (Ready to Use)</option>
                        <option value="multiple">Multiple Grades</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Estimated Quantity (in kgs / month)</label>
                      <input
                        type="text"
                        name="quantity"
                        className="form-control"
                        placeholder="e.g. 500"
                        value={form.quantity}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message / Requirements *</label>
                    <textarea
                      name="message"
                      className="form-control"
                      placeholder="Tell us about your requirements, target markets, packaging preferences, or any questions you have..."
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-gold" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
                    {loading ? (
                      <>Sending...</>
                    ) : (
                      <><Send size={16} /> Send Enquiry</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Map / Location ---- */}
      <section className="section map-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }} className="reveal">
            <div className="section-tag" style={{ justifyContent: 'center' }}>Find Us</div>
            <h2 className="section-title">
              Our <span className="text-gold">Location</span>
            </h2>
          </div>
          <div className="map-wrap reveal" style={{ animationDelay: '0.2s' }}>
            <iframe
              title="Golden Bark Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.81386671543!2d79.8!3d6.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1715000000000"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="map-label glass">
              <MapPin size={16} color="var(--gold-500)" />
              <span>Colombo, Sri Lanka</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
