import CustomAPIError from '../errors';
import { TutorInterface } from '../models/Tutor';

export function validateTutorDataCreate(tutorData: TutorInterface): void {
    const requiredFields: (keyof TutorInterface)[] = ['name', 'password', 'email', 'phone', 'date_of_birth', 'zip_code'];
    const errors: string[] = [];

    requiredFields.forEach(field => {
        const fieldValue = tutorData[field];
        const fieldType = typeof fieldValue;

        if (fieldValue !== undefined && fieldType !== 'string') {
            errors.push(`Invalid field type for '${field}'. Expected string.`);
        }
        if (!fieldValue || fieldValue === '') {
            errors.push(`Field  '${field}' cannot be an empty.`);
        }
    });

    if (errors.length > 0) {
        throw new CustomAPIError.BadRequestError(errors.join(', '));
    }
}

export function validateTutorDataUpdate(tutorData: TutorInterface): void {
    const requiredFields: (keyof TutorInterface)[] = ['name', 'email', 'phone', 'date_of_birth', 'zip_code'];
    const errors: string[] = [];

    requiredFields.forEach(field => {
        const fieldValue = tutorData[field];
        const fieldType = typeof fieldValue;

        if (fieldValue !== undefined && fieldType !== 'string') {
            errors.push(`Invalid field type for '${field}'. Expected string.`);
        }

        if (fieldType === 'string' && fieldValue.trim() === '') {
            errors.push(`Field '${field}' cannot be an empty.`);
        }
    });

    if (errors.length > 0) {
        throw new CustomAPIError.BadRequestError(errors.join(', '));
    }
}