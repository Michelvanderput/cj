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
              <h2 className="text-h6 uppercase font-body font-medium tracking-wide text-tx-muted mb-2">E-mail</h2>
              <a
                href="mailto:cyril@example.com"
                className="text-h4 text-tx-primary hover:text-brand-main transition-colors duration-200"
              >
                cyril@example.com
              </a>
            </div>

            <div>
              <h2 className="text-h6 uppercase font-body font-medium tracking-wide text-tx-muted mb-2">Locatie</h2>
              <p className="text-h4 text-tx-secondary">Amsterdam, Nederland</p>
            </div>

            <div>
              <h2 className="text-h6 uppercase font-body font-medium tracking-wide text-tx-muted mb-4">Verbinden</h2>
              <SocialLinks variant="vertical" />
            </div>
          </div>

          <div>
            <h2 className="text-h6 uppercase font-body font-medium tracking-wide text-tx-muted mb-4">Stuur een Bericht</h2>
            <ContactForm />
          </div>
        </div>

        <div className="pt-12 border-t border-brd">
          <p className="text-body text-tx-secondary leading-relaxed">
            Voor projectaanvragen, samenwerkingen of algemene vragen, neem gerust contact op via het formulier of e-mail.
            Ik ben altijd geïnteresseerd in het bespreken van nieuwe mogelijkheden en creatieve projecten.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
