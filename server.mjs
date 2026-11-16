
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import planningHandler from './api/generate-planning.ts';

const app = express();
const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);
const distDirectory = path.join(currentDirectory, 'dist');

app.use(express.json({ limit: '1mb' }));

app.post('/api/generate-planning', async (req, res) => {
  try {
    const request = new Request('http://localhost/api/generate-planning', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const response = await planningHandler.fetch(request);
    const responseBody = await response.text();

    res.status(response.status);

    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    res.send(responseBody);
  } catch (error) {
    console.error('Erro no servidor:', error);
    res.status(500).json({
      error: 'Não foi possível processar o planejamento.',
    });
  }
});

app.use(express.static(distDirectory));

app.use((req, res, next) => {
  if (req.method !== 'GET') {
    return next();
  }

  res.sendFile(path.join(distDirectory, 'index.html'));
});

const port = process.env.PORT || 10000;

app.listen(port, '0.0.0.0', () => {
  console.log(`Educa.IA funcionando na porta ${port}`);
});
