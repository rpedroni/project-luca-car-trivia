import { join } from 'path';

const PROJECT_ROOT = import.meta.dir.replace('/scripts', '');

async function buildHTML() {
  const html = await Bun.file(join(PROJECT_ROOT, 'index.html')).text();

  // Update paths for production (relative paths for GitHub Pages)
  const productionHTML = html
    .replace('href="/index.css"', 'href="./index.css"')
    .replace('src="/index.js"', 'src="./index.js"');

  await Bun.write(join(PROJECT_ROOT, 'dist/index.html'), productionHTML);
  console.log('✅ HTML built for production');
}

buildHTML();
