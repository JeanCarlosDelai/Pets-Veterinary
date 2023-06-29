import Tutor from '../models/Tutor';

class TutorRepository {
    async findAll() {
        const tutors = await Tutor.find();
        return tutors;
    }
}

export default new TutorRepository();
