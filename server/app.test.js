import assert from 'node:assert/strict';
import { once } from 'node:events';
import test from 'node:test';
import { createApp, validateInquiry } from './contact-app.js';

const validInquiry = {
  fullName: 'Test User',
  organization: 'Example Organization',
  email: 'test@example.com',
  phone: '',
  service: 'networking',
  budget: '',
  message: 'This is a test inquiry.',
  consent: true,
  website: '',
};

test('validateInquiry rejects invalid email and missing consent', () => {
  assert.equal(validateInquiry({ ...validInquiry, email: 'not-an-email' }).ok, false);
  assert.equal(validateInquiry({ ...validInquiry, consent: false }).ok, false);
});

test('valid contact POST sends mail and confirms success', async () => {
  let sentFields;
  const app = createApp({
    getConfig: () => ({ config: { mailTo: 'sales@awralink.com' }, missing: [] }),
    sendMail: async (_config, fields) => {
      sentFields = fields;
      return { messageId: 'test-message-id' };
    },
  });
  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');

  try {
    const response = await fetch(`http://127.0.0.1:${server.address().port}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validInquiry),
    });

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(sentFields.email, validInquiry.email);
  } finally {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
});
