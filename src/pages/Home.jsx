import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import Hero from '../components/Hero';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import IndustryCard from '../components/IndustryCard';
import IconCard from '../components/IconCard';
import ProcessList from '../components/ProcessList';
import CTASection from '../components/CTASection';
import ScrollReveal from '../components/ScrollReveal';
import AboutVisual from '../assets/AboutVisual';
import { servicesOverview } from '../data/services';
import { industries } from '../data/industries';
import { whyUs } from '../data/whyUs';
import { processSteps } from '../data/process';

const aboutHighlights = [
  'Technology solutions, equipment supply, and infrastructure implementation under one roof',
  'Professional installation, configuration, and integration',
  'Technical support based on agreed service arrangements',
];

export default function Home() {
  return (
    <>
      <PageMeta
        title="Technology & Infrastructure Solutions in Addis Ababa, Ethiopia"
        description="AwraLink Technologies PLC delivers integrated IT infrastructure, networking, security, and power solutions that help organizations in Ethiopia operate securely, efficiently, and confidently."
        path="/"
      />

      <Hero />

      <section className="section section--white" aria-labelledby="services-heading">
        <div className="container">
          <SectionHeading
            id="services-heading"
            eyebrow="Our Services"
            title="Integrated Technology Solutions Under One Roof"
            text="From infrastructure planning and equipment supply to installation and ongoing support, AwraLink delivers the full technology lifecycle for your organization."
          />
          <div className="services-grid">
            {servicesOverview.map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="about-heading">
        <div className="container split">
          <div className="split__content">
            <SectionHeading
              id="about-heading"
              eyebrow="About AwraLink"
              title="Your Technology Infrastructure Partner"
              text="AwraLink Technologies PLC supports organizations with practical, reliable technology solutions, from equipment supply and infrastructure planning to installation, implementation, and technical support. We focus on delivering solutions aligned with each client's operational needs."
            />
            <ul className="split__list">
              {aboutHighlights.map((highlight) => (
                <li key={highlight}>
                  <Check size={18} strokeWidth={2.4} />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <Link to="/about" className="btn btn--outline-navy">
              Learn More <ArrowRight size={17} />
            </Link>
          </div>
          <div className="split__visual">
            <AboutVisual />
          </div>
        </div>
      </section>

      <section className="section section--white" aria-labelledby="why-heading">
        <div className="container">
          <SectionHeading
            id="why-heading"
            eyebrow="Why AwraLink"
            title="Why Choose AwraLink"
            text="We combine technical expertise with a practical, client-focused approach to deliver infrastructure you can rely on."
          />
          <div className="grid-3">
            {whyUs.map((item, index) => (
              <IconCard key={item.title} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="industries-heading">
        <div className="container">
          <SectionHeading
            id="industries-heading"
            eyebrow="Industries We Serve"
            title="Industries We Serve"
            text="Dependable technology infrastructure helps every sector operate with confidence. AwraLink adapts its solutions to the needs of each industry."
          />
          <div className="grid-2">
            {industries.map((industry, index) => (
              <IndustryCard key={industry.title} {...industry} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white" aria-labelledby="process-heading">
        <div className="container">
          <SectionHeading
            id="process-heading"
            eyebrow="Implementation Process"
            title="Our Implementation Process"
            text="A structured project lifecycle that keeps every engagement predictable, transparent, and aligned with your requirements."
          />
          <ProcessList steps={processSteps} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
