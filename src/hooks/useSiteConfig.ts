import { useState, useEffect } from 'react';
import type { SiteConfig } from '../types';

interface UseSiteConfigReturn {
  config: SiteConfig;
  loading: boolean;
}

const defaultConfig: SiteConfig = {
  isOpen: true,
  farewellMessage: 'Thank you for all the support over the years. It has been an incredible journey!',
};

let cachedConfig: SiteConfig | null = null;

/**
 * Fetches site config from /data/site-config.json at runtime.
 * Falls back to the default config for SSR and if the fetch fails.
 */
const useSiteConfig = (): UseSiteConfigReturn => {
  const [config, setConfig] = useState<SiteConfig>(cachedConfig ?? defaultConfig);
  const [loading, setLoading] = useState(!cachedConfig);

  useEffect(() => {
    if (cachedConfig) return;

    let cancelled = false;

    fetch('/data/site-config.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: SiteConfig) => {
        if (cancelled) return;
        cachedConfig = data;
        setConfig(data);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        cachedConfig = defaultConfig;
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  return { config, loading };
};

export const invalidateSiteConfigCache = (): void => {
  cachedConfig = null;
};

export default useSiteConfig;
