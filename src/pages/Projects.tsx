import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { gsap } from '../lib/gsap';
import ProjectCard from '../components/ProjectCard';
import FilterBar from '../components/FilterBar';
import { CREDITS, CREDIT_HEAD_LABELS, getSubCreditIds } from '../data/disciplines';
import useProjects from '../hooks/useProjects';
import useScrollReveal from '../hooks/useScrollReveal';
import useReducedMotion from '../hooks/useReducedMotion';

const Projects = () => {
  const { projects } = useProjects();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.7 });
  const prefersReduced = useReducedMotion();

  // Animate grid children when filter results change
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
  }, [selectedTags, animateGrid]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      return (
        selectedTags.length === 0 ||
        selectedTags.some((headId) =>
          getSubCreditIds(headId).some((subId) => (project.credits ?? []).includes(subId))
        )
      );
    });
  }, [projects, selectedTags]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClearTags = () => {
    setSelectedTags([]);
  };

  return (
    <div className="section-container pb-20">
      <div ref={headerRef} className="mb-10 md:mb-14">
        <h1 className="text-h1 text-brand-main mb-8">Projects</h1>

        <FilterBar
          tags={CREDITS.map((c) => c.id)}
          labels={CREDIT_HEAD_LABELS}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          onClearAll={handleClearTags}
        />
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
