import ScrollReveal from './ScrollReveal';

export default function IconCard({ icon: Icon, title, text, index = 0 }) {
  return (
    <ScrollReveal delay={(index % 3) * 90}>
      <div className="card icon-card">
        <span className="icon-chip">
          <Icon size={26} strokeWidth={1.9} />
        </span>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </ScrollReveal>
  );
}
