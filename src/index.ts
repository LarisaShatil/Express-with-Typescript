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
  minAge?: string;
  maxAge?: string;
};

app.get(
  '/',
  (
    req: Request<{}, unknown, {}, PetQueryParams>,
    res: Response<Pet[]>
  ): void => {
    const { species, adopted, minAge, maxAge } = req.query;

    let filteredPets: Pet[] = pets;

    if (species) {
    const normalizedSpecies: string | undefined =
      species?.toLowerCase();
      filteredPets = filteredPets.filter(
        (pet: Pet): boolean =>
          normalizedSpecies === pet.species.toLowerCase()
      );
    }
    if (adopted) {
      const isAdopted = adopted === 'true';

      filteredPets = filteredPets.filter(
        (pet: Pet): boolean => isAdopted === pet.adopted
      );
    }

    if (minAge) {
      const min = Number(minAge)
      filteredPets = filteredPets.filter(
        (pet: Pet): boolean => min <= pet.age
      );
    } 

    if (maxAge) {
      const max = Number(maxAge);
      filteredPets = filteredPets.filter(
        (pet: Pet): boolean => max >= pet.age
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
