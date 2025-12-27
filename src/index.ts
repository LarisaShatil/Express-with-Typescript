import express from 'express';
import cors from 'cors';

import type { Express, Request, Response } from 'express';
import { petRouter } from './routes/pets.routes';

const PORT: number = 8000;
const app: Express = express();

app.use(cors());
app.use('/pets', petRouter);

// for all wrong routes
app.use((req: Request, res: Response<{ message: string }>): void => {
  res.status(404).json({ message: 'Endpoint not found' });
});

app.listen(PORT, (): void => {
  console.log(`Listening on port ${PORT}`);
});
