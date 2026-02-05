import { useState, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';

// ─── EmailJS Configuration ───────────────────────────────────────────
// 1. Create a free account at https://www.emailjs.com
// 2. Add an email service (e.g. Gmail) and note the Service ID
// 3. Create an email template with variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
// 4. Replace the values below with your actual IDs
const EMAILJS_SERVICE_ID = 'service_l8pklkv';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
// ─────────────────────────────────────────────────────────────────────

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'michel.vdput@live.nl',
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });

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
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-body-sm font-medium text-tx-secondary mb-2">
          Naam
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-body-sm font-medium text-tx-secondary mb-2">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-body-sm font-medium text-tx-secondary mb-2">
          Onderwerp
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-body-sm font-medium text-tx-secondary mb-2">
          Bericht
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="input-field resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn btn-primary btn-lg w-full"
      >
        {status === 'sending' && 'Verzenden...'}
        {status === 'sent' && 'Bericht Verzonden!'}
        {(status === 'idle' || status === 'error') && 'Verstuur Bericht'}
      </button>

      {status === 'sent' && (
        <p className="text-body-sm text-state-success text-center">
          Bedankt voor je bericht. Ik neem zo snel mogelijk contact met je op!
        </p>
      )}

      {status === 'error' && (
        <p className="text-body-sm text-state-error text-center">
          Er is iets misgegaan. Probeer het opnieuw of stuur direct een e-mail.
        </p>
      )}
    </form>
  );
};

export default ContactForm;
