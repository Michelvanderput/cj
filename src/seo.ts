export interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
}

const BASE_URL = 'https://cyriljansen.nl';
const DEFAULT_OG_IMAGE = `${BASE_URL}/img/og-default.jpg`;

export const routeMeta: Record<string, RouteMeta> = {
  '/': {
    title: 'Cyril Jansen — Foley Artist & Sound Designer',
    description:
      'Cyril Jansen — Foley artist, sound designer and recording engineer based in Amsterdam. Specializing in film, television and commercial productions.',
    canonical: BASE_URL,
    ogTitle: 'Cyril Jansen — Foley Artist & Sound Designer',
    ogDescription:
      'Foley artist, sound designer and recording engineer based in Amsterdam.',
    ogImage: DEFAULT_OG_IMAGE,
    ogUrl: BASE_URL,
  },
  '/work': {
    title: 'Work — Cyril Jansen',
    description:
      'Explore the services and work of Cyril Jansen: Foley, sound design, recording, mixing, ADR and field recording for film and television.',
    canonical: `${BASE_URL}/work`,
    ogTitle: 'Work — Cyril Jansen',
    ogDescription:
      'Services and work by Foley artist and sound designer Cyril Jansen.',
    ogImage: DEFAULT_OG_IMAGE,
    ogUrl: `${BASE_URL}/work`,
  },
  '/studio': {
    title: 'Studio — Cyril Jansen',
    description:
      'Professional recording and sound design studio based in Amsterdam, Netherlands. Equipped with state-of-the-art recording and sound design facilities.',
    canonical: `${BASE_URL}/studio`,
    ogTitle: 'Studio — Cyril Jansen',
    ogDescription:
      'Professional recording and sound design studio in Amsterdam.',
    ogImage: DEFAULT_OG_IMAGE,
    ogUrl: `${BASE_URL}/studio`,
  },
  '/projects': {
    title: 'Projects — Cyril Jansen',
    description:
      'Browse the portfolio of Cyril Jansen: Foley, sound design and recording work for film, television and commercial productions.',
    canonical: `${BASE_URL}/projects`,
    ogTitle: 'Projects — Cyril Jansen',
    ogDescription:
      'Portfolio of Foley, sound design and recording work for film and television.',
    ogImage: DEFAULT_OG_IMAGE,
    ogUrl: `${BASE_URL}/projects`,
  },
  '/bio': {
    title: 'Bio — Cyril Jansen',
    description:
      'Learn more about Cyril Jansen, his background as a Foley artist and sound designer, and his professional studio in Amsterdam.',
    canonical: `${BASE_URL}/bio`,
    ogTitle: 'Bio — Cyril Jansen',
    ogDescription:
      'Background and experience of Foley artist Cyril Jansen in Amsterdam.',
    ogImage: DEFAULT_OG_IMAGE,
    ogUrl: `${BASE_URL}/bio`,
  },
  '/contact': {
    title: 'Contact — Cyril Jansen',
    description:
      'Get in touch with Cyril Jansen for project inquiries, collaborations or questions about Foley, sound design and recording services.',
    canonical: `${BASE_URL}/contact`,
    ogTitle: 'Contact — Cyril Jansen',
    ogDescription:
      'Get in touch for project inquiries and collaborations.',
    ogImage: DEFAULT_OG_IMAGE,
    ogUrl: `${BASE_URL}/contact`,
  },
};

export const getRouteMeta = (pathname: string): RouteMeta =>
  routeMeta[pathname] ?? routeMeta['/'];
