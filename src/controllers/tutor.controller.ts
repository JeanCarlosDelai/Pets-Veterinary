import TutorService from '../services/tutor.service'
import { Request, Response } from 'express'
import StatusCodes from 'http-status-codes'
import 'express-async-errors'
class TutorController {
  async getAllTutors(req: Request, res: Response) {
    const tutors = await TutorService.getAllTutors()
    res.status(StatusCodes.OK).json(tutors)
  }
  async createTutor(req: Request, res: Response) {
    const tutorData = req.body
    const newTutor = await TutorService.createTutor(tutorData)
    res.status(StatusCodes.CREATED).json(newTutor)
  }
  async deleteTutor(req: Request, res: Response) {
    const tutorId = req.params.tutorId
    await TutorService.deleteTutor(tutorId)
    res.sendStatus(StatusCodes.NO_CONTENT)
  }
  async updateTutor(req: Request, res: Response) {
    const tutorId = req.params.tutorId
    const tutorData = req.body
    const updateTutor = await TutorService.updateTutor(tutorData, tutorId)
    res.status(StatusCodes.CREATED).json(updateTutor)
  }
}

export default new TutorController()
