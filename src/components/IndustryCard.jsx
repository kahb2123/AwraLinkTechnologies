import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function IndustryCard({ icon: Icon, title, short, to, index = 0 }) {
  return (
    <ScrollReveal delay={(index % 2) * 100} className="industry-card__wrap">
      <Link to={to || '/industries'} className="card industry-card">
        <span className="icon-chip industry-card__icon">
          <Icon size={26} strokeWidth={1.9} />
        </span>
        <h3>{title}</h3>
        <p>{short}</p>
        <span className="industry-card__link">
          Learn more <ArrowRight size={16} />
        </span>
      </Link>
    </ScrollReveal>
  );
}
