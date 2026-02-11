import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import useReducedMotion from './useReducedMotion';

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
  const prefersReduced = useReducedMotion();

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

  // Synchronously hide elements before first paint
  useLayoutEffect(() => {
    if (!ref.current || prefersReduced) return;

    const el = ref.current;
    if (children) {
      Array.from(el.children).forEach((child) =>
        (child as HTMLElement).setAttribute('data-reveal', '')
      );
    } else {
      el.setAttribute('data-reveal', '');
    }
  }, [children, prefersReduced]);

  // GSAP takes over after layout: set initial state, remove data-reveal, animate
  useEffect(() => {
    if (!ref.current || prefersReduced) return;

    const targets = children
      ? Array.from(ref.current.children)
      : [ref.current];

    // 1. CSS hides via [data-reveal] { opacity: 0 } — already applied by useLayoutEffect below
    // 2. GSAP takes over: set initial state, then remove data-reveal so only GSAP controls opacity
    const fromState: gsap.TweenVars = { opacity: 0, y, x };
    if (scale !== undefined) fromState.scale = scale;

    gsap.set(targets, fromState);

    // Remove data-reveal now that GSAP owns the inline styles
    targets.forEach((t) => (t as HTMLElement).removeAttribute('data-reveal'));

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
      gsap.set(targets, { clearProps: 'all' });
    };
  }, [y, x, duration, stagger, delay, ease, start, children, scale, prefersReduced]);

  return ref;
};

export default useScrollReveal;
