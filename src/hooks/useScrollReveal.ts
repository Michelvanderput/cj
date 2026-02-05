import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  ease?: string;
  start?: string;
  children?: boolean;
  scale?: number;
}

const useScrollReveal = <T extends HTMLElement>(options: ScrollRevealOptions = {}) => {
  const ref = useRef<T>(null);

  const {
    y = 30,
    x = 0,
    duration = 0.7,
    stagger = 0.1,
    delay = 0,
    ease = 'power2.out',
    start = 'top 88%',
    children = false,
    scale,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const targets = children
      ? Array.from(ref.current.children)
      : [ref.current];

    // Use gsap.to instead of gsap.from — set hidden state first, then animate to visible.
    // This avoids the flash-of-invisible race condition entirely.
    const fromState: gsap.TweenVars = { opacity: 0, y, x };
    if (scale !== undefined) fromState.scale = scale;

    gsap.set(targets, fromState);

    const ctx = gsap.context(() => {
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration,
        stagger,
        delay,
        ease,
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: 'play none none none',
        },
      });
    });

    return () => {
      ctx.revert();
      // Ensure elements are visible after cleanup (route change)
      gsap.set(targets, { clearProps: 'all' });
    };
  }, [y, x, duration, stagger, delay, ease, start, children, scale]);

  return ref;
};

export default useScrollReveal;
