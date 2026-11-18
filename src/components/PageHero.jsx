export default function PageHero({ eyebrow, title, description }) {
  return (
    <section className="page-hero">
      <div className="container">
        {title && <h1>{title}</h1>}
      </div>
    </section>
  );
}
