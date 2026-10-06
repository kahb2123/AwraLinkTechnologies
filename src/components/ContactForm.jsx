import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, CheckCircle2, Info } from 'lucide-react';
import { serviceOptions } from '../data/services';
import { submitInquiry } from '../services/inquiry';

const INITIAL_FORM = {
  fullName: '',
  organization: '',
  email: '',
  phone: '',
  service: '',
  budget: '',
  message: '',
  consent: false,
};

function Field({ label, htmlFor, required = false, error, hint, children }) {
  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <label htmlFor={htmlFor}>
        {label}
        {required && <span className="required-star" aria-hidden="true"> *</span>}
      </label>
      {children}
      {error ? (
        <p className="field__error" role="alert">{error}</p>
      ) : (
        hint && <p className="field__hint">{hint}</p>
      )}
    </div>
  );
}

function validate(values) {
  const errors = {};

  if (!values.fullName.trim() || values.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  if (!values.organization.trim()) {
    errors.organization = 'Please enter your organization name.';
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your work email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (values.phone.trim() && !/^[+()\-.\s\d]{7,20}$/.test(values.phone.trim())) {
    errors.phone = 'Please enter a valid phone number, or leave it empty.';
  }

  if (!values.service) {
    errors.service = 'Please select a service of interest.';
  }

  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = 'Please describe your project or requirements (at least 10 characters).';
  }

  if (!values.consent) {
    errors.consent = 'Please confirm that you agree to be contacted about your inquiry.';
  }

  return errors;
}

export default function ContactForm() {
  const [searchParams] = useSearchParams();
  const preselect = searchParams.get('service') || '';

  const [form, setForm] = useState(() => ({
    ...INITIAL_FORM,
    service: serviceOptions.some((option) => option.value === preselect) ? preselect : '',
  }));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (preselect && serviceOptions.some((option) => option.value === preselect)) {
      setForm((previous) => ({ ...previous, service: preselect }));
    }
  }, [preselect]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstField = Object.keys(validationErrors)[0];
      document.querySelector(`[name="${firstField}"]`)?.focus();
      return;
    }

    setStatus('submitting');
    try {
      await submitInquiry(form);
      setStatus('success');
    } catch {
      setSubmitError('Something went wrong while sending your inquiry. Please try again or contact us directly.');
      setStatus('idle');
    }
  };

  const handleReset = () => {
    setForm({ ...INITIAL_FORM });
    setErrors({});
    setSubmitError('');
    setStatus('idle');
  };

  if (status === 'success') {
    return (
      <div className="form-success" role="status">
        <span className="icon-chip form-success__icon">
          <CheckCircle2 size={32} />
        </span>
        <h3>Inquiry received</h3>
        <p>
          Thank you{form.fullName.trim() ? `, ${form.fullName.trim().split(' ')[0]}` : ''}.
          Your inquiry has been recorded in this demonstration form.
        </p>
        <p className="form-success__note">
          <strong>Demo notice:</strong> this form currently runs in frontend-only mode and does not send real email.
          Connect it to an email service or backend API to receive actual inquiries — see the project README.
        </p>
        <button type="button" className="btn btn--outline-navy" onClick={handleReset}>
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <>
      <h2>Send an Inquiry</h2>
      <p>Fields marked with an asterisk (*) are required. Our team reviews inquiries and responds based on agreed service arrangements.</p>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <Field label="Full Name" htmlFor="fullName" required error={errors.fullName}>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            autoComplete="name"
            aria-invalid={errors.fullName ? 'true' : 'false'}
          />
        </Field>

        <Field label="Organization Name" htmlFor="organization" required error={errors.organization}>
          <input
            type="text"
            id="organization"
            name="organization"
            value={form.organization}
            onChange={handleChange}
            placeholder="Enter your organization name"
            autoComplete="organization"
            aria-invalid={errors.organization ? 'true' : 'false'}
          />
        </Field>

        <Field label="Work Email" htmlFor="email" required error={errors.email}>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="name@organization.com"
            autoComplete="email"
            aria-invalid={errors.email ? 'true' : 'false'}
          />
        </Field>

        <Field label="Phone Number" htmlFor="phone" error={errors.phone} hint="Optional — include country code, e.g. +251">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+251 ..."
            autoComplete="tel"
            aria-invalid={errors.phone ? 'true' : 'false'}
          />
        </Field>

        <Field label="Service of Interest" htmlFor="service" required error={errors.service}>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={handleChange}
            aria-invalid={errors.service ? 'true' : 'false'}
          >
            <option value="">Select a service</option>
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Project Budget" htmlFor="budget" hint="Optional">
          <input
            type="text"
            id="budget"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            placeholder="e.g., ETB 500,000 – 1,000,000"
          />
        </Field>

        <Field label="Message / Project Requirements" htmlFor="message" required error={errors.message}>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us about your infrastructure needs, timeline, and any questions."
            aria-invalid={errors.message ? 'true' : 'false'}
          />
        </Field>

        <div className={`field field--full ${errors.consent ? 'field--error' : ''}`}>
          <label className="consent" htmlFor="consent">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
              aria-invalid={errors.consent ? 'true' : 'false'}
            />
            <span>
              I agree that AweraLink Technologies PLC may contact me about this inquiry using the details I provided.
            </span>
          </label>
          {errors.consent && (
            <p className="field__error" role="alert">{errors.consent}</p>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn--primary btn--block" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : (
              <>
                Send Inquiry <Send size={17} />
              </>
            )}
          </button>
          {submitError && (
            <p className="form-error-banner" role="alert">{submitError}</p>
          )}
          <p className="form-demo-note">
            <Info size={15} />
            <span>
              Demonstration form: inquiries are recorded locally until an email service or backend API is connected.
            </span>
          </p>
        </div>
      </form>
    </>
  );
}
