import CustomAPIError from '../errors';
import TutorRepository from '../repositories/tutor.repository';
import AuthRepository from '../repositories/auth.repository';
import { validateTutorDataCreate, validateTutorDataUpdate } from '../utils/tutorRequiredFields';
import PetRepository from '../repositories/pet.repository';
import { TutorInterface } from '../models/Tutor';
class TutorService {
    async getAllTutors() {
        const tutors = await TutorRepository.findAll();

        const tutorShow = tutors.map(({ _id, name, phone, email, date_of_birth, zip_code, pets }) => ({
            _id,
            name,
            phone,
            email,
            date_of_birth,
            zip_code,
            pets: pets.map((pet: any) => ({
                id: pet.id,
                name: pet.name,
                species: pet.species,
                carry: pet.carry,
                weight: pet.weight,
                date_of_birth: pet.date_of_birth
            }))
        }));

        return (tutorShow);
    }

    async createTutor(tutorData: TutorInterface) {

        await this.checkDuplicateEmail(tutorData.email);

        validateTutorDataCreate(tutorData)

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

    async updateTutor(tutorData: TutorInterface, tutorId: string) {
        const existingTutor = await TutorRepository.findById(tutorId);

        await this.checkDuplicateEmail(tutorData.email);

        if (!existingTutor) {
            throw new CustomAPIError.NotFoundError('Tutor not found');
        }

        validateTutorDataUpdate(tutorData)

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
        const associatedPets = await PetRepository.findByTutorId(tutorId);

        if (associatedPets.length > 0) {
            throw new CustomAPIError.BadRequestError('Tutor has associated pets and cannot be deleted');
        }

        await TutorRepository.deleteOne(tutorId);
    }
}

export default new TutorService();