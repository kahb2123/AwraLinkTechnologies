import { Link } from 'react-router-dom';
import { ArrowRight, Target, Telescope, ClipboardCheck, Puzzle, Cog, Headset, Check } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import IconCard from '../components/IconCard';
import IndustryCard from '../components/IndustryCard';
import CTASection from '../components/CTASection';
import AboutVisual from '../assets/AboutVisual';
import { coreValues } from '../data/values';
import { industries } from '../data/industries';

const approachItems = [
  {
    icon: ClipboardCheck,
    title: 'Assessment-First Planning',
    text: 'Every engagement starts with a clear understanding of your requirements, existing infrastructure, and operational priorities.',
  },
  {
    icon: Puzzle,
    title: 'Solutions Aligned to Operations',
    text: 'We design solutions that match your workflow, scale, and budget — not one-size-fits-all packages.',
  },
  {
    icon: Cog,
    title: 'Professional Delivery',
    text: 'Equipment is installed, configured, and integrated to specification, with testing completed before handover.',
  },
  {
    icon: Headset,
    title: 'Support After Handover',
    text: 'Ongoing maintenance, troubleshooting, and technical support are available based on agreed service arrangements.',
  },
];

const aboutHighlights = [
  'Technology solutions, equipment supply, and infrastructure implementation under one roof',
  'Professional installation, configuration, and integration',
  'Technical support based on agreed service arrangements',
];

export default function About() {
  return (
    <>
      <PageMeta
        title="About Us"
        description="AweraLink Technologies PLC is an Ethiopian technology and infrastructure solutions company based in Addis Ababa, delivering reliable IT infrastructure, networking, security, and power solutions across Ethiopia."
        path="/about"
      />

      <PageHero
        eyebrow="About Us"
        title="About AweraLink Technologies PLC"
        description="An Ethiopian technology and infrastructure solutions company based in Addis Ababa, serving organizations across Ethiopia."
      />

      <section className="section" aria-labelledby="about-intro-heading">
        <div className="container split">
          <div className="split__content">
            <SectionHeading
              id="about-intro-heading"
              eyebrow="Company Introduction"
              title="Practical Technology Solutions, Delivered Reliably"
            />
            <p>
              AweraLink Technologies PLC is an Ethiopian technology and infrastructure solutions
              company headquartered in Addis Ababa. The company provides technology solutions,
              infrastructure implementation, equipment supply, installation, configuration,
              integration, and technical support for organizations across Ethiopia.
            </p>
            <p>
              AweraLink works with banks and financial institutions, private companies, government
              institutions, NGOs, and development organizations — any organization that requires
              reliable IT infrastructure and security systems. Our approach is practical and
              client-focused: understand the operational need, design a fitting solution, and
              deliver professional implementation with dependable support.
            </p>
            <ul className="split__list">
              {aboutHighlights.map((highlight) => (
                <li key={highlight}>
                  <Check size={18} strokeWidth={2.4} />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn btn--primary">
              Work With Us <ArrowRight size={17} />
            </Link>
          </div>
          <div className="split__visual">
            <AboutVisual />
          </div>
        </div>
      </section>

      <section className="section section--white" aria-labelledby="mission-heading">
        <div className="container">
          <SectionHeading
            id="mission-heading"
            eyebrow="Mission & Vision"
            title="Mission and Vision"
            center
            text="Proposed brand copy — editable by the company."
          />
          <div className="mission-grid">
            <div className="card mission-card">
              <h3>
                <Target size={24} />
                Our Mission
              </h3>
              <p>
                To deliver reliable, secure, and practical technology infrastructure solutions
                that empower organizations to operate more efficiently and confidently.
              </p>
            </div>
            <div className="card mission-card">
              <h3>
                <Telescope size={24} />
                Our Vision
              </h3>
              <p>
                To become a trusted technology and infrastructure solutions partner for
                organizations across Ethiopia and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="values-heading">
        <div className="container">
          <SectionHeading
            id="values-heading"
            eyebrow="Core Values"
            title="Our Core Values"
            text="The principles that guide every project, installation, and client relationship."
          />
          <div className="values-grid">
            {coreValues.map((value, index) => (
              <IconCard key={value.title} {...value} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white" aria-labelledby="approach-heading">
        <div className="container">
          <SectionHeading
            id="approach-heading"
            eyebrow="Our Approach"
            title="Our Approach to Technology Implementation"
            text="A structured, transparent delivery approach designed to reduce risk and produce solutions that genuinely fit the organization."
          />
          <div className="approach-grid">
            {approachItems.map((item, index) => (
              <IconCard key={item.title} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="about-industries-heading">
        <div className="container">
          <SectionHeading
            id="about-industries-heading"
            eyebrow="Industries We Serve"
            title="Industries We Serve"
            text="Dependable infrastructure supports every sector. AweraLink adapts its solutions to the operational needs of each industry."
          />
          <div className="grid-2">
            {industries.map((industry, index) => (
              <IndustryCard key={industry.title} {...industry} index={index} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
