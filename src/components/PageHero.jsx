export default function PageHero({ title }) {
  return (
    <section className="page-hero">
      <div className="container">
        {title && <h1>{title}</h1>}
      </div>
    </section>
  );
}
