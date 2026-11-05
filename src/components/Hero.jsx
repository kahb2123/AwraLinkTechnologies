import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__overlay" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">
            <span className="hero__eyebrow-dot" aria-hidden="true" />
            Technology &amp; Infrastructure Solutions · Addis Ababa, Ethiopia
          </p>
          <div className="hero__actions">
            <Link to="/services" className="btn btn--primary">
              Explore Our Services <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn btn--outline-navy">
              Contact Our Team
            </Link>
          </div>
          <p className="hero__meta">
            <MapPin size={15} />
            <span>Serving banks, enterprises, government institutions, and NGOs across Ethiopia</span>
          </p>
        </div>
      </div>
    </section>
  );
}