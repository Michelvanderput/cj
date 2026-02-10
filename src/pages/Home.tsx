import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../lib/gsap';
import { socialPosts } from '../data/socialPosts';
import useProjects from '../hooks/useProjects';
import SocialFeed from '../components/SocialFeed';
import OptimizedImage from '../components/OptimizedImage';
import useScrollReveal from '../hooks/useScrollReveal';
import useReducedMotion from '../hooks/useReducedMotion';

const Home = () => {
  const { projects } = useProjects();
  const heroRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const sectionsRef = useScrollReveal<HTMLDivElement>({ y: 30, stagger: 0.12, children: true, duration: 0.7 });
  const updatesTitleRef = useScrollReveal<HTMLHeadingElement>({ y: 24, duration: 0.6 });
  const ctaRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.8, scale: 0.98 });

  useEffect(() => {
    if (!heroRef.current || prefersReduced) return;

    const title = heroRef.current.querySelector('[data-hero-title]');
    const subtitle = heroRef.current.querySelector('[data-hero-subtitle]');
    const photo = heroRef.current.querySelector('[data-hero-photo]');

    const targets = [title, subtitle, photo].filter(Boolean);
    if (targets.length === 0) return;

    gsap.set(targets, { opacity: 0, y: 40 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      if (title) tl.to(title, { opacity: 1, y: 0, duration: 0.9 });
      if (subtitle) tl.to(subtitle, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5');
      if (photo) tl.to(photo, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4');
    }, heroRef);

    return () => {
      ctx.revert();
      gsap.set(targets, { clearProps: 'all' });
    };
  }, [prefersReduced]);

  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="section-container">
      {/* Hero — name + subtitle + photo */}
      <section ref={heroRef} className="py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div>
            <h1 data-hero-title className="text-display md:text-[5.5rem] font-heading text-brand-main mb-6 leading-none">
              Cyril Jansen
            </h1>
            <p data-hero-subtitle className="text-body-lg md:text-h3 text-tx-secondary font-body font-light max-w-xl leading-relaxed">
              Foley Artist, Sound Designer & Recording Engineer based in Amsterdam
            </p>
          </div>
          <div data-hero-photo className="aspect-[4/3] rounded-lg overflow-hidden border border-brd bg-surface-elevated relative">
            <OptimizedImage
              src="/img/CAT_HOME/CJ_STUART_WIZARD.jpg"
              alt="Cyril Jansen at work"
              className="absolute inset-0 w-full h-full object-cover"
              fallback={
                <div className="absolute inset-0 flex items-center justify-center text-tx-muted text-body-sm text-center px-4">
                  Place hero photo at public/img/hero.jpg
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* Work + Projects — side by side */}
      <section className="py-16 md:py-24 border-t border-brd">
        <div ref={sectionsRef} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {/* Work */}
          <Link to="/work" className="group block">
            <div className="aspect-[16/10] rounded-lg overflow-hidden border border-brd bg-surface-elevated relative mb-5 transition-all duration-225 group-hover:border-brd-hover group-hover:shadow-card">
              <OptimizedImage
                src="/img/CAT_WORK/CJ_POSTA_Schoenen.png"
                alt="Work"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                fallback={
                  <div className="absolute inset-0 flex items-center justify-center text-tx-muted text-body-sm">
                    Work
                  </div>
                }
              />
            </div>
            <h2 className="text-h2 text-tx-primary group-hover:text-brand-main transition-colors duration-200">
              Work
              <span className="inline-block ml-2 transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
            </h2>
            <p className="text-body-sm text-tx-secondary mt-2">Foley, sound design, recording, mixing and more</p>
          </Link>

          {/* Projects */}
          <Link to="/projects" className="group block">
            <div className="aspect-[16/10] rounded-lg overflow-hidden border border-brd bg-surface-elevated relative mb-5 transition-all duration-225 group-hover:border-brd-hover group-hover:shadow-card">
              {featuredProjects[0]?.posterUrl ? (
                <OptimizedImage
                  src={featuredProjects[0].posterUrl}
                  alt="Projects"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  fallback={
                    <div className="absolute inset-0 flex items-center justify-center text-tx-muted text-body-sm">
                      Projects
                    </div>
                  }
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-tx-muted text-body-sm">
                  Projects
                </div>
              )}
            </div>
            <h2 className="text-h2 text-tx-primary group-hover:text-brand-main transition-colors duration-200">
              Projects
              <span className="inline-block ml-2 transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
            </h2>
            <p className="text-body-sm text-tx-secondary mt-2">{projects.length} productions across film, TV and commercials</p>
          </Link>
        </div>
      </section>

      {/* News */}
      <section className="py-16 md:py-24 border-t border-brd">
        <h2 ref={updatesTitleRef} className="text-h2 text-tx-primary mb-10 md:mb-14">News</h2>
        <SocialFeed posts={socialPosts} />
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 border-t border-brd">
        <div ref={ctaRef} className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-h1 md:text-display text-brand-main">
            Let's Collaborate
          </h2>
          <p className="text-body-lg text-tx-secondary leading-relaxed">
            Looking for professional sound design, Foley or recording services for your next project?
            I'd love to hear about your vision and discuss how we can bring it to life through sound.
          </p>
          <Link
            to="/contact"
            className="btn btn-primary btn-lg"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
