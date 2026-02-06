import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { SocialPost } from '../types';
import useReducedMotion from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface SocialFeedProps {
  posts: SocialPost[];
}

const SocialFeed = ({ posts }: SocialFeedProps) => {
  const feedRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!feedRef.current || prefersReduced) return;

    const children = Array.from(feedRef.current.children);

    gsap.set(children, { opacity: 0, y: 20 });

    const ctx = gsap.context(() => {
      gsap.to(children, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: feedRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => {
      ctx.revert();
      gsap.set(children, { clearProps: 'all' });
    };
  }, [posts, prefersReduced]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('nl-NL', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div ref={feedRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {posts.map((post) => (
        <div key={post.id} className="card">
          {post.type === 'update' && (
            <>
              <p className="text-tx-secondary leading-relaxed mb-4">{post.content}</p>
              <time className="text-caption text-tx-muted uppercase tracking-wide">{formatDate(post.date)}</time>
            </>
          )}
          
          {post.type === 'instagram' && post.instagramUrl && (
            <div className="space-y-3">
              <div className="aspect-square bg-surface-elevated rounded-md flex items-center justify-center group">
                <a
                  href={post.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tx-muted group-hover:text-brand-main transition-colors duration-200 text-body-sm"
                >
                  📷 Bekijk op Instagram
                </a>
              </div>
              <time className="text-caption text-tx-muted uppercase tracking-wide block">{formatDate(post.date)}</time>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SocialFeed;
