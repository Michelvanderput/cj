import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ContactForm from '../components/ContactForm';
import SocialLinks from '../components/SocialLinks';

const Contact = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 pb-20">
      <div ref={contentRef} className="space-y-12">
        <h1 className="text-4xl font-light tracking-tight">Contact</h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-medium tracking-wide text-neutral-500 mb-2">Email</h2>
              <a
                href="mailto:cyril@example.com"
                className="text-xl hover:opacity-60 transition-opacity"
              >
                cyril@example.com
              </a>
            </div>

            <div>
              <h2 className="text-sm font-medium tracking-wide text-neutral-500 mb-2">Location</h2>
              <p className="text-xl text-neutral-700">Amsterdam, Netherlands</p>
            </div>

            <div>
              <h2 className="text-sm font-medium tracking-wide text-neutral-500 mb-4">Connect</h2>
              <SocialLinks variant="vertical" />
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium tracking-wide text-neutral-500 mb-4">Send a Message</h2>
            <ContactForm />
          </div>
        </div>

        <div className="pt-12 border-t border-neutral-200">
          <p className="text-neutral-600 leading-relaxed">
            For project inquiries, collaborations, or general questions, please reach out via the form or email.
            I'm always interested in discussing new opportunities and creative projects.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
