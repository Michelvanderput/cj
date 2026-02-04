import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { projects } from '../data/projects';
import { socialPosts } from '../data/socialPosts';
import SocialFeed from '../components/SocialFeed';

const Home = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
      });

      gsap.from(projectsRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.4,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, []);

  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <section className="min-h-[60vh] flex flex-col justify-center py-20">
        <h1 ref={titleRef} className="text-6xl md:text-7xl font-light tracking-tight mb-6">
          Cyril Jansen
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl text-neutral-600 font-light max-w-2xl">
          Foley Artist, Sound Designer & Recording Engineer based in Amsterdam
        </p>
      </section>

      <section className="py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-light tracking-tight">Selected Work</h2>
          <Link
            to="/projects"
            className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            View all projects →
          </Link>
        </div>

        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              to="/projects"
              className="group"
            >
              <div className="aspect-[2/3] bg-neutral-100 mb-4 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                  <span className="text-sm">{project.title}</span>
                </div>
              </div>
              <h3 className="font-medium text-lg mb-1">{project.title}</h3>
              <p className="text-sm text-neutral-600">
                {project.type} • {project.year}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-20 border-t border-neutral-200">
        <h2 className="text-2xl font-light tracking-tight mb-12">Updates</h2>
        <SocialFeed posts={socialPosts} />
      </section>

      <section className="py-20 border-t border-neutral-200">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            Let's Work Together
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Looking for professional sound design, Foley, or recording services for your next project? 
            I'd love to hear about your vision and discuss how we can bring it to life through sound.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-neutral-900 text-white px-8 py-4 hover:bg-neutral-800 transition-colors text-sm tracking-wide"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
