export default function PageHero({ eyebrow, title, description }) {
  return (
    <section className="page-hero">
      <div className="container">
        {eyebrow && <p className="page-hero__eyebrow">{eyebrow}</p>}
        {title && <h1>{title}</h1>}
        {description && <p className="page-hero__desc">{description}</p>}
      </div>
    </section>
  );
}
