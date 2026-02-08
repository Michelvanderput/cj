import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Work from './pages/Work';
import Studio from './pages/Studio';
import Projects from './pages/Projects';
import Bio from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { getRouteMeta } from './seo';

export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="work" element={<Work />} />
            <Route path="studio" element={<Studio />} />
            <Route path="projects" element={<Projects />} />
            <Route path="bio" element={<Bio />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </StaticRouter>
    </StrictMode>,
  );
  return { html };
}

export function getHeadTags(url: string): string {
  const meta = getRouteMeta(url);
  return [
    `<title>${meta.title}</title>`,
    `<meta name="description" content="${meta.description}" />`,
    `<meta name="robots" content="index,follow" />`,
    `<link rel="canonical" href="${meta.canonical}" />`,
    `<meta property="og:title" content="${meta.ogTitle ?? meta.title}" />`,
    `<meta property="og:description" content="${meta.ogDescription ?? meta.description}" />`,
    `<meta property="og:type" content="website" />`,
    meta.ogImage ? `<meta property="og:image" content="${meta.ogImage}" />` : '',
    meta.ogUrl ? `<meta property="og:url" content="${meta.ogUrl}" />` : '',
  ]
    .filter(Boolean)
    .join('\n    ');
}
