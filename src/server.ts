import { watch } from 'fs';
import { join } from 'path';

const PROJECT_ROOT = import.meta.dir.replace('/src', '');
const PORT = 3000;
const WS_PORT = 3001;

// Build JavaScript bundle
async function buildJS() {
  const result = await Bun.build({
    entrypoints: [join(PROJECT_ROOT, 'src/index.tsx')],
    outdir: join(PROJECT_ROOT, 'dist'),
    minify: false,
    sourcemap: 'external',
  });

  if (!result.success) {
    console.error('Build failed:', result.logs);
    return false;
  }
  return true;
}

// Build CSS with Tailwind
async function buildCSS() {
  const proc = Bun.spawn([
    'bunx',
    'tailwindcss',
    '-i', join(PROJECT_ROOT, 'src/index.css'),
    '-o', join(PROJECT_ROOT, 'dist/index.css'),
  ], {
    cwd: PROJECT_ROOT,
    stdout: 'inherit',
    stderr: 'inherit',
  });
  await proc.exited;
}

// Copy HTML with reload script
async function copyHTML() {
  const html = await Bun.file(join(PROJECT_ROOT, 'index.html')).text();
  const reloadScript = `
    <script>
      const ws = new WebSocket('ws://localhost:${WS_PORT}');
      ws.onmessage = (e) => {
        if (e.data === 'reload') {
          location.reload();
        }
      };
      ws.onclose = () => {
        setTimeout(() => location.reload(), 1000);
      };
    </script>
  `;
  const htmlWithReload = html.replace('</body>', `${reloadScript}</body>`);
  await Bun.write(join(PROJECT_ROOT, 'dist/index.html'), htmlWithReload);
}

// Initial build
console.log('🏎️  Building Luca\'s Car Trivia...');
await Bun.spawn(['mkdir', '-p', join(PROJECT_ROOT, 'dist')]).exited;
await Promise.all([buildJS(), buildCSS(), copyHTML()]);
console.log('✅ Build complete!');

// WebSocket server for live reload
const wsClients = new Set<any>();

Bun.serve({
  port: WS_PORT,
  fetch(req, server) {
    if (server.upgrade(req)) return;
    return new Response('WebSocket server');
  },
  websocket: {
    open(ws) {
      wsClients.add(ws);
    },
    close(ws) {
      wsClients.delete(ws);
    },
    message() {},
  },
});

function notifyReload() {
  for (const client of wsClients) {
    client.send('reload');
  }
}

// HTTP server
const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;

    if (path === '/') path = '/index.html';

    const filePath = join(PROJECT_ROOT, 'dist', path);

    try {
      const file = Bun.file(filePath);
      if (await file.exists()) {
        const contentType = getContentType(path);
        return new Response(file, {
          headers: { 'Content-Type': contentType },
        });
      }
    } catch {
      // Fall through to 404
    }

    // Fallback to index.html for SPA routing
    const indexFile = Bun.file(join(PROJECT_ROOT, 'dist/index.html'));
    return new Response(indexFile, {
      headers: { 'Content-Type': 'text/html' },
    });
  },
});

function getContentType(path: string): string {
  if (path.endsWith('.html')) return 'text/html';
  if (path.endsWith('.js')) return 'application/javascript';
  if (path.endsWith('.css')) return 'text/css';
  if (path.endsWith('.json')) return 'application/json';
  if (path.endsWith('.png')) return 'image/png';
  if (path.endsWith('.jpg') || path.endsWith('.jpeg')) return 'image/jpeg';
  if (path.endsWith('.svg')) return 'image/svg+xml';
  return 'application/octet-stream';
}

console.log(`\n🏁 Server running at http://localhost:${PORT}`);
console.log('👀 Watching for changes...\n');

// Watch for file changes
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

watch(join(PROJECT_ROOT, 'src'), { recursive: true }, async (event, filename) => {
  if (!filename) return;

  if (debounceTimer) clearTimeout(debounceTimer);

  debounceTimer = setTimeout(async () => {
    console.log(`📝 Change detected: ${filename}`);

    if (filename.endsWith('.css')) {
      await buildCSS();
    } else if (filename.endsWith('.tsx') || filename.endsWith('.ts')) {
      await buildJS();
    }

    notifyReload();
    console.log('🔄 Reloaded!\n');
  }, 100);
});

// Also watch index.html
watch(PROJECT_ROOT, async (event, filename) => {
  if (filename === 'index.html') {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      console.log('📝 Change detected: index.html');
      await copyHTML();
      notifyReload();
      console.log('🔄 Reloaded!\n');
    }, 100);
  }
});
