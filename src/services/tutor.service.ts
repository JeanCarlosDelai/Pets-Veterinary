import TutorRepository from '../repositories/tutor.repository';

class TutorService {
    async getAllTutors() {
        try {
            const tutors = await TutorRepository.findAll();
            return tutors;
        } catch (error) {
            throw new Error('Failed to fetch tutors');
        }
    }
    async createTutor(tutorData: any) {
        const newTutor = await TutorRepository.create(tutorData);
        return newTutor;
    }
}

export default new TutorService();