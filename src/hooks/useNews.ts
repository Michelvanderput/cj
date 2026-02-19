import { useState, useEffect } from 'react';
import type { NewsItem } from '../types';

const FALLBACK: NewsItem[] = [
  {
    id: '1',
    type: 'update',
    title: 'New project wrapped',
    content: "Just wrapped up the sound design for an exciting new thriller. Can't wait to share more!",
    date: '2024-01-15',
  },
  {
    id: '2',
    type: 'instagram',
    title: 'Behind the scenes',
    instagramUrl: 'https://www.instagram.com/p/example1/',
    date: '2024-01-10',
  },
  {
    id: '3',
    type: 'update',
    title: 'Studio session',
    content: 'Recording session in the studio today. Creating unique Foley sounds for an upcoming film project.',
    date: '2024-01-05',
  },
  {
    id: '4',
    type: 'instagram',
    title: 'On set',
    instagramUrl: 'https://www.instagram.com/p/example2/',
    date: '2023-12-28',
  },
];

let cached: NewsItem[] | null = null;

const useNews = () => {
  const [news, setNews] = useState<NewsItem[]>(cached ?? FALLBACK);
  const [loading, setLoading] = useState(!cached);

  useEffect(() => {
    if (cached) return;
    let cancelled = false;

    fetch('/data/news.json')
      .then((r) => r.json())
      .then((data: NewsItem[]) => {
        if (cancelled) return;
        cached = data;
        setNews(data);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        cached = FALLBACK;
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  return { news, loading };
};

export default useNews;
