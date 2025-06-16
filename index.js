import app from './server/app.js'
import 'dotenv/config'
import 'express-async-errors'
import path from 'path'
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { PORT, inProduction } from './config/common.js'

if (!inProduction) {
  console.log('Development');

  (async () => {
    const vite = await createViteServer({
      server: { middlewareMode: 'html' },
      root: path.resolve(__dirname, './'),
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      res.sendFile(path.resolve(__dirname, './index.html'));
    })

  })();
} else {
  console.log('Production');
  const DIST_PATH = path.resolve(__dirname, '../dist');
  const INDEX_PATH = path.resolve(DIST_PATH, 'index.html');

  app.use(express.static(DIST_PATH, { extensions: ['html'] }));

  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(INDEX_PATH);
    } else {
      res.status(404).send('Not Found');
    }
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
