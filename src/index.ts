import express from 'express';
import type { Express, Request, Response } from 'express';
import cors from 'cors';

import { pets } from './data/pets';
import type { Pet } from './data/pets';

const PORT: number = 8000;
const app: Express = express();

app.use(cors());

app.get('/', (req: Request, res: Response<Pet[]>): void => {
  res.json(pets);
});

// for all wrong routes
app.use((req: Request, res: Response<{message:string}>): void => {
  res.status(404).json({ message: 'Endpoint not found' });
});

app.listen(PORT, (): void => {
  console.log(`Listening on port ${PORT}`);
});
