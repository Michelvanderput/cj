import type { NewsItem } from '../types';
import OptimizedImage from './OptimizedImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

interface NewsCardProps {
  item: NewsItem;
}

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const NewsCard = ({ item }: NewsCardProps) => {
  const href = item.type === 'instagram' ? item.instagramUrl : item.url;
  const isExternal = !!href;

  const inner = (
    <>
      {/* Image */}
      {item.imageUrl && (
        <div className="aspect-video rounded-md overflow-hidden bg-surface-elevated relative -mx-5 -mt-5 mb-1">
          <OptimizedImage
            src={item.imageUrl}
            alt={item.title ?? 'News image'}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            fallback={<div className="absolute inset-0 bg-surface-elevated" />}
          />
        </div>
      )}

      {/* Instagram placeholder (no image) */}
      {item.type === 'instagram' && !item.imageUrl && (
        <div className="flex items-center justify-center aspect-square bg-surface-elevated rounded-md -mx-5 -mt-5 mb-1 transition-colors duration-200 group-hover:bg-surface-card">
          <span className="text-tx-muted group-hover:text-brand-main transition-colors duration-200 text-body-sm flex items-center gap-2">
            <FontAwesomeIcon icon={faInstagram} className="text-xl" />
            View on Instagram
          </span>
        </div>
      )}

      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          {item.title && (
            <h3 className="font-heading text-h4 text-tx-primary leading-snug group-hover:text-brand-main transition-colors duration-200">
              {item.title}
            </h3>
          )}
          {isExternal && (
            <FontAwesomeIcon
              icon={item.type === 'instagram' ? faInstagram : faArrowUpRightFromSquare}
              className="text-[13px] text-tx-muted group-hover:text-brand-main transition-colors duration-200 flex-shrink-0 mt-0.5"
            />
          )}
        </div>
        {item.content && (
          <p className="text-body-sm text-tx-secondary leading-relaxed flex-1">{item.content}</p>
        )}
        <time dateTime={item.date} className="text-caption text-tx-muted uppercase tracking-wide mt-auto pt-1">
          {formatDate(item.date)}
        </time>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="card flex flex-col gap-3 h-full group cursor-pointer transition-all duration-200 hover:border-brd-hover hover:shadow-card"
      >
        {inner}
      </a>
    );
  }

  return (
    <article className="card flex flex-col gap-3 h-full">
      {inner}
    </article>
  );
};

export default NewsCard;
