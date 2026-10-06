export default function SectionHeading({ eyebrow, title, text, id, center = false, className = '' }) {
  return (
    <div id={id} className={`section-heading ${center ? 'section-heading--center' : ''} ${className}`.trim()}>
      {eyebrow && <p className="section-heading__eyebrow">{eyebrow}</p>}
      {title && <h2>{title}</h2>}
      {text && <p>{text}</p>}
    </div>
  );
}
