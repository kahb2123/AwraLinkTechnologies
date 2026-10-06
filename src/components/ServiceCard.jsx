import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function ServiceCard({ icon: Icon, title, description, to, index = 0 }) {
  return (
    <ScrollReveal delay={(index % 3) * 90} className="service-card__wrap">
      <Link to={to} className="card service-card">
        <span className="icon-chip service-card__icon">
          <Icon size={26} strokeWidth={1.9} />
        </span>
        <h3>{title}</h3>
        <p>{description}</p>
        <span className="service-card__link">
          Learn more <ArrowRight size={16} />
        </span>
      </Link>
    </ScrollReveal>
  );
}
