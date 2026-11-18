import { company } from '../config/company';

export async function submitInquiry(payload) {
  const body = [
    `Name: ${payload.fullName}`,
    `Organization: ${payload.organization}`,
    `Work email: ${payload.email}`,
    `Phone: ${payload.phone || 'Not provided'}`,
    `Service: ${payload.service}`,
    `Budget: ${payload.budget || 'Not provided'}`,
    '',
    'Message:',
    payload.message,
  ].join('\n');
  const subject = `Website inquiry from ${payload.fullName}`;
  const mailto = `mailto:${company.contact.salesEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;
  return { ok: true };
}
