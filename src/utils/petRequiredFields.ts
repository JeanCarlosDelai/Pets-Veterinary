import CustomAPIError from '../errors';
import { PetInterface } from '../models/Pet';

export function validatePetDataCreate(petData: PetInterface): void {
    const requiredFields: (keyof PetInterface)[] = ['name', 'species', 'carry', 'weight', 'date_of_birth'];
    const errors: string[] = [];

    requiredFields.forEach(field => {
        const fieldValue = petData[field];

        if (fieldValue === undefined) {
            errors.push(`Required field '${field}' is invalid`);
        }

        else if (typeof fieldValue !== 'string' && field !== 'weight') {
            errors.push(`Invalid field type for '${field}'. Expected string.`);
        }

        else if (field === 'weight' && typeof fieldValue !== 'number') {
            errors.push(`Invalid field type for '${field}'. Expected number.`);
        }

        else if (typeof fieldValue === 'string' && fieldValue.trim() === '') {
            errors.push(`Required field '${field}' is invalid`);
        }

    });

    if (errors.length > 0) {
        throw new CustomAPIError.BadRequestError(errors.join(', '));
    }
}

export function validatePetDataUpdate(petData: PetInterface): void {

    const requiredFields: (keyof PetInterface)[] = ['name', 'species', 'carry', 'weight', 'date_of_birth'];
    const errors: string[] = [];

    requiredFields.forEach(field => {
        const fieldValue = petData[field];

        if (typeof fieldValue !== 'string' && field !== 'weight') {
            errors.push(`Invalid field type for '${field}'. Expected string.`);
        }

        else if (field === 'weight' && typeof fieldValue !== 'number') {
            errors.push(`Invalid field type for '${field}'. Expected number.`);
        }

        else if (typeof fieldValue === 'string' && fieldValue.trim() === '') {
            errors.push(`Required field '${field}' is invalid`);
        }

    });

    if (errors.length > 0) {
        throw new CustomAPIError.BadRequestError(errors.join(', '));
    }
}