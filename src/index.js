import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { createServer } from 'http';

import api from './routes/api.js';
import { checkToken } from './auth.js'


const app = express();

// protected pages/apis
app.use('/api', checkToken, api);

// main page
app.get('*', (req, res) => {
  res.sendFile(path.join(path.dirname(fileURLToPath(import.meta.url)), 'public', 'index.html'));
});

const server = createServer(app);
server.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});