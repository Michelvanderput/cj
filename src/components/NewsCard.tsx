import type { NewsItem } from '../types';
import OptimizedImage from './OptimizedImage';

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
  const isInstagram = item.type === 'instagram' && item.instagramUrl;

  return (
    <article className="card flex flex-col gap-3 h-full">
      {/* Image */}
      {item.imageUrl && (
        <div className="aspect-video rounded-md overflow-hidden bg-surface-elevated relative -mx-5 -mt-5 mb-1">
          <OptimizedImage
            src={item.imageUrl}
            alt={item.title ?? 'News image'}
            className="absolute inset-0 w-full h-full object-cover"
            fallback={<div className="absolute inset-0 bg-surface-elevated" />}
          />
        </div>
      )}

      {/* Instagram embed placeholder */}
      {isInstagram && !item.imageUrl && (
        <a
          href={item.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center aspect-square bg-surface-elevated rounded-md -mx-5 -mt-5 mb-1 group transition-colors duration-200 hover:bg-surface-card"
        >
          <span className="text-tx-muted group-hover:text-brand-main transition-colors duration-200 text-body-sm flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
            View on Instagram
          </span>
        </a>
      )}

      {/* Instagram with image */}
      {isInstagram && item.imageUrl && (
        <a
          href={item.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-caption text-tx-muted hover:text-brand-main transition-colors duration-200 flex items-center gap-1.5"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
          </svg>
          View on Instagram
        </a>
      )}

      <div className="flex flex-col gap-2 flex-1">
        {item.title && (
          <h3 className="font-heading text-h4 text-tx-primary leading-snug">{item.title}</h3>
        )}
        {item.content && (
          <p className="text-body-sm text-tx-secondary leading-relaxed flex-1">{item.content}</p>
        )}
        <time dateTime={item.date} className="text-caption text-tx-muted uppercase tracking-wide mt-auto pt-1">
          {formatDate(item.date)}
        </time>
      </div>
    </article>
  );
};

export default NewsCard;
