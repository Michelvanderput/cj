import { useState, useMemo, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ProjectCard from '../components/ProjectCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import { projects, allTags } from '../data/projects';

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, [searchQuery, selectedTags]);

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
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <div className="mb-12">
        <h1 className="text-4xl font-light tracking-tight mb-8">Projects</h1>

        <div className="space-y-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by title..."
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
          <p className="text-neutral-500">No projects found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div className="mb-6 text-sm text-neutral-600">
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
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
