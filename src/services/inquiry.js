import { company } from '../config/company';

export async function submitInquiry(payload) {
  let response;
  try {
    response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(`Could not connect to the contact service. Please email ${company.contact.salesEmail} directly.`);
  }

  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error(`The contact service returned an unexpected response. Please email ${company.contact.salesEmail} directly.`);
  }

  if (!response.ok) {
    throw new Error(typeof result.error === 'string'
      ? result.error
      : `We could not submit your inquiry. Please try again or email ${company.contact.salesEmail} directly.`);
  }

  if (!result || result.ok !== true) {
    throw new Error(`The contact service did not confirm your inquiry. Please email ${company.contact.salesEmail} directly.`);
  }

  return { ok: true };
}
