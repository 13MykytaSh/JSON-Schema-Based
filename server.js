import http from 'http';
import fs from 'fs';
import path from 'path';

// Define the hostname and port
const hostname = 'localhost';
const port = 3000;

// MIME types map
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
};

// Create the server
const server = http.createServer((req, res) => {
  // Resolve the requested file path
  let filePath = path.join(process.cwd(), req.url === '/' ? 'index.html' : req.url);

  // Get the file extension
  const extname = path.extname(filePath);

  // Set the default MIME type to plain text
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // Read and serve the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 Not Found\n');
      } else {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('500 Internal Server Error\n');
      }
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.end(data);
    }
  });
});

// Start the server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
