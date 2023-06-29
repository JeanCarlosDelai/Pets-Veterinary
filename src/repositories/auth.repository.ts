import Tutor from '../models/Tutor';

class AuthRepository {

    async findByEmail(email: string) {
        const tutor = await Tutor.findOne({ email });
        return tutor;
    }
}

export default new AuthRepository();
