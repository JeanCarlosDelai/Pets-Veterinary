import Tutor from '../models/Tutor';

class TutorRepository {
    async findAll() {
        const tutors = await Tutor.find();
        return tutors;
    }

    async create(tutorData: any) {
        const newTutor = await Tutor.create(tutorData);
        return newTutor;
    }

    async findByEmail(email: string) {
        const tutor = await Tutor.findOne({ email });
        return tutor;
    }
}

export default new TutorRepository();
