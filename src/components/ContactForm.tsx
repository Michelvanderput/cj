import { useState, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';

// ─── EmailJS Configuration ───────────────────────────────────────────
// Set these in a .env file (see .env.example):
//   VITE_EMAILJS_SERVICE_ID=service_xxx
//   VITE_EMAILJS_TEMPLATE_ID=template_xxx
//   VITE_EMAILJS_PUBLIC_KEY=xxx
// ─────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '';

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (data: { name: string; email: string; subject: string; message: string }): FieldErrors => {
  const errors: FieldErrors = {};
  if (data.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.';
  if (!EMAIL_RE.test(data.email)) errors.email = 'Please enter a valid email address.';
  if (data.subject.trim().length < 2) errors.subject = 'Subject must be at least 2 characters.';
  if (data.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.';
  return errors;
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const fieldErrors = validate(formData);
    setErrors(fieldErrors);
    setTouched({ name: true, email: true, subject: true, message: true });

    if (Object.keys(fieldErrors).length > 0) return;

    setStatus('sending');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          title: formData.subject,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      setTouched({});

      setTimeout(() => {
        setStatus('idle');
      }, 4000);
    } catch {
      setStatus('error');

      setTimeout(() => {
        setStatus('idle');
      }, 4000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const next = { ...formData, [name]: value };
    setFormData(next);
    if (touched[name]) {
      const fieldErrors = validate(next);
      setErrors(prev => ({ ...prev, [name]: fieldErrors[name as keyof FieldErrors] }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const fieldErrors = validate(formData);
    setErrors(prev => ({ ...prev, [name]: fieldErrors[name as keyof FieldErrors] }));
  };

  const fieldError = (field: keyof FieldErrors) =>
    touched[field] && errors[field] ? errors[field] : undefined;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="block text-body-sm font-medium text-tx-secondary mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          aria-invalid={!!fieldError('name')}
          aria-describedby={fieldError('name') ? 'name-error' : undefined}
          className="input-field"
        />
        {fieldError('name') && (
          <p id="name-error" className="text-caption text-state-error mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-body-sm font-medium text-tx-secondary mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          aria-invalid={!!fieldError('email')}
          aria-describedby={fieldError('email') ? 'email-error' : undefined}
          className="input-field"
        />
        {fieldError('email') && (
          <p id="email-error" className="text-caption text-state-error mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-body-sm font-medium text-tx-secondary mb-2">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          aria-invalid={!!fieldError('subject')}
          aria-describedby={fieldError('subject') ? 'subject-error' : undefined}
          className="input-field"
        />
        {fieldError('subject') && (
          <p id="subject-error" className="text-caption text-state-error mt-1">{errors.subject}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-body-sm font-medium text-tx-secondary mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          rows={6}
          aria-invalid={!!fieldError('message')}
          aria-describedby={fieldError('message') ? 'message-error' : undefined}
          className="input-field resize-none"
        />
        {fieldError('message') && (
          <p id="message-error" className="text-caption text-state-error mt-1">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn btn-primary btn-lg w-full"
      >
        {status === 'sending' && 'Sending...'}
        {status === 'sent' && 'Message Sent!'}
        {(status === 'idle' || status === 'error') && 'Send Message'}
      </button>

      {status === 'sent' && (
        <p role="status" className="text-body-sm text-state-success text-center">
          Thank you for your message. I'll get back to you as soon as possible!
        </p>
      )}

      {status === 'error' && (
        <p role="alert" className="text-body-sm text-state-error text-center">
          Something went wrong. Please try again or send an email directly.
        </p>
      )}
    </form>
  );
};

export default ContactForm;
