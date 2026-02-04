import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { title, type, tags, country, countryCode, imdbUrl, year, role } = project;
  
  return (
    <article className="group cursor-pointer">
      <div className="aspect-[2/3] bg-neutral-100 mb-4 overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
          <span className="text-sm">{title}</span>
        </div>
        
        {imdbUrl && (
          <a
            href={imdbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-3 py-1.5 text-xs font-medium rounded hover:bg-neutral-100"
            onClick={(e) => e.stopPropagation()}
          >
            IMDb
          </a>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-lg leading-tight">{title}</h3>
          <span className="text-2xl" title={country}>
            {getFlagEmoji(countryCode)}
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <span>{type}</span>
          <span>•</span>
          <span>{year}</span>
        </div>
        
        <p className="text-sm text-neutral-500">{role}</p>
        
        <div className="flex flex-wrap gap-2 pt-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-neutral-100 text-neutral-700 rounded"
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
