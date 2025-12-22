import express from 'express';
import type { Express, Request, Response } from 'express';

import { pets } from './data/pets';

const PORT: number = 8000;
const app: Express = express();

app.get('/', (req: Request, res: Response): void => {
  res.json(pets);
});

app.listen(PORT, (): void => {
  console.log(`Listening on port ${PORT}`);
});
