import PageMeta from '../components/PageMeta';
import PageHero from '../components/PageHero';
import ServiceDetail from '../components/ServiceDetail';
import CTASection from '../components/CTASection';
import { servicesDetailed } from '../data/services';

export default function Services() {
  return (
    <>
      <PageMeta
        title="Services"
        description="AwraLink Technologies PLC provides IT infrastructure, network solutions, security systems, power solutions, technology equipment supply, and installation, integration, and technical support for organizations in Ethiopia."
        path="/services"
      />

      <PageHero
        eyebrow="Our Services"
        title="Technology & Infrastructure Services"
        description="Comprehensive IT infrastructure, networking, security, power, and equipment supply capabilities — scoped to your organization's requirements and quoted per project."
      />

      <section className="section section--compact" aria-label="Service overview">
        <div className="container">
          <p className="services-intro">
            AwraLink provides the following service capabilities for banks, enterprises, government
            institutions, NGOs, and development organizations across Ethiopia. Each service is
            presented as a capability — tailored to your requirements and quoted per project.
          </p>
        </div>
      </section>

      {servicesDetailed.map((service, index) => (
        <ServiceDetail key={service.title} {...service} index={index + 1} />
      ))}

      <CTASection />
    </>
  );
}
