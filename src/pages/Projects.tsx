import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import ProjectCard from '../components/ProjectCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import { projects, allTags } from '../data/projects';
import useScrollReveal from '../hooks/useScrollReveal';

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.7 });

  // Animate grid children when filter results change
  const animateGrid = useCallback(() => {
    if (!gridRef.current) return;
    const children = Array.from(gridRef.current.children);
    if (children.length === 0) return;

    gsap.set(children, { opacity: 0, y: 16 });
    gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.35,
      stagger: 0.04,
      ease: 'power2.out',
    });
  }, []);

  // Run animation after filtered results render
  useEffect(() => {
    animateGrid();
  }, [searchQuery, selectedTags, animateGrid]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => project.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);

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
          <div className="mb-6 text-body-sm text-tx-muted">
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
