import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function CTASection({
  title = "Let's Build Your Next Technology Solution",
  text = 'Tell us about your infrastructure needs and let our team help you identify the right solution.',
  buttonLabel = 'Contact AwraLink',
}) {
  return (
    <section className="cta-section" aria-label="Call to action">
      <div className="container cta-section__inner">
        <ScrollReveal>
          <h2>{title}</h2>
          <p>{text}</p>
        </ScrollReveal>
        <ScrollReveal delay={140}>
          <Link to="/contact" className="btn btn--white">
            {buttonLabel} <ArrowRight size={18} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
