import express from 'express';
import PetController from '../controllers/pet.controller';
import authenticateUser from '../middleware/authentication';

const router = express.Router();

router.post('/:tutorId', authenticateUser, PetController.createPet);

export default router;