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
              Cyril Jansen is a Foley artist, sound designer, and recordist specializing in film-, television-, and commercial productions. Fluent in Dutch, German, English, and French, he works on a variety of international projects.
            </p>

            <p className="text-body text-tx-secondary leading-relaxed">
              With a musical background from his parents and an early passion for film production, he developed a strong interest in the role of sound in visual storytelling. Growing up in the tri-border region of the Netherlands, Germany, and Belgium, he began experimenting and practicing within the craft of film from a young age.            </p>

            <p className="text-body text-tx-secondary leading-relaxed">
              He later completed a Sound Producer program at Syntra Hasselt (BE) and a Bachelor’s degree in Music & Technology: Sound Design at the Utrecht School of the Arts (NL), collaborating with colleagues and fellow students on diverse projects within the industry.            </p>

            <p className="text-body text-tx-secondary leading-relaxed">
              Shortly after completing an internship as an audio engineer for dubbing at Iyuno SDI in Hilversum, he started his own freelance company during his bachelor studies. Since then, he has worked for a range of studios, including Iyuno SDI, PostaVermaas, STMPD Recording Studios, and Soundfocus.            </p>
            
            <p className="text-body text-tx-secondary leading-relaxed">
              Collaborating with directors, producers, sound designers, studios, and actors, he works from Amsterdam on a wide variety of projects and has experience with films, series, documentaries, commercials, interviews, and podcasts. With Foley as his core specialty, combined with expertise in sound design and recording, he brings every sound to life, enhancing the story of the production with precision, patience, and flexibility.
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
