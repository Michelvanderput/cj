import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { gsap } from '../lib/gsap';
import ProjectCard from '../components/ProjectCard';
import FilterBar from '../components/FilterBar';
import { CREDITS, CREDIT_HEAD_LABELS, getSubCreditIds } from '../data/disciplines';
import useProjects from '../hooks/useProjects';
import useScrollReveal from '../hooks/useScrollReveal';
import useReducedMotion from '../hooks/useReducedMotion';

const HEAD_ORDER = CREDITS.map((c) => c.id);

const Projects = () => {
  const { projects } = useProjects();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const gridRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.7 });
  const prefersReduced = useReducedMotion();

  const animateGrid = useCallback(() => {
    if (!gridRef.current || prefersReduced) return;
    const children = Array.from(gridRef.current.children);
    if (children.length === 0) return;

    if (tweenRef.current) tweenRef.current.kill();

    gsap.set(children, { opacity: 0, y: 16 });
    tweenRef.current = gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.35,
      stagger: 0.04,
      ease: 'power2.out',
    });
  }, [prefersReduced]);

  useEffect(() => {
    animateGrid();
    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [selectedTag, sortOrder, animateGrid]);

  const filteredProjects = useMemo(() => {
    const yearMult = sortOrder === 'newest' ? -1 : 1;

    if (!selectedTag) {
      // No filter: sort by HEAD_ORDER group, then by year within each group
      return [...projects].sort((a, b) => {
        const aHead = HEAD_ORDER.findIndex((h) =>
          getSubCreditIds(h).some((s) => (a.credits ?? []).includes(s))
        );
        const bHead = HEAD_ORDER.findIndex((h) =>
          getSubCreditIds(h).some((s) => (b.credits ?? []).includes(s))
        );
        const headDiff = (aHead === -1 ? 999 : aHead) - (bHead === -1 ? 999 : bHead);
        if (headDiff !== 0) return headDiff;
        return yearMult * (a.year - b.year);
      });
    }

    return projects
      .filter((project) =>
        getSubCreditIds(selectedTag).some((subId) => (project.credits ?? []).includes(subId))
      )
      .sort((a, b) => yearMult * (a.year - b.year));
  }, [projects, selectedTag, sortOrder]);

  const handleTagToggle = (tag: string) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  };

  const handleClearTags = () => {
    setSelectedTag(null);
  };

  return (
    <div className="section-container pb-20">
      <div ref={headerRef} className="mb-10 md:mb-14">
        <h1 className="text-h1 text-brand-main mb-8">Projects</h1>

        <FilterBar
          tags={CREDITS.map((c) => c.id)}
          labels={CREDIT_HEAD_LABELS}
          selectedTags={selectedTag ? [selectedTag] : []}
          onTagToggle={handleTagToggle}
          onClearAll={handleClearTags}
        />

        <div className="flex items-center gap-2 mt-4">
          <span className="text-body-sm text-tx-muted">Sort:</span>
          <button
            onClick={() => setSortOrder('newest')}
            className={`px-3 py-1.5 text-body-sm rounded-md border transition-all duration-200 ${
              sortOrder === 'newest'
                ? 'bg-brand-main text-tx-inverse border-brand-main shadow-glow-main'
                : 'bg-surface-elevated text-tx-secondary border-brd hover:border-brd-hover hover:text-tx-primary'
            }`}
          >
            Newest
          </button>
          <button
            onClick={() => setSortOrder('oldest')}
            className={`px-3 py-1.5 text-body-sm rounded-md border transition-all duration-200 ${
              sortOrder === 'oldest'
                ? 'bg-brand-main text-tx-inverse border-brand-main shadow-glow-main'
                : 'bg-surface-elevated text-tx-secondary border-brd hover:border-brd-hover hover:text-tx-primary'
            }`}
          >
            Oldest
          </button>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-tx-muted text-body">No projects found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div aria-live="polite" aria-atomic="true" className="mb-6 text-body-sm text-tx-muted">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} found
          </div>

          <div
            ref={gridRef}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8"
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Projects;
