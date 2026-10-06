import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, ShieldCheck, Zap } from 'lucide-react';
import HeroVisual from '../assets/HeroVisual';
import ScrollReveal from './ScrollReveal';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="container hero__inner">
        <div className="hero__content">
          <ScrollReveal>
            <p className="hero__eyebrow">
              <span className="hero__eyebrow-dot" aria-hidden="true" />
              Technology &amp; Infrastructure Solutions · Addis Ababa, Ethiopia
            </p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h1 id="hero-heading" className="hero__title">
              Building Reliable Technology Infrastructure for a{' '}
              <span className="gradient-text">Connected Future</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <p className="hero__text">
              AweraLink Technologies PLC delivers integrated IT infrastructure, networking,
              security, and power solutions that help organizations operate securely,
              efficiently, and confidently.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={240}>
            <div className="hero__actions">
              <Link to="/services" className="btn btn--primary">
                Explore Our Services <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn btn--outline-navy">
                Contact Our Team
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={320}>
            <p className="hero__meta">
              <MapPin size={15} />
              <span>Serving banks, enterprises, government institutions, and NGOs across Ethiopia</span>
            </p>
          </ScrollReveal>
        </div>
        <div className="hero__visual">
          <HeroVisual />
          <div className="hero__chip hero__chip--one" aria-hidden="true">
            <ShieldCheck size={20} style={{ color: '#1769FF' }} />
            <span>
              Network Security
              <small>Firewall &amp; perimeter protection</small>
            </span>
          </div>
          <div className="hero__chip hero__chip--two" aria-hidden="true">
            <Zap size={20} style={{ color: '#19C6D9' }} />
            <span>
              Power Continuity
              <small>UPS &amp; backup power systems</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
