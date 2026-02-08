import ContactForm from '../components/ContactForm';
import SocialLinks from '../components/SocialLinks';
import useScrollReveal from '../hooks/useScrollReveal';

const Contact = () => {
  const contentRef = useScrollReveal<HTMLDivElement>({ y: 24, stagger: 0.1, children: true, duration: 0.7 });

  return (
    <div className="section-container max-w-4xl pb-20">
      <div ref={contentRef} className="space-y-12">
        <h1 className="text-h1 text-brand-main">Contact</h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-h6 uppercase font-body font-medium tracking-wide text-tx-muted mb-2">Email</h2>
              <a
                href="mailto:cyril@example.com"
                className="text-h4 text-tx-primary hover:text-brand-main transition-colors duration-200"
              >
                cyril@example.com
              </a>
            </div>

            <div>
              <h2 className="text-h6 uppercase font-body font-medium tracking-wide text-tx-muted mb-2">Location</h2>
              <p className="text-h4 text-tx-secondary">Amsterdam, Netherlands</p>
            </div>

            <div>
              <h2 className="text-h6 uppercase font-body font-medium tracking-wide text-tx-muted mb-4">Connect</h2>
              <SocialLinks variant="vertical" />
            </div>
          </div>

          <div>
            <h2 className="text-h6 uppercase font-body font-medium tracking-wide text-tx-muted mb-4">Send a Message</h2>
            <ContactForm />
          </div>
        </div>

        <div className="pt-12 border-t border-brd">
          <p className="text-body text-tx-secondary leading-relaxed">
            For project inquiries, collaborations or general questions, feel free to reach out via the form or email.
            I'm always interested in discussing new opportunities and creative projects.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
