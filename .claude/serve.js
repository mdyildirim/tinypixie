// Minimal static file server for previewing Pixie.
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PORT = 4173;
const TYPES = {
  '.html': 'text/html', '.js': 'text/javascript', '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json', '.json': 'application/json',
  '.css': 'text/css', '.png': 'image/png',
};

http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel === '/') rel = '/index.html';
  const file = path.join(ROOT, rel);
  if (!file.startsWith(ROOT)) { res.writeHead(403); res.end('forbidden'); return; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('not found'); return; }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT, () => console.log('pixie preview on http://localhost:' + PORT));
