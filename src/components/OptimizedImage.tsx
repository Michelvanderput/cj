import { useState, useCallback, type ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onLoad' | 'onError'> {
  /** Fallback content shown when the image fails to load */
  fallback?: React.ReactNode;
  /** Set to true for above-the-fold images to load eagerly */
  eager?: boolean;
}

/**
 * Image component with:
 * - native lazy loading
 * - async decoding
 * - animated skeleton placeholder (pulse) until loaded
 * - graceful error fallback
 *
 * Wrap in a container with a fixed aspect-ratio to prevent CLS.
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  fallback,
  eager = false,
  ...rest
}: OptimizedImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const handleLoad = useCallback(() => setLoaded(true), []);
  const handleError = useCallback(() => {
    setErrored(true);
    setLoaded(true); // stop skeleton
  }, []);

  if (errored) {
    return (
      <>
        {fallback ?? (
          <div className="absolute inset-0 flex items-center justify-center bg-surface-elevated text-tx-muted text-body-sm text-center px-4">
            Afbeelding niet beschikbaar
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {/* Skeleton pulse — visible until image loads */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-surface-elevated via-surface-card to-surface-elevated animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={eager ? 'high' : 'auto'}
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        {...rest}
      />
    </>
  );
};

export default OptimizedImage;
