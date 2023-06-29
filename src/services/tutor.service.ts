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
}

export default new TutorService();