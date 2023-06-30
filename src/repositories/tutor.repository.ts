import Tutor from '../models/Tutor';

class TutorRepository {
    async findAll() {
        const tutors = await Tutor.find().populate({ path: 'pets' });
        return tutors;
    }
    async findById(tutorId: string) {
        const tutor = await Tutor.findById(tutorId);
        return tutor;
    }
    async update(tutorData: Object, tutorId: string) {
        const updatedTutor = await Tutor.findByIdAndUpdate(tutorId, tutorData, {
            new: true,
            runValidators: true
        });
        return updatedTutor;
    }

    async create(tutorData: Object) {
        const newTutor = await Tutor.create(tutorData);
        return newTutor;
    }

    async deleteOne(tutorId: string) {
        await Tutor.findByIdAndDelete(tutorId);
    }
    async save(tutor: any) {
        return await tutor.save();
    }
}

export default new TutorRepository();
