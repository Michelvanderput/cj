import { useState, useEffect } from 'react';
import type { Project } from '../types';
import { projects as fallbackProjects } from '../data/projects';

interface UseProjectsReturn {
  projects: Project[];
  allDisciplines: string[];
  loading: boolean;
}

let cachedProjects: Project[] | null = null;

/**
 * Fetches projects from /data/projects.json at runtime.
 * Falls back to the static import for SSR and if the fetch fails.
 */
const useProjects = (): UseProjectsReturn => {
  const [projects, setProjects] = useState<Project[]>(cachedProjects ?? fallbackProjects);
  const [loading, setLoading] = useState(!cachedProjects);

  useEffect(() => {
    if (cachedProjects) return;

    let cancelled = false;

    fetch('/data/projects.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Project[]) => {
        if (cancelled) return;
        cachedProjects = data;
        setProjects(data);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        cachedProjects = fallbackProjects;
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  const allDisciplines = Array.from(new Set(projects.flatMap((p) => p.disciplines))).sort();

  return { projects, allDisciplines, loading };
};

export default useProjects;
