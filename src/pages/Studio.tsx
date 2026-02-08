import useScrollReveal from '../hooks/useScrollReveal';
import OptimizedImage from '../components/OptimizedImage';

const STUDIO_PHOTOS = [
  { src: '/img/studio/studio-1.jpg', alt: 'Recording room' },
  { src: '/img/studio/studio-2.jpg', alt: 'Mixing desk' },
  { src: '/img/studio/studio-3.jpg', alt: 'Foley pit' },
  { src: '/img/studio/studio-4.jpg', alt: 'Microphone collection' },
  { src: '/img/studio/studio-5.jpg', alt: 'Control room' },
  { src: '/img/studio/studio-6.jpg', alt: 'Equipment rack' },
];

const Studio = () => {
  const headerRef = useScrollReveal<HTMLDivElement>({ y: 24, duration: 0.6 });
  const photosRef = useScrollReveal<HTMLDivElement>({ y: 30, stagger: 0.06, children: true, duration: 0.7 });
  const storyRef = useScrollReveal<HTMLDivElement>({ y: 24, duration: 0.7 });

  return (
    <div className="section-container pb-20">
      {/* Header */}
      <div ref={headerRef} className="mb-14 md:mb-20">
        <h1 className="text-h1 text-brand-main mb-4">Studio</h1>
        <p className="text-body-lg text-tx-secondary max-w-2xl leading-relaxed">
          Professional recording and sound design studio based in Amsterdam, Netherlands.
        </p>
      </div>

      {/* Hero photo */}
      <section className="mb-12 md:mb-16">
        <div className="aspect-[21/9] rounded-lg overflow-hidden border border-brd bg-surface-elevated relative">
          <OptimizedImage
            src="/img/studio/studio-hero.jpg"
            alt="Cyril Jansen Studio — Amsterdam"
            className="absolute inset-0 w-full h-full object-cover"
            fallback={
              <div className="absolute inset-0 flex items-center justify-center text-tx-muted text-body-sm text-center px-4">
                Place hero photo at public/img/studio/studio-hero.jpg
              </div>
            }
          />
        </div>
      </section>

      {/* Story */}
      <section ref={storyRef} className="mb-16 md:mb-24 max-w-3xl">
        <h2 className="text-h3 text-tx-primary mb-6">The Space</h2>
        <div className="space-y-4">
          <p className="text-body text-tx-secondary leading-relaxed">
            Equipped with state-of-the-art recording and sound design facilities, the studio
            provides an ideal environment for Foley recording, sound design, ADR and mixing.
            Every detail has been carefully considered to deliver the highest audio quality.
          </p>
          <p className="text-body text-tx-secondary leading-relaxed">
            The acoustically treated rooms offer a controlled environment for precise recording,
            while the extensive prop collection and dedicated Foley surfaces enable the creation
            of authentic, detailed sound effects for any production.
          </p>
        </div>
      </section>

      {/* Photo grid */}
      <section>
        <h2 className="text-h3 text-tx-primary mb-8">Gallery</h2>
        <div ref={photosRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {STUDIO_PHOTOS.map((photo, i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-lg overflow-hidden border border-brd bg-surface-elevated relative"
            >
              <OptimizedImage
                src={photo.src}
                alt={photo.alt}
                className="absolute inset-0 w-full h-full object-cover"
                fallback={
                  <div className="absolute inset-0 flex items-center justify-center text-tx-muted text-caption text-center px-2">
                    {photo.alt}
                  </div>
                }
              />
            </div>
          ))}
        </div>
        <p className="text-caption text-tx-muted mt-4">
          Place photos in public/img/studio/ (studio-1.jpg through studio-6.jpg, studio-hero.jpg)
        </p>
      </section>
    </div>
  );
};

export default Studio;
