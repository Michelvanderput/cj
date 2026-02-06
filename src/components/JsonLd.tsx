import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://cyriljansen.nl';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Cyril Jansen',
  url: BASE_URL,
  jobTitle: 'Foley Artist & Sound Designer',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Amsterdam',
    addressCountry: 'NL',
  },
  sameAs: [
    'https://www.instagram.com',
    'https://www.imdb.com',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Cyril Jansen',
  url: BASE_URL,
};

const collectionPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Projecten — Cyril Jansen',
  url: `${BASE_URL}/projects`,
  description:
    'Portfolio van Foley, sound design en opnamewerk voor film en televisie.',
};

const schemaMap: Record<string, object[]> = {
  '/': [personSchema, websiteSchema],
  '/projects': [collectionPageSchema],
};

const JsonLd = () => {
  const { pathname } = useLocation();
  const schemas = schemaMap[pathname];

  if (!schemas) return null;

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};

export default JsonLd;
