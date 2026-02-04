import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const About = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 pb-20">
      <div ref={contentRef} className="space-y-8">
        <h1 className="text-4xl font-light tracking-tight">About</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-neutral-700 leading-relaxed">
            Cyril Jansen is a Foley artist, sound designer, and recording engineer specializing
            in film, television, and commercial productions.
          </p>

          <p className="text-neutral-700 leading-relaxed">
            Based in Amsterdam, Cyril operates from his own professional studio, equipped with
            state-of-the-art recording and sound design facilities. With extensive experience
            across international productions, he brings a meticulous approach to every project,
            ensuring that sound enhances the narrative and emotional impact of the visual medium.
          </p>

          <p className="text-neutral-700 leading-relaxed">
            His expertise spans the full spectrum of post-production sound, from intricate Foley
            work that brings scenes to life, to comprehensive sound design that shapes the sonic
            landscape of films and series. Cyril has collaborated with directors, producers, and
            post-production studios across Europe and beyond, contributing to a diverse range of
            projects including feature films, television series, documentaries, and commercials.
          </p>

          <p className="text-neutral-700 leading-relaxed">
            With a commitment to technical excellence and creative innovation, Cyril continues to
            push the boundaries of what sound can achieve in storytelling, making him a trusted
            partner for filmmakers seeking the highest quality audio production.
          </p>
        </div>

        <div className="pt-8 border-t border-neutral-200">
          <h2 className="text-xl font-light mb-4">Studio</h2>
          <p className="text-neutral-700">
            Professional recording and sound design studio located in Amsterdam, Netherlands.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
