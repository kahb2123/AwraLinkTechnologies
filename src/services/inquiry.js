/**
 * Contact form submission handler.
 *
 * FRONTEND-ONLY DEMONSTRATION — this function does not send real email.
 *
 * To receive real inquiries, replace the body of this function with a
 * fetch() call to your backend API or an email-service endpoint
 * (for example Formspree, Netlify Forms, or a custom API endpoint),
 * then handle the response and any errors accordingly.
 */
export async function submitInquiry(payload) {
  await new Promise((resolve) => setTimeout(resolve, 900));
  console.info('Inquiry payload (demo only — connect a backend to send real inquiries):', payload);
  return { ok: true };
}
