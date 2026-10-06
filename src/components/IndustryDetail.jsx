import { Check } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function IndustryDetail({ icon: Icon, title, description, needs, index = 0 }) {
  return (
    <ScrollReveal delay={(index % 2) * 90}>
      <article className="card industry-detail">
        <div className="industry-detail__icon" aria-hidden="true">
          <Icon size={34} strokeWidth={1.7} />
        </div>
        <div className="industry-detail__content">
          <h2>{title}</h2>
          <p>{description}</p>
          <p className="industry-needs-label">Infrastructure needs we support</p>
          <ul className="industry-needs">
            {needs.map((need) => (
              <li key={need}>
                <Check size={17} strokeWidth={2.4} />
                <span>{need}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </ScrollReveal>
  );
}
