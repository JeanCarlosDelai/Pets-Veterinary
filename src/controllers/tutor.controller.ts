import TutorService from "../services/tutor.service";
import { Request, Response } from 'express';
import 'express-async-errors';
class TutorController {
    async getAllTutors(req: Request, res: Response) {
        const tutors = await TutorService.getAllTutors();
        res.status(200).json(tutors);
    }
    async createTutor(req: Request, res: Response) {
        const tutorData = req.body;
        const newTutor = await TutorService.createTutor(tutorData);
        res.status(201).json(newTutor);
    }
    async deleteTutor(req: Request, res: Response) {
        const tutorId = req.params.tutorId;
        await TutorService.deleteTutor(tutorId);
        res.sendStatus(204);
    }
}

export default new TutorController();