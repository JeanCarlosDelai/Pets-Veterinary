import CustomAPIError from '../errors';
import TutorRepository from '../repositories/tutor.repository';

interface TutorData {
    name: string;
    password: string;
    email: string;
    phone: string;
    date_of_birth: string;
    zip_code: string;
}
class TutorService {
    async getAllTutors() {
        const tutors = await TutorRepository.findAll();

        const tutorShow = tutors.map(({ _id, name, phone, email, date_of_birth, zip_code }) => ({
            id: _id,
            name,
            phone,
            email,
            date_of_birth,
            zip_code,
        }));

        return ({ tutorShow, count: tutors.length });
    }

    async createTutor(tutorData: TutorData) {
        const requiredFields: (keyof TutorData)[] = ['name', 'password', 'email', 'phone', 'date_of_birth', 'zip_code'];
        const errors: string[] = [];

        requiredFields.forEach(field => {
            if (!tutorData[field] || tutorData[field].trim() === '') {
                errors.push(`Required field '${field}' is missing`);
            }
        });

        if (errors.length > 0) {
            throw new CustomAPIError.BadRequestError(errors.join(', '));
        }

        await this.checkDuplicateEmail(tutorData.email);

        const newTutor = await TutorRepository.create(tutorData);

        const tutorShow = {
            name: newTutor.name,
            password: '******',
            phone: newTutor.phone,
            email: newTutor.email,
            date_of_birth: newTutor.date_of_birth,
            zip_code: newTutor.zip_code
        };

        return tutorShow;
    }

    private async checkDuplicateEmail(email: string) {
        const existingTutor = await TutorRepository.findByEmail(email);

        if (existingTutor) {
            throw new CustomAPIError.BadRequestError('E-mail already registered');
        }
    }

    async deleteTutor(tutorId: string) {
        const existingTutor = await TutorRepository.findById(tutorId);

        if (!existingTutor) {
            throw new CustomAPIError.NotFoundError('Tutor not found');
        }

        await TutorRepository.deleteOne(tutorId);
    }
}

export default new TutorService();