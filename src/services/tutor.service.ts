import CustomAPIError from '../errors';
import TutorRepository from '../repositories/tutor.repository';
import AuthRepository from '../repositories/auth.repository';

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

        const tutorShow = tutors.map(({ _id, name, phone, email, date_of_birth, zip_code, pets }) => ({
            id: _id,
            name,
            phone,
            email,
            date_of_birth,
            zip_code,
            pets
        }));

        return (tutorShow);
    }

    async createTutor(tutorData: TutorData) {

        await this.checkDuplicateEmail(tutorData.email);

        const requiredFields: (keyof TutorData)[] = ['name', 'password', 'email', 'phone', 'date_of_birth', 'zip_code'];
        const errors: string[] = [];

        requiredFields.forEach(field => {
            const fieldValue = tutorData[field];
            const fieldType = typeof fieldValue;

            if (!fieldValue || fieldValue.trim() === '') {
                errors.push(`Required field '${field}' is invalid`);
            }
            if (fieldValue !== undefined && fieldType !== 'string') {
                errors.push(`Invalid field type for '${field}'. Expected string.`);
            }

        });

        if (errors.length > 0) {
            throw new CustomAPIError.BadRequestError(errors.join(', '));
        }

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



    async updateTutor(tutorData: TutorData, tutorId: string) {
        const existingTutor = await TutorRepository.findById(tutorId);

        await this.checkDuplicateEmail(tutorData.email);

        if (!existingTutor) {
            throw new CustomAPIError.NotFoundError('Tutor not found');
        }

        const requiredFields: (keyof TutorData)[] = ['name', 'email', 'phone', 'date_of_birth', 'zip_code'];
        const errors: string[] = [];

        requiredFields.forEach(field => {
            const fieldValue = tutorData[field];
            const fieldType = typeof fieldValue;

            if (fieldValue !== undefined && fieldType !== 'string') {
                errors.push(`Invalid field type for '${field}'. Expected string.`);
            }

            if (fieldType === 'string' && fieldValue.trim() === '') {
                errors.push(`Field '${field}' cannot be an empty string.`);
            }
        });

        if (errors.length > 0) {
            throw new CustomAPIError.BadRequestError(errors.join(', '));
        }

        const updateTutor: any = await TutorRepository.update(tutorData, tutorId);

        const tutorShow = {
            name: updateTutor.name,
            phone: updateTutor.phone,
            email: updateTutor.email,
            date_of_birth: updateTutor.date_of_birth,
            zip_code: updateTutor.zip_code
        };

        return tutorShow;
    }

    private async checkDuplicateEmail(email: string) {
        const existingTutor = await AuthRepository.findByEmail(email);

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