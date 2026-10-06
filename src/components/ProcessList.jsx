import ScrollReveal from './ScrollReveal';

export default function ProcessList({ steps = [] }) {
  return (
    <div className="process-grid">
      {steps.map((step, index) => (
        <ScrollReveal key={step.title} delay={(index % 3) * 90}>
          <article className="process-step">
            <span className="process-step__number" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        </ScrollReveal>
      ))}
    </div>
  );
}
