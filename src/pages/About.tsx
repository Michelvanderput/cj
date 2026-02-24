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
              Cyril Jansen is a Foley artist, sound designer, and recording engineer, specializing in film, television, and commercial productions. It is his passion and mission to create detailed, innovative, and cohesive sounds that bring images to life.
            </p>

            <p className="text-body text-tx-secondary leading-relaxed">
              Raised in the tri-border region of the Netherlands, Germany, and Belgium, he developed an early awareness of cultural nuance and collaboration. Holding both German and Dutch nationality, with a musical background and fluent in Dutch, German, English, he moves effortlessly within international productions. His formal education at [EDUCATION/INSTITUTION] laid the foundation for his technical expertise and creative approach in Foley, recording, and sound design.
            </p>

            <p className="text-body text-tx-secondary leading-relaxed">
              Cyril has gained experience working at various studios, contributing to recording and editing across a wide range of tasks, including dubbing, audio description, Foley, set recording, sound design, and ADR. He has collaborated with directors, producers, and other sound designers on feature films, television series, documentaries, and commercials. His work ranges from precise, performance-driven Foley to layered soundscapes that shape the atmosphere and identity of a production. In every project, he applies a structured and meticulous approach, with careful attention to detail and teamwork in international production environments.
            </p>

            <p className="text-body text-tx-secondary leading-relaxed">
              Flexible yet punctual, multidisciplinary yet precise, he brings his skills to the table to create cohesive, expressive sounds for visual media. He looks forward to applying his expertise to projects where sound plays a defining role in storytelling.
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
