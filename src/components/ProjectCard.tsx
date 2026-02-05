import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { title, type, tags, country, countryCode, imdbUrl, year, role, posterUrl } = project;
  
  return (
    <article className="group">
      <div className="aspect-[2/3] bg-surface-elevated rounded-lg mb-4 overflow-hidden relative border border-brd transition-all duration-225 group-hover:border-brd-hover group-hover:shadow-card">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-tx-muted">
            <span className="text-body-sm font-heading tracking-wide">{title}</span>
          </div>
        )}
        
        {imdbUrl && (
          <a
            href={imdbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-brand-secondary text-white px-3 py-1.5 text-caption font-medium rounded-md hover:bg-brand-secondary-hover shadow-soft"
            onClick={(e) => e.stopPropagation()}
          >
            IMDb
          </a>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-h4 text-tx-primary leading-tight group-hover:text-brand-main transition-colors duration-200">{title}</h3>
          <span className="text-2xl flex-shrink-0" title={country}>
            {getFlagEmoji(countryCode)}
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-body-sm text-tx-secondary">
          <span>{type}</span>
          <span className="text-tx-muted">•</span>
          <span>{year}</span>
        </div>
        
        <p className="text-body-sm text-tx-muted">{role}</p>
        
        <div className="flex flex-wrap gap-1.5 pt-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-caption px-2 py-1 bg-surface-elevated text-tx-secondary rounded border border-brd"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

const getFlagEmoji = (countryCode: string): string => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export default ProjectCard;
