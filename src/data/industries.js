import { Landmark, Building2, Briefcase, Globe2 } from 'lucide-react';

export const industries = [
  {
    icon: Landmark,
    title: 'Banking & Financial Services',
    short: 'Secure, always-available infrastructure for transactions, branch connectivity, and compliance.',
    description:
      'Banks and financial institutions depend on secure, always-available infrastructure for transactions, branch connectivity, and regulatory compliance. Dependable networking, layered security, and protected power help keep financial services available and resilient.',
    needs: [
      'Secure network perimeter and branch connectivity (LAN/WAN)',
      'Server room and data center infrastructure',
      'UPS and power protection for critical systems',
      'CCTV and access control for branches and offices',
      'Network optimization and troubleshooting support',
    ],
  },
  {
    icon: Building2,
    title: 'Government & Public Institutions',
    short: 'Reliable infrastructure for digital services, records, and secure communications.',
    description:
      'Government organizations need reliable infrastructure to deliver digital services, safeguard records, and maintain secure communications. Structured cabling, network security, and protected power support dependable public operations.',
    needs: [
      'Structured cabling and network infrastructure for offices',
      'Network security equipment and configuration',
      'Reliable power protection for digital services',
      'Video surveillance and access control for public facilities',
      'Equipment supply and procurement support',
    ],
  },
  {
    icon: Briefcase,
    title: 'Private Sector & Enterprises',
    short: 'Scalable infrastructure to support growth, collaboration, and daily operations.',
    description:
      'Private companies and enterprises depend on scalable infrastructure to support growth, collaboration, and day-to-day operations. AweraLink delivers networking, IT infrastructure, and equipment supply with professional installation and support.',
    needs: [
      'Enterprise LAN/WAN design and implementation',
      'Wireless networking and office connectivity',
      'IT infrastructure planning and rack installation',
      'Technology equipment supply',
      'Installation, integration, and ongoing support',
    ],
  },
  {
    icon: Globe2,
    title: 'NGOs & Development Organizations',
    short: 'Dependable connectivity and power for program coordination and data sharing.',
    description:
      'Development organizations require dependable connectivity and power to coordinate programs, share data, and serve communities — including in areas with challenging infrastructure. AweraLink adapts solutions to the operational realities of the field.',
    needs: [
      'Reliable networking for offices and remote sites',
      'Power protection and backup for critical systems',
      'Equipment sourcing and supply logistics',
      'System configuration and integration',
      'Technical support and troubleshooting',
    ],
  },
];
