import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), 'public');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };

export function start(port = Number(process.env.PORT) || 3000) {
  const server = createServer(async (req, res) => {
    const path = new URL(req.url, 'http://x').pathname;
    const rel = normalize(path === '/' ? '/index.html' : path);
    try {
      const body = await readFile(join(root, rel));
      res.writeHead(200, { 'content-type': types[extname(rel)] || 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404).end('Not found');
    }
  });
  return new Promise((ok) => server.listen(port, () => ok(server)));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const s = await start();
  console.log(`Running at http://localhost:${s.address().port}`);
}
