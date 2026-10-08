import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, Youtube, Globe } from 'lucide-react';
import Logo from './Logo';
import { company, navLinks } from '../config/company';
import { servicesOverview } from '../data/services';

const SOCIAL_ICONS = { Facebook, Twitter, LinkedIn: Linkedin, YouTube: Youtube, Globe };

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__main">
          <div className="footer__brand">
            <Link to="/" aria-label="AwraLink Technologies PLC — Home">
              <Logo variant="light" />
            </Link>
            <p>{company.description}</p>
            <div className="footer__social">
              {company.social.map((item) => {
                const Icon = SOCIAL_ICONS[item.name] || Globe;
                return (
                  <a
                    key={item.name}
                    href={item.url || '#'}
                    aria-label={item.url ? `AwraLink on ${item.name}` : `${item.name} profile (link not configured)`}
                    title={item.url ? item.name : `Add your ${item.name} URL in src/config/company.js`}
                    onClick={(event) => {
                      if (!item.url) event.preventDefault();
                    }}
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>
          </div>

          <nav aria-label="Footer quick links">
            <h4>Quick Links</h4>
            <ul className="footer__links">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer service links">
            <h4>Services</h4>
            <ul className="footer__links">
              {servicesOverview.map((service) => (
                <li key={service.title}>
                  <Link to={service.to}>{service.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4>Contact</h4>
            <ul className="footer__contact">
              <li>
                <MapPin size={17} />
                <span>{company.location.fullAddress}</span>
              </li>
              <li>
                <Phone size={17} />
                <span>{company.contact.phone}</span>
              </li>
              <li>
                <Mail size={17} />
                <span>{company.contact.email}</span>
              </li>
              <li>
                <Clock size={17} />
                <span>{company.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} {company.name}. All rights reserved.</span>
          <span>Technology &amp; Infrastructure Solutions — Addis Ababa, Ethiopia</span>
        </div>
      </div>
    </footer>
  );
}
