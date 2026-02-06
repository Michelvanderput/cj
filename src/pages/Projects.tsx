import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { gsap } from '../lib/gsap';
import ProjectCard from '../components/ProjectCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import useProjects from '../hooks/useProjects';
import useScrollReveal from '../hooks/useScrollReveal';
import useReducedMotion from '../hooks/useReducedMotion';
import useDebouncedValue from '../hooks/useDebouncedValue';

const Projects = () => {
  const { projects, allTags } = useProjects();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.7 });
  const prefersReduced = useReducedMotion();
  const debouncedQuery = useDebouncedValue(searchQuery, 300);

  // Animate grid children when filter results change
  const animateGrid = useCallback(() => {
    if (!gridRef.current || prefersReduced) return;
    const children = Array.from(gridRef.current.children);
    if (children.length === 0) return;

    // Kill any in-flight tween before starting a new one
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

  // Run animation after filtered results render
  useEffect(() => {
    animateGrid();
    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [debouncedQuery, selectedTags, animateGrid]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.title
        .toLowerCase()
        .includes(debouncedQuery.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => project.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [projects, debouncedQuery, selectedTags]);

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
        <h1 className="text-h1 text-brand-main mb-8">Projecten</h1>

        <div className="space-y-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Zoek op titel..."
          />

          <FilterBar
            tags={allTags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            onClearAll={handleClearTags}
          />
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-tx-muted text-body">Geen projecten gevonden die aan je criteria voldoen.</p>
        </div>
      ) : (
        <>
          <div aria-live="polite" aria-atomic="true" className="mb-6 text-body-sm text-tx-muted">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projecten'} gevonden
          </div>

          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12"
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
