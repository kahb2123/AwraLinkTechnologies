import PageMeta from '../components/PageMeta';
import PageHero from '../components/PageHero';
import IndustryDetail from '../components/IndustryDetail';
import CTASection from '../components/CTASection';
import { industries } from '../data/industries';

export default function Industries() {
  return (
    <>
      <PageMeta
        title="Industries We Serve"
        description="AwraLink Technologies PLC supports financial institutions, government organizations, private enterprises, and NGOs across Ethiopia with dependable IT infrastructure, networking, security, and power solutions."
        path="/industries"
      />

      <PageHero
        eyebrow="Industries"
        title="Industries We Serve"
        description="Dependable technology infrastructure means different things to different sectors. AwraLink adapts its solutions to the operational realities of each industry."
      />

      <section className="section section--compact" aria-label="Industry overview">
        <div className="container">
          <p className="industries-intro">
            Each sector has its own infrastructure priorities. The overview below describes the
            needs we commonly support — without claiming specific clients or completed projects.
          </p>
        </div>
      </section>

      <section className="section section--white" aria-label="Industry details">
        <div className="container">
          {industries.map((industry, index) => (
            <IndustryDetail key={industry.title} {...industry} index={index} />
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
