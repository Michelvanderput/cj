import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { SocialPost } from '../types';

interface SocialFeedProps {
  posts: SocialPost[];
}

const SocialFeed = ({ posts }: SocialFeedProps) => {
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(feedRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.6,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('nl-NL', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div ref={feedRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <div key={post.id} className="border border-neutral-200 p-6 hover:border-neutral-400 transition-colors">
          {post.type === 'update' && (
            <>
              <p className="text-neutral-700 leading-relaxed mb-4">{post.content}</p>
              <time className="text-xs text-neutral-500 uppercase tracking-wide">{formatDate(post.date)}</time>
            </>
          )}
          
          {post.type === 'instagram' && post.instagramUrl && (
            <div className="space-y-3">
              <div className="aspect-square bg-neutral-100 flex items-center justify-center group">
                <a
                  href={post.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 group-hover:text-neutral-900 transition-colors text-sm"
                >
                  📷 View on Instagram
                </a>
              </div>
              <time className="text-xs text-neutral-500 uppercase tracking-wide block">{formatDate(post.date)}</time>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SocialFeed;
