import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function ServiceDetail({ icon: Icon, title, description, capabilities, slug, index }) {
  const alt = index % 2 === 0;
  const reverse = index % 2 === 0;

  return (
    <section
      id={`service-${index}`}
      className={`service-detail ${reverse ? 'service-detail--reverse' : ''} ${alt ? 'service-detail--alt' : ''}`}
      aria-labelledby={`service-${index}-title`}
    >
      <div className="container service-detail__inner">
        <ScrollReveal className="service-detail__visual">
          <span className="service-detail__number" aria-hidden="true">
            {String(index).padStart(2, '0')}
          </span>
          <span className="icon-chip">
            <Icon size={44} strokeWidth={1.6} />
          </span>
        </ScrollReveal>
        <div className="service-detail__content">
          <ScrollReveal>
            <h2 id={`service-${index}-title`}>{title}</h2>
            <p>{description}</p>
            <ul className="capability-list">
              {capabilities.map((capability) => (
                <li key={capability}>
                  <Check size={18} strokeWidth={2.4} />
                  <span>{capability}</span>
                </li>
              ))}
            </ul>
            <Link to={`/contact?service=${slug}`} className="btn btn--primary">
              Request a Quote <ArrowRight size={17} />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
