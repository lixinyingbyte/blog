const cp = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

cp.execFileSync(process.execPath, [path.join(__dirname, 'build.js')], { stdio: 'inherit' });

const root = path.join(__dirname, '..', 'dist');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp'
};

function resolveFile(url) {
  let pathname;
  try { pathname = decodeURIComponent(new URL(url, 'http://localhost').pathname); }
  catch { pathname = '/'; }
  if (pathname === '/') pathname = '/index.html';
  let file = path.join(root, pathname);
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return null;
  return file;
}

http.createServer((req, res) => {
  const file = resolveFile(req.url);
  if (!file) {
    res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'});
    return res.end('404 Not Found');
  }
  try {
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, {'Content-Type': mime[ext] || 'application/octet-stream'});
    res.end(fs.readFileSync(file));
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'});
    res.end('500 Internal Server Error');
  }
}).listen(3000, '127.0.0.1', () => {
  console.log('\nBlog:  http://localhost:3000/');
  console.log('Admin: http://localhost:3000/admin/\n');
});
