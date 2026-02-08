import useScrollReveal from '../hooks/useScrollReveal';
import OptimizedImage from '../components/OptimizedImage';
import { DISCIPLINES } from '../data/disciplines';

const About = () => {
  const contentRef = useScrollReveal<HTMLDivElement>({ y: 24, stagger: 0.1, children: true, duration: 0.7 });

  return (
    <div className="section-container max-w-5xl pb-20">
      <div ref={contentRef} className="space-y-10">
        <h1 className="text-h1 text-brand-main">Over</h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
          {/* Text — 3 columns */}
          <div className="md:col-span-3 space-y-6">
            <p className="text-body-lg text-tx-primary leading-relaxed">
              Cyril Jansen is een Foley artist, sound designer en recording engineer gespecialiseerd
              in film-, televisie- en commerciële producties.
            </p>

            <p className="text-body text-tx-secondary leading-relaxed">
              Vanuit Amsterdam werkt Cyril vanuit zijn eigen professionele studio, uitgerust met
              state-of-the-art opname- en sound design faciliteiten. Met uitgebreide ervaring
              in internationale producties brengt hij een zorgvuldige aanpak naar elk project,
              waarbij geluid het verhaal en de emotionele impact van het visuele medium versterkt.
            </p>

            <p className="text-body text-tx-secondary leading-relaxed">
              Zijn expertise omvat het volledige spectrum van post-productie geluid, van gedetailleerd
              Foley-werk dat scènes tot leven brengt, tot uitgebreid sound design dat het sonische
              landschap van films en series vormgeeft. Cyril heeft samengewerkt met regisseurs,
              producenten en post-productiestudio's in heel Europa en daarbuiten, en bijgedragen
              aan een divers scala aan projecten waaronder speelfilms, televisieseries, documentaires
              en commercials.
            </p>

            <p className="text-body text-tx-secondary leading-relaxed">
              Met een toewijding aan technische excellentie en creatieve innovatie blijft Cyril de
              grenzen verleggen van wat geluid kan bereiken in storytelling, waardoor hij een
              vertrouwde partner is voor filmmakers die op zoek zijn naar de hoogste kwaliteit
              audioproductie.
            </p>

            {/* CV download — plaats CV als public/docs/cv-cyril-jansen.pdf */}
            <a
              href="/docs/cv-cyril-jansen.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-md inline-flex"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download CV
            </a>
          </div>

          {/* Image — 2 columns */}
          {/* Replace the src below with an actual photo, e.g. /img/about.jpg */}
          <div className="md:col-span-2">
            <div className="aspect-[3/4] rounded-lg overflow-hidden border border-brd bg-surface-elevated relative">
              <OptimizedImage
                src="/img/about.jpg"
                alt="Cyril Jansen in de studio"
                className="absolute inset-0 w-full h-full object-cover"
                fallback={
                  <div className="absolute inset-0 flex items-center justify-center text-tx-muted text-body-sm text-center px-4">
                    Plaats foto in public/img/about.jpg
                  </div>
                }
              />
            </div>
          </div>
        </div>

        {/* Disciplines */}
        <div className="pt-10 border-t border-brd">
          <h2 className="text-h3 text-tx-primary mb-8">Wat ik doe</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DISCIPLINES.map((d) => (
              <div
                key={d.id}
                className="p-6 bg-surface-card border border-brd rounded-lg transition-all duration-225 hover:border-brd-hover hover:shadow-card"
              >
                <h3 className="font-heading text-h4 text-brand-main mb-3">{d.label}</h3>
                <p className="text-body-sm text-tx-secondary leading-relaxed">{d.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Studio */}
        <div className="pt-10 border-t border-brd">
          <h2 className="text-h3 text-tx-primary mb-4">Studio</h2>
          <p className="text-body text-tx-secondary">
            Professionele opname- en sound design studio gevestigd in Amsterdam, Nederland.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
