import CustomAPIError from '../errors';
import AuthRepository from '../repositories/auth.repository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
const secretKey: any = process.env.JWT_SECRET;

class AuthService {
    async login(email: string, password: string) {

        const tutor = await AuthRepository.findByEmail(email);
        if (!tutor) {
            throw new CustomAPIError.UnauthenticatedError('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, tutor.password);
        if (!isPasswordValid) {
            throw new CustomAPIError.UnauthenticatedError('Invalid password');
        }

        const token = jwt.sign({ tutorId: tutor.id }, secretKey);
        return token;
    };

}

export default new AuthService();