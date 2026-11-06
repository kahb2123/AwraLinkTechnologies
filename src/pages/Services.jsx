import { useState } from 'react';
import PageMeta from '../components/PageMeta';
import PageHero from '../components/PageHero';
import ServiceDetail from '../components/ServiceDetail';
import ScrollReveal from '../components/ScrollReveal';
import CTASection from '../components/CTASection';
import SectionHeading from '../components/SectionHeading';
import ProcessList from '../components/ProcessList';
import IndustryCard from '../components/IndustryCard';
import { servicesDetailed, servicesOverview } from '../data/services';
import { industries } from '../data/industries';
import { processSteps } from '../data/process';

const categories = [
  { num: '01', name: 'Workplace & Collaboration', desc: 'Meeting rooms, smart classrooms, devices, VDI and office software.' },
  { num: '02', name: 'Networking & Connectivity', desc: 'LAN/WAN, Wi-Fi, SD-WAN, cabling and fiber.' },
  { num: '03', name: 'Enterprise Computing & Cloud Infrastructure', desc: 'Servers, storage, backup, private and hybrid cloud.' },
  { num: '04', name: 'Cybersecurity', desc: 'Firewalls, IAM, EDR, SIEM and compliance.' },
  { num: '05', name: 'Business Software & Digital Services', desc: 'ERP, custom apps, analytics, AI and consulting.' },
  { num: '06', name: 'Power & Energy', desc: 'UPS, generators, solar and energy storage.' },
  { num: '07', name: 'Data Center Facilities', desc: 'Design, cooling, raised floors and fire suppression.' },
  { num: '08', name: 'Smart Buildings & Physical Security', desc: 'CCTV, access control, alarms and building automation.' },
  { num: '09', name: 'Installation, Support & Managed Services', desc: 'Supply, install, integrate, support and manage.' },
];

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <>
      <PageMeta
        title="Services"
        description="AweraLink Technologies PLC provides integrated technology solutions across infrastructure, networking, security, power, data centers, smart buildings and managed services."
        path="/services"
      />

      <PageHero
        eyebrow="OUR TECHNOLOGY CAPABILITIES"
        title="Complete Technology Solutions for Modern Organizations"
        description="From enterprise infrastructure and secure connectivity to intelligent buildings, business software, and managed IT services, AweraLink delivers integrated technology solutions designed around your organization."
      />

      {/* Ecosystem diagram */}
      <section className="section services-ecosystem" aria-labelledby="ecosystem-heading">
        <div className="container">
          <SectionHeading
            eyebrow="Technology Ecosystem"
            title="How Our Services Work Together"
            description="Nine interconnected technology areas supporting your entire organization."
            align="center"
          />
          <div className="ecosystem">
            <div className="ecosystem__center">AWERALINK<br />TECHNOLOGIES PLC</div>
            {categories.map((c, i) => {
              const angle = (i / categories.length) * Math.PI * 2 - Math.PI / 2;
  const r = window.innerWidth < 768 ? 140 : 260;
              const x = Math.cos(angle) * r;
              const y = Math.sin(angle) * r;
              return (
                <button
                  key={c.name}
                  className={`ecosystem__node ${active === i ? 'is-active' : ''}`}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                  onClick={() => setActive(i)}
                >
                  <span className="ecosystem__num">{c.num}</span>
                  <span className="ecosystem__name">{c.name}</span>
                </button>
              );
            })}
            <svg className="ecosystem__lines" viewBox="-320 -320 640 640" aria-hidden="true">
              {categories.map((_, i) => {
                const angle = (i / categories.length) * Math.PI * 2 - Math.PI / 2;
    const r = window.innerWidth < 768 ? 140 : 260;
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r;
                return (
                  <line
                    key={i}
                    x1="0" y1="0" x2={x} y2={y}
                    className={active === i ? 'is-active' : ''}
                  />
                );
              })}
            </svg>
          </div>
          <div className="ecosystem__detail">
            <h3>{categories[active].name}</h3>
            <p>{categories[active].desc}</p>
            <a href="#service-detail" className="btn btn--primary">Explore This Service</a>
          </div>
        </div>
      </section>

      {/* Detailed sections */}
      <div id="service-detail">
        {servicesDetailed.map((service, index) => (
          <ScrollReveal key={service.title} delay={index * 100} variant="slide-left">
            <ServiceDetail {...service} index={index + 1} />
          </ScrollReveal>
        ))}
      </div>

      {/* Process */}
      <section className="section section--dark" aria-labelledby="process-heading">
        <div className="container">
          <SectionHeading
            eyebrow="How We Work"
            title="A proven delivery process"
            description="From consultation to ongoing support, we keep your technology running."
            align="center"
            light
          />
          <ProcessList steps={processSteps} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
