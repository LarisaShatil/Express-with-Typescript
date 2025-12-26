import express from 'express';
import type { Express, Request, Response } from 'express';
import cors from 'cors';

import { pets } from './data/pets';
import type { Pet } from './data/pets';

const PORT: number = 8000;
const app: Express = express();

app.use(cors());

type PetQueryParams = {
  species?: string;
  adopted?: 'true' | 'false';
};

app.get(
  '/',
  (
    req: Request<{}, unknown, {}, PetQueryParams>,
    res: Response<Pet[]>
  ): void => {
    const { species, adopted } = req.query;
  

    const normalizedSpecies: string | undefined =
      species?.toLowerCase();

    let filteredPets: Pet[] = pets;

    if (normalizedSpecies) {
      filteredPets = filteredPets.filter(
        (pet: Pet): boolean =>
          normalizedSpecies === pet.species.toLowerCase()
      );
    }
    if (adopted) {
      filteredPets = filteredPets.filter(
        (pet: Pet): boolean =>
          JSON.parse(adopted) === pet.adopted)
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
        .json({ message: `A pet with id ${id} doesn't exist` });
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
