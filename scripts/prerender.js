import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.resolve(root, 'dist');

const ROUTES = ['/', '/projects', '/about', '/contact'];

async function prerender() {
  // 1. Read the built index.html template
  const template = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf-8');

  // 2. Import the SSR module built by Vite (use file:// URL for Windows compat)
  const serverEntry = pathToFileURL(
    path.resolve(distDir, 'server', 'entry-server.js'),
  ).href;
  const { render, getHeadTags } = await import(serverEntry);

  for (const route of ROUTES) {
    // 3. Render the app HTML for this route
    const { html: appHtml } = render(route);

    // 4. Get the per-route head tags
    const headTags = getHeadTags(route);

    // 5. Inject head tags and app HTML into the template
    let pageHtml = template
      .replace('<!--head-tags-->', headTags)
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    // 6. Write to the correct file path
    const filePath =
      route === '/'
        ? path.resolve(distDir, 'index.html')
        : path.resolve(distDir, route.slice(1), 'index.html');

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, pageHtml);
    console.log(`  ✓ ${route} → ${path.relative(root, filePath)}`);
  }

  console.log(`\nPrerendered ${ROUTES.length} routes.`);
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
