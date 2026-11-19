import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import PageHero from '../components/PageHero';
import ContactForm from '../components/ContactForm';
import { company } from '../config/company';

export default function Contact() {
  const { phone, phoneHref, email, emailHref, salesEmail, salesEmailHref } = company.contact;
  const { hours } = company;

  return (
    <>
      <PageMeta
        title="Contact"
        description="Contact details, office location, phone, email, and business hours for AwraLink Technologies in Addis Ababa, Ethiopia."
        path="/contact"
      />

      <PageHero
        title="Let's Discuss Your Technology Needs"
      />

      <section className="section" aria-label="Contact details and inquiry form">
        <div className="container contact-layout">
          <div className="contact-intro">
            <p className="lead">
              Our head office is located in Addis Ababa around Mexico, Kirkos Sub City, Woreda 10. Reach out by phone, email, or through
              the inquiry form — or visit us at our office.
            </p>

            <div className="card office-card">
              <p className="office-card__title">
                <MapPin size={20} />
                Head Office
              </p>
              <p className="office-card__address">
                AwraLink Technologies
                <br />
                {company.location.addressLines[0]}
                <br />
                {company.location.addressLines[1]}
              </p>
            </div>

            <div className="card contact-rows">
              <div className="contact-row">
                <span className="icon-chip">
                  <Phone size={20} />
                </span>
                <div>
                  <span className="contact-row__label">Phone</span>
                  {phoneHref ? (
                    <a className="contact-row__value" href={phoneHref}>{phone}</a>
                  ) : (
                    <span className="contact-row__value">{phone}</span>
                  )}
                </div>
              </div>
              <div className="contact-row">
                <span className="icon-chip">
                  <Mail size={20} />
                </span>
                <div>
                  <span className="contact-row__label">Email (General)</span>
                  {emailHref ? (
                    <a className="contact-row__value" href={emailHref}>{email}</a>
                  ) : (
                    <span className="contact-row__value">{email}</span>
                  )}
                </div>
              </div>
              <div className="contact-row">
                <span className="icon-chip">
                  <Mail size={20} />
                </span>
                <div>
                  <span className="contact-row__label">Sales &amp; Consultation</span>
                  {salesEmailHref ? (
                    <a className="contact-row__value" href={salesEmailHref}>{salesEmail}</a>
                  ) : (
                    <span className="contact-row__value">{salesEmail}</span>
                  )}
                </div>
              </div>
              <div className="contact-row">
                <span className="icon-chip">
                  <Clock size={20} />
                </span>
                <div>
                  <span className="contact-row__label">Business Hours</span>
                  <span className="contact-row__value">{hours}</span>
                </div>
              </div>
            </div>

            <div className="contact-map">
              <iframe
                title="Map showing the AwraLink Technologies office location in Addis Ababa, Ethiopia"
                src={company.map.embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="contact-map__action">
                <span>{company.location.fullAddress}</span>
                <a
                  href={company.map.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline-navy btn--sm"
                >
                  Open in Google Maps <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </div>

          <div className="card form-card">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
