import { apiMiddleware } from '../server/api.js';

export default async function handler(req, res) {
  return new Promise((resolve) => {
    apiMiddleware(req, res, () => {
      if (!res.writableEnded) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: `API endpoint not found: ${req.url}` }));
      }
      resolve();
    }).then(resolve).catch((err) => {
      console.error('API Serverless Error:', err);
      if (!res.writableEnded) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Internal server error occurred.' }));
      }
      resolve();
    });
  });
}
