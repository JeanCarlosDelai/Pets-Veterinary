import PetService from "../services/pet.service";
import { Request, Response } from 'express';
import 'express-async-errors';
import Pet from '../models/Pet';

class PetController {
    async createPet(req: Request, res: Response) {
        const { tutorId } = req.params;
        const petData = req.body;
        const pet = await PetService.createPet(tutorId, petData);
        res.status(201).json(pet);
    };
}

export default new PetController();