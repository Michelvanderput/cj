import useScrollReveal from '../hooks/useScrollReveal';
import OptimizedImage from '../components/OptimizedImage';

const Bio = () => {
  const contentRef = useScrollReveal<HTMLDivElement>({ y: 24, stagger: 0.1, children: true, duration: 0.7 });

  return (
    <div className="section-container max-w-5xl pb-20">
      <div ref={contentRef} className="space-y-10">
        <h1 className="text-h1 text-brand-main">Bio</h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
          {/* Photo — shows first on mobile via order-first */}
          <div className="order-first md:order-last md:col-span-2">
            <div className="aspect-[3/4] rounded-lg overflow-hidden border border-brd bg-surface-elevated relative">
              <OptimizedImage
                src="/img/CAT_BIO/CJ_STUART_SELFIE.jpg"
                alt="Cyril Jansen"
                className="absolute inset-0 w-full h-full object-cover"
                fallback={
                  <div className="absolute inset-0 flex items-center justify-center text-tx-muted text-body-sm text-center px-4">
                    Place photo at public/img/about.jpg
                  </div>
                }
              />
            </div>
          </div>

          {/* Text */}
          <div className="md:col-span-3 space-y-6">
            <p className="text-body-lg text-tx-primary leading-relaxed">
              Cyril Jansen is a Foley artist, sound designer and recording engineer specializing
              in film, television and commercial productions.
            </p>

            <p className="text-body text-tx-secondary leading-relaxed">
              Based in Amsterdam, Cyril works from his own professional studio equipped with
              state-of-the-art recording and sound design facilities. With extensive experience
              in international productions, he brings a meticulous approach to every project,
              where sound enhances the story and emotional impact of the visual medium.
            </p>

            <p className="text-body text-tx-secondary leading-relaxed">
              His expertise spans the full spectrum of post-production audio, from detailed
              Foley work that brings scenes to life, to expansive sound design that shapes the
              sonic landscape of films and series. Cyril has collaborated with directors,
              producers and post-production studios across Europe and beyond, contributing to
              a diverse range of projects including feature films, television series, documentaries
              and commercials.
            </p>

            <p className="text-body text-tx-secondary leading-relaxed">
              With a dedication to technical excellence and creative innovation, Cyril continues
              to push the boundaries of what sound can achieve in storytelling, making him a
              trusted partner for filmmakers seeking the highest quality audio production.
            </p>

            {/* CV download — place CV at public/docs/cv-cyril-jansen.pdf */}
            {/* <a
              href="/docs/cv-cyril-jansen.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-md inline-flex"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download CV
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bio;
