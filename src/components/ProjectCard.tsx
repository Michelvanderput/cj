import type { Project } from '../types';
import OptimizedImage from './OptimizedImage';
import { SUB_CREDIT_LABELS } from '../data/disciplines';

const formatProjectType = (type: Project['type']) => (type === 'Serie' ? 'Series' : type);

interface ProjectCardProps {
  project: Project;
  compact?: boolean;
}

const ProjectCard = ({ project, compact = false }: ProjectCardProps) => {
  const { title, type, credits = [], countries = [], imdbUrl, year, posterUrl } = project;
  const typeLabel = formatProjectType(type);

  const posterFallback = (
    <div className="absolute inset-0 flex items-center justify-center text-tx-muted">
      <span className="text-body-sm font-heading tracking-wide">{title}</span>
    </div>
  );

  if (compact) {
    return (
      <article>
        <div className="aspect-[2/3] bg-surface-elevated rounded-lg mb-4 overflow-hidden relative border border-brd">
          {posterUrl ? (
            <OptimizedImage
              src={posterUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
              fallback={posterFallback}
            />
          ) : posterFallback}
        </div>
        <h3 className="font-heading text-h4 text-tx-primary mb-1">{title}</h3>
        <p className="text-body-sm text-tx-secondary flex items-center gap-1.5">
          {typeLabel}
          <span className="text-tx-muted">•</span>
          {year}
        </p>
      </article>
    );
  }

  return (
    <article className="group">
      <div className="aspect-[2/3] bg-surface-elevated rounded-lg mb-4 overflow-hidden relative border border-brd transition-all duration-225 group-hover:border-brd-hover group-hover:shadow-card">
        {posterUrl ? (
          <OptimizedImage
            src={posterUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            fallback={posterFallback}
          />
        ) : posterFallback}
        
        {imdbUrl && (
          <a
            href={imdbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all duration-200 bg-brand-secondary text-white px-2.5 py-1.5 text-caption font-medium rounded-md hover:bg-brand-secondary-hover shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-main flex items-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <span>IMDb</span>
          </a>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-h4 text-tx-primary leading-tight group-hover:text-brand-main transition-colors duration-200">{title}</h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            {countries.map((c) => (
              <img
                key={c.code}
                src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w80/${c.code.toLowerCase()}.png 2x`}
                width="20"
                height="15"
                alt={c.name}
                title={c.name}
                className="rounded-sm"
                loading="lazy"
              />
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-body-sm text-tx-secondary">
          <span>{typeLabel}</span>
          <span className="text-tx-muted">•</span>
          <span>{year}</span>
        </div>
        
        <div className="flex flex-wrap gap-1.5 pt-1">
          {credits.map((c) => (
            <span
              key={c}
              className="text-caption px-2 py-1 bg-surface-elevated text-tx-secondary rounded border border-brd"
            >
              {SUB_CREDIT_LABELS[c] ?? c}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
