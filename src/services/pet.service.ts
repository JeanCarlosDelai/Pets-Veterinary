import CustomAPIError from '../errors';
import PetRepository from '../repositories/pet.repository';
import TutorRepository from '../repositories/tutor.repository';
import Pet from '../models/Pet';
interface PetData {
    name: string;
    species: string;
    carry: string;
    weight: number;
    date_of_birth: string;
    tutor: string;
}

class PetService {

    async createPet(tutorId: string, petData: PetData) {
        const tutor = await TutorRepository.findById(tutorId);

        if (!tutor) {
            throw new CustomAPIError.BadRequestError('Tutor not found');
        }

        await this.checkDuplicateName(tutorId, petData.name);

        const requiredFields: (keyof PetData)[] = ['name', 'species', 'carry', 'weight', 'date_of_birth'];
        const errors: string[] = [];

        requiredFields.forEach(field => {
            const fieldValue = petData[field];

            if (!fieldValue) {
                errors.push(`Required field '${field}' is invalid`);
            }

        });

        if (errors.length > 0) {
            throw new CustomAPIError.BadRequestError(errors.join(', '));
        }

        const pet = new Pet({ ...petData, tutor: tutorId });

        const createdPet = await PetRepository.create(pet);
        tutor.pets.push(createdPet._id);
        await TutorRepository.save(tutor);

        const petShow = {
            name: createdPet.name,
            species: createdPet.species,
            carry: createdPet.carry,
            weight: createdPet.weight,
            date_of_birth: createdPet.date_of_birth,
        };


        return petShow;
    }

    private async checkDuplicateName(tutorId: string, name: string) {
        const existingPet = await PetRepository.findByName(tutorId, name);

        if (existingPet) {
            throw new CustomAPIError.BadRequestError('Pet already registered');
        }
    }

    async deletePet(tutorId: string, petId: string) {
        const existingTutor = await TutorRepository.findById(tutorId);

        if (!existingTutor) {
            throw new CustomAPIError.NotFoundError('Tutor not found');
        }

        const existingPet = await PetRepository.findById(tutorId, petId);

        if (!existingPet) {
            throw new CustomAPIError.BadRequestError('Pet not found');
        }

        await PetRepository.deleteOne(tutorId, petId);
    }
}


export default new PetService();