import { useState, useEffect, useCallback } from 'react';
import type { Project } from '../types';
import ProjectCard from '../components/ProjectCard';
import { commitProjectsJson } from '../lib/github';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? 'admin';

const PROJECT_TYPES = ['Film', 'Serie', 'Commercial', 'Documentary', 'Short'] as const;

const emptyProject = (): Project => ({
  id: crypto.randomUUID().slice(0, 8),
  title: '',
  type: 'Film',
  tags: [],
  country: '',
  countryCode: '',
  year: new Date().getFullYear(),
  role: '',
});

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Load projects from JSON
  useEffect(() => {
    fetch('/data/projects.json')
      .then((r) => r.json())
      .then((data: Project[]) => setProjects(data))
      .catch(() => {});
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
    } else {
      setErrorMsg('Onjuist wachtwoord');
    }
  };

  const handleSave = useCallback(async () => {
    setStatus('saving');
    setErrorMsg('');
    try {
      await commitProjectsJson(projects);
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Onbekende fout');
    }
  }, [projects]);

  const addProject = () => {
    const p = emptyProject();
    setEditing(p);
    setTagInput('');
  };

  const editProject = (project: Project) => {
    setEditing({ ...project });
    setTagInput(project.tags.join(', '));
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const moveProject = (id: string, direction: -1 | 1) => {
    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx < 0) return prev;
      const newIdx = idx + direction;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[newIdx]] = [next[newIdx], next[idx]];
      return next;
    });
  };

  const saveEdit = () => {
    if (!editing) return;
    const updated: Project = {
      ...editing,
      tags: tagInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };
    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === updated.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = updated;
        return next;
      }
      return [updated, ...prev];
    });
    setEditing(null);
    setTagInput('');
  };

  const updateField = <K extends keyof Project>(key: K, value: Project[K]) => {
    if (!editing) return;
    setEditing({ ...editing, [key]: value });
  };

  // ── Login gate ──
  if (!authed) {
    return (
      <div className="section-container max-w-sm py-20">
        <h1 className="text-h2 text-brand-main mb-8">Admin</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Wachtwoord"
            className="input-field"
            autoFocus
          />
          <button type="submit" className="btn btn-primary btn-md w-full">
            Inloggen
          </button>
          {errorMsg && <p className="text-caption text-state-error">{errorMsg}</p>}
        </form>
      </div>
    );
  }

  // ── Edit modal ──
  if (editing) {
    return (
      <div className="section-container max-w-5xl py-10">
        <h1 className="text-h2 text-brand-main mb-8">
          {projects.some((p) => p.id === editing.id) ? 'Project Bewerken' : 'Nieuw Project'}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-tx-secondary mb-1">Titel *</label>
              <input
                type="text"
                value={editing.title}
                onChange={(e) => updateField('title', e.target.value)}
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-body-sm font-medium text-tx-secondary mb-1">Type *</label>
                <select
                  value={editing.type}
                  onChange={(e) => updateField('type', e.target.value as Project['type'])}
                  className="input-field"
                >
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-body-sm font-medium text-tx-secondary mb-1">Jaar *</label>
                <input
                  type="number"
                  value={editing.year}
                  onChange={(e) => updateField('year', Number(e.target.value))}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-body-sm font-medium text-tx-secondary mb-1">
                Tags <span className="text-tx-muted">(komma-gescheiden)</span>
              </label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Foley, Sound Design, Drama"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-body-sm font-medium text-tx-secondary mb-1">Rol *</label>
              <input
                type="text"
                value={editing.role}
                onChange={(e) => updateField('role', e.target.value)}
                placeholder="Foley Artist & Sound Designer"
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-body-sm font-medium text-tx-secondary mb-1">Land *</label>
                <input
                  type="text"
                  value={editing.country}
                  onChange={(e) => updateField('country', e.target.value)}
                  placeholder="Netherlands"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-body-sm font-medium text-tx-secondary mb-1">
                  Landcode * <span className="text-tx-muted">(2 letters)</span>
                </label>
                <input
                  type="text"
                  value={editing.countryCode}
                  onChange={(e) => updateField('countryCode', e.target.value.toUpperCase().slice(0, 2))}
                  placeholder="NL"
                  maxLength={2}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-body-sm font-medium text-tx-secondary mb-1">
                Poster URL <span className="text-tx-muted">(optioneel)</span>
              </label>
              <input
                type="text"
                value={editing.posterUrl ?? ''}
                onChange={(e) => updateField('posterUrl', e.target.value || undefined)}
                placeholder="/img/posters/naam.jpg"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-body-sm font-medium text-tx-secondary mb-1">
                IMDb URL <span className="text-tx-muted">(optioneel)</span>
              </label>
              <input
                type="text"
                value={editing.imdbUrl ?? ''}
                onChange={(e) => updateField('imdbUrl', e.target.value || undefined)}
                placeholder="https://www.imdb.com/title/..."
                className="input-field"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button onClick={saveEdit} className="btn btn-primary btn-md flex-1">
                Opslaan
              </button>
              <button onClick={() => setEditing(null)} className="btn btn-ghost btn-md flex-1">
                Annuleren
              </button>
            </div>
          </div>

          {/* Live preview */}
          <div>
            <p className="text-body-sm font-medium text-tx-secondary mb-4">Live Preview</p>
            <div className="max-w-xs">
              <ProjectCard
                project={{
                  ...editing,
                  tags: tagInput.split(',').map((t) => t.trim()).filter(Boolean),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Project list ──
  return (
    <div className="section-container max-w-5xl py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-h2 text-brand-main">Projecten Beheren</h1>
        <div className="flex gap-3">
          <button onClick={addProject} className="btn btn-primary btn-md">
            + Nieuw Project
          </button>
          <button
            onClick={handleSave}
            disabled={status === 'saving'}
            className="btn btn-secondary btn-md"
          >
            {status === 'saving' ? 'Opslaan...' : status === 'saved' ? '✓ Opgeslagen' : 'Publiceer'}
          </button>
        </div>
      </div>

      {status === 'error' && (
        <div className="mb-6 p-4 rounded-md bg-state-error-muted/20 border border-state-error/30">
          <p className="text-body-sm text-state-error">{errorMsg}</p>
        </div>
      )}

      {status === 'saved' && (
        <div className="mb-6 p-4 rounded-md bg-state-success-muted/20 border border-state-success/30">
          <p className="text-body-sm text-state-success">
            Projecten gepubliceerd! De site wordt automatisch opnieuw gebouwd door Vercel.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {projects.map((project, idx) => (
          <div
            key={project.id}
            className="flex items-center gap-4 p-4 bg-surface-card border border-brd rounded-lg"
          >
            {/* Reorder */}
            <div className="flex flex-col gap-1">
              <button
                onClick={() => moveProject(project.id, -1)}
                disabled={idx === 0}
                className="text-tx-muted hover:text-tx-primary disabled:opacity-30 text-body-sm"
                aria-label="Omhoog"
              >
                ▲
              </button>
              <button
                onClick={() => moveProject(project.id, 1)}
                disabled={idx === projects.length - 1}
                className="text-tx-muted hover:text-tx-primary disabled:opacity-30 text-body-sm"
                aria-label="Omlaag"
              >
                ▼
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-heading text-h4 text-tx-primary truncate">{project.title || 'Zonder titel'}</p>
              <p className="text-body-sm text-tx-secondary">
                {project.type} · {project.year} · {project.country}
              </p>
            </div>

            {/* Tags */}
            <div className="hidden md:flex flex-wrap gap-1 max-w-xs">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-caption px-2 py-0.5 bg-surface-elevated text-tx-secondary rounded border border-brd">
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="text-caption text-tx-muted">+{project.tags.length - 3}</span>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => editProject(project)}
                className="btn btn-ghost btn-sm"
              >
                Bewerk
              </button>
              <button
                onClick={() => deleteProject(project.id)}
                className="text-body-sm text-state-error hover:text-state-error/80 px-2 py-1"
              >
                Verwijder
              </button>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-tx-muted text-body">Nog geen projecten. Klik op "+ Nieuw Project" om te beginnen.</p>
        </div>
      )}
    </div>
  );
};

export default Admin;
