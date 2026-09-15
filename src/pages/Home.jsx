import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Leaf, MapPin, ShieldCheck, Ship, Sparkles } from 'lucide-react';
import './Home.css';
import heroImage from '../assets/package-compressed.webp';
import harvestImage from '../assets/Cinnamon_Harvest.jpg';
import cinnamonImage from '../assets/cinnamon-2.webp';
import detailImage from '../assets/Ceylon_Cinnamon_Sticks.webp';
import processVideo from '../assets/web-video.mp4';

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

const grades = [
  { number: '01', name: 'Alba', note: 'The collector’s grade', copy: 'Impossibly fine, hand-rolled quills with a pale golden colour and an elegantly sweet finish.' },
  { number: '02', name: 'Continental', note: 'C4 & C5', copy: 'Consistent, aromatic quills selected for discerning retail and food-service partners worldwide.' },
  { number: '03', name: 'Hamburg', note: 'H1 & H2', copy: 'Full-bodied character and dependable quality for culinary blending, milling, and export.' },
];

export default function Home() {
  useScrollReveal();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  return <div className="home premium-home">
    <section className="premium-hero">
      <div className="premium-hero__wash" />
      <div className="container premium-hero__grid">
        <div className="premium-hero__copy">
          <div className="eyebrow eyebrow--light"><span /> Estate-grown in Sri Lanka</div>
          <p className="premium-hero__kicker">Golden Bark Exports</p>
          <h1>True cinnamon,<br /><em>quietly exceptional.</em></h1>
          <p className="premium-hero__intro">Hand-peeled Ceylon cinnamon from the Galle district—chosen for its delicate sweetness, nuanced fragrance and unmistakable provenance.</p>
          <div className="premium-hero__actions"><Link to="/products" className="premium-button premium-button--gold">Discover our grades <ArrowRight size={16} /></Link><Link to="/contact" className="premium-link">Request a sample <ArrowRight size={15} /></Link></div>
        </div>
        <div className="premium-hero__visual"><div className="premium-hero__image-frame"><img src={heroImage} alt="Golden Bark premium Ceylon cinnamon" /></div><div className="premium-hero__seal"><span>100%</span><small>Pure Ceylon<br />cinnamon</small></div><p className="premium-hero__caption">Hand rolled · Carefully graded · Export ready</p></div>
      </div>
      <div className="container premium-hero__footer"><span>01 / Origin</span><span>Galle District, Sri Lanka</span><span>Cinnamomum verum</span></div>
    </section>

    <section className="proof-bar"><div className="container proof-bar__grid">
      <div><MapPin size={18} /><span><b>Single origin</b> Grown in Sri Lanka</span></div><div><Award size={18} /><span><b>Hand selected</b> Grade by grade</span></div><div><ShieldCheck size={18} /><span><b>Pure product</b> Never blended</span></div><div><Ship size={18} /><span><b>Export focused</b> Packed with care</span></div>
    </div></section>

    <section className="section origin-section"><div className="container origin-grid">
      <div className="origin-images reveal-left"><img className="origin-images__main" src={cinnamonImage} alt="Ceylon cinnamon quills" /><div className="origin-images__detail"><img src={harvestImage} alt="Cinnamon harvest in Sri Lanka" /></div><div className="origin-images__label"><span>Galle</span><small>Southern Province</small></div></div>
      <div className="origin-copy reveal-right"><div className="eyebrow">The Golden Bark standard</div><h2>Quality you can<br /><em>see, smell and trace.</em></h2><p>Real Ceylon cinnamon is not a commodity. Its fine, layered bark carries a naturally sweet, citrus-like perfume that no substitute can imitate.</p><p>We work directly with skilled peelers and growers, following every harvest from estate to final packing. That close relationship lets us protect the character of every quill—and the confidence of every buyer.</p><Link to="/about" className="premium-link premium-link--dark">Our story <ArrowRight size={15} /></Link></div>
    </div></section>

    <section className="section craft-section"><div className="container"><div className="craft-head reveal"><div><div className="eyebrow eyebrow--light">The difference is in the details</div><h2>Made by hand.<br /><em>Judged by exacting standards.</em></h2></div><p>From the first cut to the final seal, we take the slower route—because exceptional cinnamon leaves no room for shortcuts.</p></div><div className="craft-grid">
      <article className="craft-step reveal"><span>01</span><Leaf size={22} /><h3>Estate selection</h3><p>We source from cinnamon-growing communities in the fertile south of Sri Lanka.</p></article><article className="craft-step reveal"><span>02</span><Sparkles size={22} /><h3>Artisan peeling</h3><p>Skilled hands create the paper-thin layers that define true Ceylon cinnamon.</p></article><article className="craft-step reveal"><span>03</span><ShieldCheck size={22} /><h3>Final inspection</h3><p>Every batch is sorted, graded and prepared to travel beautifully across the world.</p></article>
    </div></div></section>

    <section className="section process-section"><div className="container"><div className="process-section__head reveal"><div className="eyebrow">The Golden Bark journey</div><h2>From cinnamon bark<br /><em>to the finished quill.</em></h2><p>See the traditional craft behind every Golden Bark shipment, from harvesting and peeling through grading and careful packing.</p></div><div className="process-film reveal"><video src={processVideo} controls playsInline preload="auto" controlsList="nodownload">Your browser does not support this video.</video><div className="process-film__caption"><span>Watch the process</span><span>Estate → Peeling → Grading → Packing</span></div></div></div></section>

    <section className="section collection-section"><div className="container"><div className="collection-head reveal"><div className="eyebrow">Our collection</div><h2>Grades for every<br /><em>exceptional standard.</em></h2><p>Distinct grades, one unwavering promise of authentic Ceylon cinnamon.</p></div><div className="grade-grid">{grades.map((grade) => <article className="grade-card reveal" key={grade.name}><span className="grade-card__number">{grade.number}</span><p className="grade-card__note">{grade.note}</p><h3>{grade.name}</h3><p>{grade.copy}</p><Link to="/products" aria-label={`Explore ${grade.name} grade`}><ArrowRight size={18} /></Link></article>)}</div><div className="collection-action reveal"><Link to="/products" className="premium-button premium-button--outline">Explore all cinnamon grades <ArrowRight size={16} /></Link></div></div></section>

    <section className="section final-cta"><div className="container final-cta__box reveal"><img src={detailImage} alt="Close-up of premium cinnamon sticks" /><div className="final-cta__copy"><div className="eyebrow">For discerning partners</div><h2>Bring the true taste<br />of Ceylon to your table.</h2><p>Request samples, pricing or export information from our team.</p><Link to="/contact" className="premium-button premium-button--gold">Begin an enquiry <ArrowRight size={16} /></Link></div></div></section>
  </div>;
}
