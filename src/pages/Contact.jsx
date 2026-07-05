import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './Contact.css';
import backgroundHero from '../assets/contactback.jpg';

// ─── EmailJS credentials ─────────────────────────────────────────
const EMAILJS_SERVICE_ID = 'service_4jlvr99';
const EMAILJS_TEMPLATE_ID = 'template_q0tb0g5';
const EMAILJS_PUBLIC_KEY = 'h4gqV93YhBRM-lwhK';

// Initialize EmailJS with the public key
emailjs.init({
  publicKey: EMAILJS_PUBLIC_KEY,
  blockHeadless: false,      // allow sending from dev / localhost
  limitRate: {
    throttle: 5000,           // 1 request per 5 seconds
  },
});
// ──────────────────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(el => { if (el.isIntersecting) el.target.classList.add('revealed'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    }
  }, [hash]);
}

const contactInfo = [
  {
    Icon: Phone,
    title: 'Contact Us (Call/WhatsApp)',
    lines: ['+94 70 693 5553'],
  },
  {
    Icon: Mail,
    title: 'Email Us',
    lines: ['info@goldenbarkcinnamon.com'],
  },
  {
    Icon: Clock,
    title: 'Business Hours',
    lines: ['Monday - Friday : 8:30AM - 5:30PM', 'Saturday - Sunday : 8:30AM - 12:30PM'],
  },
];

export default function Contact() {
  useScrollReveal();
  useScrollToHash();
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', grade: '', quantity: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name:     form.name,
          company:  form.company,
          email:    form.email,
          phone:    form.phone,
          grade:    form.grade,
          quantity: form.quantity,
          message:  form.message,
        }
      );
      console.log('EmailJS success:', result.status, result.text);

      setSubmitted(true);
      setForm({ name: '', company: '', email: '', phone: '', grade: '', quantity: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Unable to send. Please email us directly at info@goldenbarkcinnamon.com');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* ---- Page Hero ---- */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img
            src={backgroundHero}
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
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div id="enquiry-form" className="reveal" style={{ animationDelay: '0.2s' }}>
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

                  {error && (
                    <p style={{ color: '#e53e3e', fontSize: '0.85rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <AlertCircle size={16} /> {error}
                    </p>
                  )}

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
    </div>
  );
}
