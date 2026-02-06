export interface RouteMeta {
  title: string;
  description: string;
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
      'Cyril Jansen — Foley artist, sound designer en recording engineer gevestigd in Amsterdam. Gespecialiseerd in film, televisie en commerciële producties.',
    ogTitle: 'Cyril Jansen — Foley Artist & Sound Designer',
    ogDescription:
      'Foley artist, sound designer en recording engineer gevestigd in Amsterdam.',
    ogImage: DEFAULT_OG_IMAGE,
    ogUrl: BASE_URL,
  },
  '/projects': {
    title: 'Projecten — Cyril Jansen',
    description:
      'Bekijk het portfolio van Cyril Jansen: Foley, sound design en opnamewerk voor film, televisie en commerciële producties.',
    ogTitle: 'Projecten — Cyril Jansen',
    ogDescription:
      'Portfolio van Foley, sound design en opnamewerk voor film en televisie.',
    ogImage: DEFAULT_OG_IMAGE,
    ogUrl: `${BASE_URL}/projects`,
  },
  '/about': {
    title: 'Over — Cyril Jansen',
    description:
      'Leer meer over Cyril Jansen, zijn achtergrond als Foley artist en sound designer, en zijn professionele studio in Amsterdam.',
    ogTitle: 'Over — Cyril Jansen',
    ogDescription:
      'Achtergrond, ervaring en studio van Foley artist Cyril Jansen in Amsterdam.',
    ogImage: DEFAULT_OG_IMAGE,
    ogUrl: `${BASE_URL}/about`,
  },
  '/contact': {
    title: 'Contact — Cyril Jansen',
    description:
      'Neem contact op met Cyril Jansen voor projectaanvragen, samenwerkingen of vragen over Foley, sound design en opnamediensten.',
    ogTitle: 'Contact — Cyril Jansen',
    ogDescription:
      'Neem contact op voor projectaanvragen en samenwerkingen.',
    ogImage: DEFAULT_OG_IMAGE,
    ogUrl: `${BASE_URL}/contact`,
  },
};

export const getRouteMeta = (pathname: string): RouteMeta =>
  routeMeta[pathname] ?? routeMeta['/'];
