import TutorService from "../services/tutor.service";
import { Request, Response } from 'express';

class TutorController {
    async getAllTutors(req: Request, res: Response) {
        const tutors = await TutorService.getAllTutors();
        res.status(200).json(tutors);
    }
}

export default new TutorController();