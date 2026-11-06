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
  { icon: Users, title: 'Workplace & Collaboration', description: 'Meeting rooms, displays, video conferencing, smart classrooms, devices and office software for modern workplaces.', advantages: ['Boosts team productivity', 'Seamless hybrid collaboration', 'Modern classroom experiences'], to: '/services#service-1' },
  { icon: Network, title: 'Networking & Connectivity', description: 'Enterprise LAN/WAN, Wi-Fi, SD-WAN, cabling and fiber optic connectivity.', advantages: ['High-speed reliable connectivity', 'Scalable branch integration', 'Reduced network downtime'], to: '/services#service-2' },
  { icon: Cloud, title: 'Enterprise Computing & Cloud Infrastructure', description: 'Servers, storage, backup, private and hybrid cloud infrastructure.', advantages: ['Flexible scalable compute', 'Data protection and recovery', 'Optimized cost efficiency'], to: '/services#service-3' },
  { icon: ShieldCheck, title: 'Cybersecurity', description: 'Firewalls, identity and access management, endpoint protection, SIEM and compliance.', advantages: ['Proactive threat defense', 'Regulatory compliance', 'Protected business data'], to: '/services#service-4' },
  { icon: Server, title: 'Business Software & Digital Services', description: 'ERP, custom applications, analytics, AI and digital transformation consulting.', advantages: ['Streamlined operations', 'Data-driven decisions', 'Faster digital transformation'], to: '/services#service-5' },
  { icon: Zap, title: 'Power & Energy', description: 'UPS, generators, solar systems and energy storage for power continuity.', advantages: ['Uninterrupted power supply', 'Lower energy costs', 'Sustainable operations'], to: '/services#service-6' },
  { icon: Building2, title: 'Data Center Facilities', description: 'Data center design, precision cooling, raised floors and fire suppression.', advantages: ['Optimized cooling efficiency', 'Maximum uptime', 'Safe equipment housing'], to: '/services#service-7' },
  { icon: Package, title: 'Smart Buildings & Physical Security', description: 'CCTV, access control, alarms and building automation systems.', advantages: ['Enhanced site security', 'Automated facility control', 'Real-time monitoring'], to: '/services#service-8' },
  { icon: Wrench, title: 'Installation, Support & Managed Services', description: 'Equipment supply, installation, integration, support and managed IT services.', advantages: ['Expert professional delivery', 'Ongoing reliable support', 'Reduced internal IT burden'], to: '/services#service-9' },
];

export const servicesDetailed = servicesOverview.map((s, i) => ({
  icon: s.icon,
  slug: s.title.toLowerCase().replace(/[^a-z]+/g, '-'),
  title: s.title,
  description: s.description,
  capabilities: [],
  advantages: s.advantages,
}));