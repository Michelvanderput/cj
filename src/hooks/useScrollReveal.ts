import { useEffect, useRef } from 'react';
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

  // Mark element with data-reveal so CSS hides it before JS runs (no flash)
  useEffect(() => {
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

  useEffect(() => {
    if (!ref.current || prefersReduced) return;

    const targets = children
      ? Array.from(ref.current.children)
      : [ref.current];

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
      targets.forEach((t) => (t as HTMLElement).removeAttribute('data-reveal'));
      gsap.set(targets, { clearProps: 'all' });
    };
  }, [y, x, duration, stagger, delay, ease, start, children, scale, prefersReduced]);

  return ref;
};

export default useScrollReveal;
