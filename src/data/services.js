import { Server, Network, ShieldCheck, Zap, Package, Wrench } from 'lucide-react';

export const serviceOptions = [
  { value: 'it-infrastructure', label: 'IT Infrastructure Solutions' },
  { value: 'network-solutions', label: 'Network Solutions' },
  { value: 'security-systems', label: 'Security Systems' },
  { value: 'power-solutions', label: 'Power Solutions' },
  { value: 'equipment-supply', label: 'Technology Equipment Supply' },
  { value: 'installation-support', label: 'Installation, Integration & Technical Support' },
];

export const servicesOverview = [
  {
    icon: Server,
    title: 'IT Infrastructure Solutions',
    description: 'Planning, deployment, and integration of reliable IT infrastructure for enterprises and institutions.',
    to: '/services#service-1',
  },
  {
    icon: Network,
    title: 'Network Solutions',
    description: 'Enterprise LAN/WAN implementation, wireless networking, and network design and configuration.',
    to: '/services#service-2',
  },
  {
    icon: ShieldCheck,
    title: 'Security Systems',
    description: 'Firewalls, CCTV surveillance, and access control systems that protect people, data, and assets.',
    to: '/services#service-3',
  },
  {
    icon: Zap,
    title: 'Power & Electrical Infrastructure',
    description: 'UPS systems, power distribution, and power protection that keep critical systems running.',
    to: '/services#service-4',
  },
  {
    icon: Package,
    title: 'Technology Equipment Supply',
    description: 'Sourcing and supply of enterprise networking, security, and infrastructure equipment.',
    to: '/services#service-5',
  },
  {
    icon: Wrench,
    title: 'Installation, Integration & Support',
    description: 'Professional installation, configuration, integration, and ongoing technical support.',
    to: '/services#service-6',
  },
];

export const servicesDetailed = [
  {
    icon: Server,
    slug: 'it-infrastructure',
    title: 'IT Infrastructure Solutions',
    description:
      'AweraLink plans and implements IT infrastructure that supports day-to-day operations and future growth. From structured cabling and rack installation to server room and data center infrastructure, we handle equipment installation, configuration, integration, and testing so your environment is ready to run.',
    capabilities: [
      'IT infrastructure planning and implementation',
      'Structured cabling and rack installation',
      'Server room and data center infrastructure',
      'Equipment installation and configuration',
      'Infrastructure integration and testing',
    ],
  },
  {
    icon: Network,
    slug: 'network-solutions',
    title: 'Network Solutions',
    description:
      'Reliable connectivity is the backbone of modern operations. AweraLink delivers enterprise LAN and WAN implementations, wireless networking, and network design and configuration using switches, routers, and access points — supported by optimization and troubleshooting.',
    capabilities: [
      'Enterprise LAN and WAN implementation',
      'Network switches and routers',
      'Wireless networking and access points',
      'Network design and configuration',
      'Network optimization and troubleshooting',
    ],
  },
  {
    icon: ShieldCheck,
    slug: 'security-systems',
    title: 'Security Systems',
    description:
      'Protect your people, data, and assets with layered security. AweraLink supplies and configures network firewalls and perimeter security, CCTV and video surveillance, and access control systems — integrated into a cohesive security infrastructure.',
    capabilities: [
      'Network firewall and perimeter security solutions',
      'Network security equipment supply and configuration',
      'CCTV and video surveillance systems',
      'Access control systems',
      'Security infrastructure integration',
    ],
  },
  {
    icon: Zap,
    slug: 'power-solutions',
    title: 'Power Solutions',
    description:
      'Keep critical systems running through outages and power fluctuations. AweraLink provides UPS systems and backup power, power distribution equipment, and power protection and stabilization — planned and installed for IT environments that cannot afford downtime.',
    capabilities: [
      'UPS systems and backup power',
      'Power distribution equipment',
      'Power protection and stabilization',
      'Infrastructure power planning and installation',
      'Power continuity solutions for IT environments',
    ],
  },
  {
    icon: Package,
    slug: 'equipment-supply',
    title: 'Technology Equipment Supply',
    description:
      'Source the right equipment from a single partner. AweraLink supplies enterprise networking equipment, security devices and systems, IT infrastructure equipment, and power protection equipment — along with related accessories and implementation materials.',
    capabilities: [
      'Enterprise networking equipment',
      'Security devices and systems',
      'IT infrastructure equipment',
      'Power protection equipment',
      'Related accessories and implementation materials',
    ],
  },
  {
    icon: Wrench,
    slug: 'installation-support',
    title: 'Installation, Integration and Technical Support',
    description:
      'Professional delivery makes technology work. AweraLink provides equipment installation, system configuration, and integration and interoperability testing, followed by commissioning and handover — with maintenance, troubleshooting, and technical support based on agreed service arrangements.',
    capabilities: [
      'Equipment installation',
      'System configuration',
      'Integration and interoperability testing',
      'Commissioning and handover',
      'Maintenance and troubleshooting',
      'Technical support based on agreed service arrangements',
    ],
  },
];
