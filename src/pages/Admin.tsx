import { useState, useEffect, useCallback } from 'react';
import type { Project, CountryEntry } from '../types';
import ProjectCard from '../components/ProjectCard';
import { commitProjectsJson } from '../lib/github';
import { CREDITS, SUB_CREDIT_LABELS } from '../data/disciplines';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? 'admin';

const PROJECT_TYPES = ['Film', 'Serie', 'Commercial', 'Documentary', 'Short'] as const;

const emptyProject = (): Project => ({
  id: crypto.randomUUID().slice(0, 8),
  title: '',
  type: 'Film',
  credits: [],
  countries: [],
  year: new Date().getFullYear(),
});

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [newCountryName, setNewCountryName] = useState('');
  const [newCountryCode, setNewCountryCode] = useState('');

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
      setErrorMsg('Incorrect password');
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
      setErrorMsg(err instanceof Error ? err.message : 'Unknown error');
    }
  }, [projects]);

  const addProject = () => {
    const p = emptyProject();
    setEditing(p);
  };

  const editProject = (project: Project) => {
    setEditing({ ...project });
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setConfirmingDelete(null);
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

  const toggleCredit = (id: string) => {
    if (!editing) return;
    const current = editing.credits;
    const updated = current.includes(id)
      ? current.filter((c) => c !== id)
      : [...current, id];
    setEditing({ ...editing, credits: updated });
  };

  const saveEdit = () => {
    if (!editing) return;
    const updated: Project = { ...editing };
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
            placeholder="Password"
            className="input-field"
            autoFocus
          />
          <button type="submit" className="btn btn-primary btn-md w-full">
            Log in
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
          {projects.some((p) => p.id === editing.id) ? 'Edit Project' : 'New Project'}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-tx-secondary mb-1">Title *</label>
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
                <label className="block text-body-sm font-medium text-tx-secondary mb-1">Year *</label>
                <input
                  type="number"
                  value={editing.year}
                  onChange={(e) => updateField('year', Number(e.target.value))}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-body-sm font-medium text-tx-secondary mb-2">Credits *</label>
              <div className="space-y-3">
                {CREDITS.map((cat) => (
                  <div key={cat.id}>
                    <p className="text-caption font-medium text-tx-muted mb-1.5">{cat.label}</p>
                    <div className="flex flex-wrap gap-2">
                      {cat.subCredits.map((sc) => {
                        const isSelected = editing.credits.includes(sc.id);
                        return (
                          <button
                            key={sc.id}
                            type="button"
                            onClick={() => toggleCredit(sc.id)}
                            className={`px-3 py-1.5 text-body-sm rounded-md border transition-all duration-200 ${
                              isSelected
                                ? 'bg-brand-main text-tx-inverse border-brand-main'
                                : 'bg-surface-elevated text-tx-secondary border-brd hover:border-brd-hover'
                            }`}
                          >
                            {sc.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-body-sm font-medium text-tx-secondary mb-2">Countries *</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {(editing.countries ?? []).map((c: CountryEntry, i: number) => (
                  <span
                    key={`${c.code}-${i}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-body-sm bg-surface-elevated text-tx-secondary rounded-md border border-brd"
                  >
                    <img
                      src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`}
                      width="16"
                      height="12"
                      alt={c.name}
                      className="rounded-sm"
                    />
                    {c.name}
                    <button
                      type="button"
                      onClick={() => {
                        const updated = editing.countries.filter((_: CountryEntry, idx: number) => idx !== i);
                        setEditing({ ...editing, countries: updated });
                      }}
                      className="text-tx-muted hover:text-state-error ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCountryName}
                  onChange={(e) => setNewCountryName(e.target.value)}
                  placeholder="Netherlands"
                  className="input-field flex-1"
                />
                <input
                  type="text"
                  value={newCountryCode}
                  onChange={(e) => setNewCountryCode(e.target.value.toUpperCase().slice(0, 2))}
                  placeholder="NL"
                  maxLength={2}
                  className="input-field w-20"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newCountryName.trim() && newCountryCode.trim().length === 2) {
                      const entry: CountryEntry = { name: newCountryName.trim(), code: newCountryCode.trim() };
                      setEditing({ ...editing, countries: [...(editing.countries ?? []), entry] });
                      setNewCountryName('');
                      setNewCountryCode('');
                    }
                  }}
                  className="btn btn-ghost btn-md"
                >
                  + Add
                </button>
              </div>
            </div>

            <div>
              <label className="block text-body-sm font-medium text-tx-secondary mb-1">
                Poster URL <span className="text-tx-muted">(optional)</span>
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
                IMDb URL <span className="text-tx-muted">(optional)</span>
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
                Save
              </button>
              <button onClick={() => setEditing(null)} className="btn btn-ghost btn-md flex-1">
                Cancel
              </button>
            </div>
          </div>

          {/* Live preview */}
          <div>
            <p className="text-body-sm font-medium text-tx-secondary mb-4">Live Preview</p>
            <div className="max-w-xs">
              <ProjectCard
                project={editing}
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
        <h1 className="text-h2 text-brand-main">Manage Projects</h1>
        <div className="flex gap-3">
          <button onClick={addProject} className="btn btn-primary btn-md">
            + New Project
          </button>
          <button
            onClick={handleSave}
            disabled={status === 'saving'}
            className="btn btn-secondary btn-md"
          >
            {status === 'saving' ? 'Saving...' : status === 'saved' ? '✓ Saved' : 'Publish'}
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
            Projects published! The site will be automatically rebuilt by Vercel.
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
                aria-label="Move up"
              >
                ▲
              </button>
              <button
                onClick={() => moveProject(project.id, 1)}
                disabled={idx === projects.length - 1}
                className="text-tx-muted hover:text-tx-primary disabled:opacity-30 text-body-sm"
                aria-label="Move down"
              >
                ▼
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-heading text-h4 text-tx-primary truncate">{project.title || 'Untitled'}</p>
              <p className="text-body-sm text-tx-secondary">
                {project.type} · {project.year} · {(project.countries ?? []).map((c: CountryEntry) => c.name).join(', ')}
              </p>
            </div>

            {/* Credits */}
            <div className="hidden md:flex flex-wrap gap-1 max-w-xs">
              {project.credits.slice(0, 3).map((c) => (
                <span key={c} className="text-caption px-2 py-0.5 bg-surface-elevated text-tx-secondary rounded border border-brd">
                  {SUB_CREDIT_LABELS[c] ?? c}
                </span>
              ))}
              {project.credits.length > 3 && (
                <span className="text-caption text-tx-muted">+{project.credits.length - 3}</span>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => editProject(project)}
                className="btn btn-ghost btn-sm"
              >
                Edit
              </button>
              {confirmingDelete === project.id ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="text-body-sm text-tx-inverse bg-state-error hover:bg-state-error/80 px-3 py-1 rounded-md"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setConfirmingDelete(null)}
                    className="text-body-sm text-tx-muted hover:text-tx-primary px-2 py-1"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmingDelete(project.id)}
                  className="text-body-sm text-state-error hover:text-state-error/80 px-2 py-1"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-tx-muted text-body">No projects yet. Click "+ New Project" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default Admin;
