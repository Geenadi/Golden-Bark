import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Heart, Leaf, MapPin, Quote, Users } from 'lucide-react';
import './About.css';
import peelersImage from '../assets/cinnamon_peelers.png';
import harvestImage from '../assets/Cinnamon_Harvest.jpg';
import leavesImage from '../assets/cinnamon-with-leaves.jpg';
import cinnamonImage from '../assets/cinnamon-2.jpg';

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll('.about-page .reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

const values = [
  { Icon: Award, number: '01', title: 'Exacting by nature', desc: 'We assess every batch for appearance, aroma and consistency before it leaves Sri Lanka.' },
  { Icon: Heart, number: '02', title: 'Respect for craft', desc: 'We value the knowledge, patience and livelihood of the peelers behind every quill.' },
  { Icon: Leaf, number: '03', title: 'A lighter footprint', desc: 'Traditional harvesting and considered sourcing keep the land at the heart of our work.' },
  { Icon: Users, number: '04', title: 'Partners, not transactions', desc: 'We build dependable, long-term relationships from farm communities to global customers.' },
];

export default function About() {
  useScrollReveal();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  return <div className="about-page about-editorial">
    <section className="about-hero">
      <div className="about-hero__image"><img src={peelersImage} alt="Sri Lankan cinnamon artisan at work" /></div>
      <div className="about-hero__panel"><div className="about-hero__panel-inner"><div className="about-eyebrow"><MapPin size={14} /> Ambalangoda · Sri Lanka</div><p className="about-hero__number">EST. 2025</p><h1>Rooted in<br /><em>the hands that<br />make it.</em></h1><p>Golden Bark was founded to share Ceylon cinnamon with the care, clarity and respect that its centuries-old craft deserves.</p><Link to="/contact" className="about-button">Work with us <ArrowRight size={16} /></Link></div></div>
      <div className="about-hero__foot"><span>Golden Bark Exports</span><span>True cinnamon, thoughtfully shared</span></div>
    </section>

    <section className="section about-intro"><div className="container about-intro__grid"><div className="about-intro__statement reveal"><Quote size={38} /><p>“We are here to make the journey from a Sri Lankan cinnamon garden to your shelf more honest, more beautiful and more dependable.”</p><span>— Golden Bark Exports</span></div><div className="about-intro__copy reveal"><div className="about-eyebrow about-eyebrow--dark">Who we are</div><h2>A young company<br />with <em>deep roots.</em></h2><p>Golden Bark Exports Pvt Ltd was registered in 2025, built on generations of connection to the cinnamon-growing communities of the Galle district.</p><p>We bring professional export standards to an enduring local craft—working closely with experienced peelers, growers and partners who know what true Ceylon cinnamon should be.</p></div></div></section>

    <section className="about-place"><div className="container about-place__grid"><div className="about-place__visual reveal"><img src={harvestImage} alt="Cinnamon harvest in Galle" /><div className="about-place__card"><span>Southern<br />Sri Lanka</span><small>Where cinnamon has been<br />cultivated for generations</small></div></div><div className="about-place__copy reveal"><div className="about-eyebrow">Our place</div><h2>From a remarkable<br /><em>island, not a factory.</em></h2><p>Ceylon cinnamon asks for time: the right soil, a considered harvest, and hands trained to peel its bark into feather-light layers. There is no shortcut to its character.</p><p>That is why our work begins close to home. By keeping the supply chain personal, we can safeguard quality while helping the value of this craft remain with the people and places that create it.</p><div className="about-place__facts"><span><b>Galle district</b> Our sourcing heartland</span><span><b>Cinnamomum verum</b> The true cinnamon tree</span></div></div></div></section>

    <section className="section about-values"><div className="container"><div className="about-values__head reveal"><div><div className="about-eyebrow about-eyebrow--dark">What guides us</div><h2>The promises behind<br /><em>every shipment.</em></h2></div><p>Our standards are practical, personal and present in every decision we make.</p></div><div className="about-values__grid">{values.map(({ Icon, number, title, desc }) => <article className="about-value reveal" key={title}><span>{number}</span><Icon size={22} /><h3>{title}</h3><p>{desc}</p></article>)}</div></div></section>

    <section className="about-craft"><div className="container about-craft__grid"><div className="about-craft__copy reveal"><div className="about-eyebrow">Our purpose</div><h2>Protect the character<br />of <em>true cinnamon.</em></h2><p>We want buyers around the world to experience Ceylon cinnamon at its best—and to know the people, place and patience that make it possible.</p><Link to="/products" className="about-button about-button--light">Explore our grades <ArrowRight size={16} /></Link></div><div className="about-craft__image reveal"><img src={leavesImage} alt="Ceylon cinnamon with leaves" /><span>Pure Ceylon<br />cinnamon</span></div></div></section>

    <section className="section about-closing"><div className="container about-closing__inner reveal"><img src={cinnamonImage} alt="Premium Ceylon cinnamon" /><div><div className="about-eyebrow about-eyebrow--dark">Begin a conversation</div><h2>Let’s make something<br /><em>worth sharing.</em></h2><p>Talk to our export team about samples, grades and a partnership designed for your market.</p><Link to="/contact" className="about-button">Contact Golden Bark <ArrowRight size={16} /></Link></div></div></section>
  </div>;
}
