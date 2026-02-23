import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import OptimizedImage from '../components/OptimizedImage';
import { CREDITS } from '../data/disciplines';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoePrints,
  faSliders,
  faClapperboard,
  faMicrophoneLines,
  faMicrophone,
  faEarthAmerica,
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const CREDIT_ICONS: Record<string, IconDefinition> = {
  foley: faShoePrints,
  'sound-design': faSliders,
  'set-recording': faClapperboard,
  adr: faMicrophoneLines,
  'audio-description': faMicrophone,
  dubbing: faEarthAmerica,
};

const WORK_PHOTOS = [
  { src: '/img/CAT_WORK/CJ_POSTA_Schoenen.png', alt: 'On set recording' },
  { src: '/img/CAT_WORK/AAPTOPAAP.jpeg', alt: 'Studio session' },
  { src: '/img/CAT_WORK/THE_DAM_SET_02.JPG', alt: 'Foley stage' },
  { src: '/img/CAT_WORK/THE_DAM_SET_03.jpg', alt: 'Mixing console' },
  { src: '/img/work/work-5.jpg', alt: 'Field recording' },
  { src: '/img/work/work-6.jpg', alt: 'Sound design setup' },
];

const Work = () => {
  const headerRef = useScrollReveal<HTMLDivElement>({ y: 24, duration: 0.6 });
  const creditsRef = useScrollReveal<HTMLDivElement>({ y: 20, stagger: 0.04, children: true, duration: 0.5 });
  const photosRef = useScrollReveal<HTMLDivElement>({ y: 30, stagger: 0.06, children: true, duration: 0.7 });

  return (
    <div className="section-container pb-20">
      {/* Header */}
      <div ref={headerRef} className="mb-14 md:mb-20">
        <h1 className="text-h1 text-brand-main mb-4">Work</h1>
        <p className="text-body-lg text-tx-secondary max-w-2xl leading-relaxed">
          Specializing in post-production audio for film, television and commercial productions.
          From Foley artistry to full sound design — every project gets a tailored sonic identity.
        </p>
      </div>

      {/* Credits */}
      <section className="mb-16 md:mb-24">
        <div ref={creditsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CREDITS.map((cat) => {
            const icon = CREDIT_ICONS[cat.id];
            return (
              <div
                key={cat.id}
                className="p-6 bg-surface-card border border-brd rounded-lg transition-all duration-225 hover:border-brd-hover hover:shadow-card relative"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-heading text-h4 text-brand-main">{cat.label}</h3>
                  {icon && (
                    <span className="w-12 h-12 flex items-center justify-center rounded-md bg-brand-main/10 text-brand-main flex-shrink-0">
                      <FontAwesomeIcon icon={icon} className="text-xl" />
                    </span>
                  )}
                </div>
                <p className="text-body-sm text-tx-muted leading-relaxed">
                  {cat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Photo grid */}
      <section className="mb-16 md:mb-24">
        <h2 className="text-h3 text-tx-primary mb-8">Behind the Scenes</h2>
        <div ref={photosRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {WORK_PHOTOS.map((photo, i) => (
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
          Place photos in public/img/work/ (work-1.jpg through work-6.jpg)
        </p>
      </section>

      {/* CTA */}
      <section className="pt-12 border-t border-brd text-center">
        <h2 className="text-h2 text-brand-main mb-4">Interested in working together?</h2>
        <p className="text-body text-tx-secondary mb-8 max-w-xl mx-auto">
          I'm always open to new projects and collaborations. Let's discuss how sound can elevate your production.
        </p>
        <Link to="/contact" className="btn btn-primary btn-lg">
          Get in Touch
        </Link>
      </section>
    </div>
  );
};

export default Work;
