import { Link } from 'react-router-dom';
import { ArrowRight, Globe } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function IndustryCard({ image, icon: Icon, title, short, to, index = 0 }) {
  return (
    <ScrollReveal delay={(index % 2) * 100} className="industry-card__wrap">
      <Link to={to || '/industries'} className="card industry-card">
        {image ? (
          <img
            className="industry-card__image"
            src={image}
            alt={title}
            loading="eager"
            decoding="async"
          />
        ) : (
          <span className="icon-chip industry-card__icon">
            <Icon size={44} strokeWidth={2} />
          </span>
        )}
        <h3>{title}</h3>
        <p>{short}</p>
        <span className="industry-card__link">
          Learn more <ArrowRight size={16} />
        </span>
      </Link>
    </ScrollReveal>
  );
}
