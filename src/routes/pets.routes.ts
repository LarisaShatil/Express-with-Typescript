import express from 'express';
import type { Router } from 'express';

import { getPets, getPetById } from '../controllers/pets.sontrollers';
import { validateNumericId } from '../middleware/pets.middleware';

export const petRouter: Router = express.Router();

petRouter.get('/', getPets);

petRouter.get('/:id', validateNumericId, getPetById);
