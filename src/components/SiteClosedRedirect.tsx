import { Navigate } from 'react-router-dom';
import useSiteConfig from '../hooks/useSiteConfig';

/**
 * Component that redirects to home page when the site is closed.
 * Use this in page components that should not be accessible when the site is closed.
 */
const SiteClosedRedirect = () => {
  const { config, loading } = useSiteConfig();

  // Don't redirect while loading to avoid flashing
  if (loading) return null;

  // Redirect to home (which will show the thank you page) when site is closed
  if (!config.isOpen) {
    return <Navigate to="/" replace />;
  }

  return null;
};

export default SiteClosedRedirect;
