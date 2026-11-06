import { Server, Network, ShieldCheck, Zap, Package, Wrench, Users, Cloud, Building2 } from 'lucide-react';

export const serviceOptions = [
  { value: 'workplace-collaboration', label: 'Workplace & Collaboration' },
  { value: 'networking-connectivity', label: 'Networking & Connectivity' },
  { value: 'enterprise-computing-cloud', label: 'Enterprise Computing & Cloud Infrastructure' },
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'business-software', label: 'Business Software & Digital Services' },
  { value: 'power-energy', label: 'Power & Energy' },
  { value: 'data-center-facilities', label: 'Data Center Facilities' },
  { value: 'smart-buildings', label: 'Smart Buildings & Physical Security' },
  { value: 'installation-support', label: 'Installation, Support & Managed Services' },
];

export const servicesOverview = [
  { icon: Users, title: 'Workplace & Collaboration', description: 'Meeting rooms, displays, video conferencing, smart classrooms, devices and office software.', to: '/services#service-1' },
  { icon: Network, title: 'Networking & Connectivity', description: 'Enterprise LAN/WAN, Wi-Fi, SD-WAN, cabling and fiber optic.', to: '/services#service-2' },
  { icon: Cloud, title: 'Enterprise Computing & Cloud Infrastructure', description: 'Servers, storage, backup, private and hybrid cloud.', to: '/services#service-3' },
  { icon: ShieldCheck, title: 'Cybersecurity', description: 'Firewalls, IAM, EDR, SIEM and compliance.', to: '/services#service-4' },
  { icon: Server, title: 'Business Software & Digital Services', description: 'ERP, custom apps, analytics, AI and consulting.', to: '/services#service-5' },
  { icon: Zap, title: 'Power & Energy', description: 'UPS, generators, solar and energy storage.', to: '/services#service-6' },
  { icon: Building2, title: 'Data Center Facilities', description: 'Design, cooling, raised floors and fire suppression.', to: '/services#service-7' },
  { icon: Package, title: 'Smart Buildings & Physical Security', description: 'CCTV, access control, alarms and building automation.', to: '/services#service-8' },
  { icon: Wrench, title: 'Installation, Support & Managed Services', description: 'Supply, install, integrate, support and manage.', to: '/services#service-9' },
];

export const servicesDetailed = servicesOverview.map((s, i) => ({
  icon: s.icon,
  slug: s.title.toLowerCase().replace(/[^a-z]+/g, '-'),
  title: s.title,
  description: s.description,
  capabilities: [s.description],
}));