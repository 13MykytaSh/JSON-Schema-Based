import http from 'http';
import fs from 'fs';
import path from 'path';

/**
 * Simple static file server.
 * Serves files from the current working directory with appropriate MIME types.
 */

// Define the hostname and port
const hostname = 'localhost';
const port = 3000;

/**
 * MIME types mapping based on file extensions.
 * Used to determine the `Content-Type` header for served files.
 * @const {Object.<string, string>}
 */
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
};

// Create the server
const server = http.createServer((req, res) => {
  /**
   * Handles incoming HTTP requests and serves files from the current working directory.
   * 
   * @param {http.IncomingMessage} req - The request object.
   * @param {http.ServerResponse} res - The response object.
   */

  // Resolve the requested file path
  let filePath = path.join(process.cwd(), req.url === '/' ? 'index.html' : req.url);

  // Get the file extension
  const extname = path.extname(filePath);

  // Set the default MIME type or use a custom one from mimeTypes
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // Read and serve the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Handle file not found error
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 Not Found\n');
      } else {
        // Handle internal server error
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('500 Internal Server Error\n');
      }
    } else {
      // Serve the file with the correct content type
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.end(data);
    }
  });
});

/**
 * Starts the server and listens on the defined hostname and port.
 */
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
