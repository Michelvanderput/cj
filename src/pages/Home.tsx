import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { projects } from '../data/projects';
import { socialPosts } from '../data/socialPosts';
import SocialFeed from '../components/SocialFeed';
import useScrollReveal from '../hooks/useScrollReveal';

const Home = () => {
  const heroRef = useRef<HTMLElement>(null);
  const workHeaderRef = useScrollReveal<HTMLDivElement>({ y: 24, duration: 0.6 });
  const projectsRef = useScrollReveal<HTMLDivElement>({ y: 30, stagger: 0.12, children: true, duration: 0.7 });
  const updatesTitleRef = useScrollReveal<HTMLHeadingElement>({ y: 24, duration: 0.6 });
  const ctaRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.8, scale: 0.98 });

  useEffect(() => {
    if (!heroRef.current) return;

    const title = heroRef.current.querySelector('[data-hero-title]');
    const subtitle = heroRef.current.querySelector('[data-hero-subtitle]');

    if (!title || !subtitle) return;

    gsap.set([title, subtitle], { opacity: 0, y: 40 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.9,
      })
      .to(subtitle, {
        opacity: 1,
        y: 0,
        duration: 0.7,
      }, '-=0.5');
    }, heroRef);

    return () => {
      ctx.revert();
      gsap.set([title, subtitle], { clearProps: 'all' });
    };
  }, []);

  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="section-container">
      {/* Hero */}
      <section ref={heroRef} className="min-h-[60vh] flex flex-col justify-center py-20 md:py-28">
        <h1 data-hero-title className="text-display md:text-[5.5rem] font-heading text-brand-main mb-6 leading-none">
          Cyril Jansen
        </h1>
        <p data-hero-subtitle className="text-body-lg md:text-h3 text-tx-secondary font-body font-light max-w-2xl leading-relaxed">
          Foley Artist, Sound Designer & Recording Engineer gevestigd in Amsterdam
        </p>
      </section>

      {/* Selected Work */}
      <section className="py-16 md:py-24">
        <div ref={workHeaderRef} className="flex items-center justify-between mb-10 md:mb-14">
          <h2 className="text-h2 text-tx-primary">Geselecteerd Werk</h2>
          <Link
            to="/projects"
            className="text-body-sm text-tx-secondary hover:text-brand-main transition-colors duration-200 group"
          >
            Bekijk alle projecten
            <span className="inline-block ml-1 transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>

        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {featuredProjects.map((project) => (
            <div key={project.id}>
              <div className="aspect-[2/3] bg-surface-elevated rounded-lg mb-4 overflow-hidden relative border border-brd">
                {project.posterUrl ? (
                  <img
                    src={project.posterUrl}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-tx-muted">
                    <span className="text-body-sm font-heading tracking-wide">{project.title}</span>
                  </div>
                )}
              </div>
              <h3 className="font-heading text-h4 text-tx-primary mb-1">{project.title}</h3>
              <p className="text-body-sm text-tx-secondary">
                {project.type} <span className="text-tx-muted">•</span> {project.year}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Updates */}
      <section className="py-16 md:py-24 border-t border-brd">
        <h2 ref={updatesTitleRef} className="text-h2 text-tx-primary mb-10 md:mb-14">Nieuws</h2>
        <SocialFeed posts={socialPosts} />
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 border-t border-brd">
        <div ref={ctaRef} className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-h1 md:text-display text-brand-main">
            Laten We Samenwerken
          </h2>
          <p className="text-body-lg text-tx-secondary leading-relaxed">
            Op zoek naar professioneel sound design, Foley of opnamediensten voor je volgende project? 
            Ik hoor graag over je visie en bespreek hoe we het tot leven kunnen brengen door geluid.
          </p>
          <Link
            to="/contact"
            className="btn btn-primary btn-lg"
          >
            Neem Contact Op
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
