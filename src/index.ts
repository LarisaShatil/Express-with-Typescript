import express from 'express';
import type { Express, Request, Response } from 'express';
import cors from 'cors';

import { pets } from './data/pets';
import type { Pet } from './data/pets';

const PORT: number = 8000;
const app: Express = express();

app.use(cors());

app.get(
  '/',
  (
    req: Request<{}, unknown,{},{species?:string}>,
    res: Response<Pet[]>
  ): void => {
    const {species} = req.query;
    let filteredPets: Pet[] = pets;

    if (species) {
      filteredPets = filteredPets.filter(
        (pet: Pet): boolean =>
          species.toLowerCase() === pet.species.toLowerCase()
      );
    }

    res.json(filteredPets);
  }
);

app.get(
  '/:id',
  (
    req: Request<{ id: number }>,
    res: Response<Pet | { message: string }>
  ): void => {
    const id: number = Number(req.params.id);
    const pet: Pet | undefined = pets.find(
      (pet: Pet) => id === pet.id
    );
    if (pet) {
      res.json(pet);
    } else {
      res
        .status(404)
        .json({ message: `The id ${id} doesn't exists` });
    }
  }
);

// for all wrong routes
app.use((req: Request, res: Response<{ message: string }>): void => {
  res.status(404).json({ message: 'Endpoint not found' });
});

app.listen(PORT, (): void => {
  console.log(`Listening on port ${PORT}`);
});
