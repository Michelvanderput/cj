import { useState, type FormEvent } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900 transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-neutral-900 text-white py-3 px-6 hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' && 'Sending...'}
        {status === 'sent' && 'Message Sent!'}
        {(status === 'idle' || status === 'error') && 'Send Message'}
      </button>

      {status === 'sent' && (
        <p className="text-sm text-green-700 text-center">
          Thank you for your message. I'll get back to you soon!
        </p>
      )}
    </form>
  );
};

export default ContactForm;
