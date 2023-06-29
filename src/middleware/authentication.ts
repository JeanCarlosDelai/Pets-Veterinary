
import { Request, Response, NextFunction } from 'express';
import CustomAPIError from '../errors'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
  user: {
    userId: string;
    role: string;
  };
}

const authenticateUser: any = async (req: CustomRequest, res: Response, next: NextFunction) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new CustomAPIError.UnauthenticatedError('Autenticação Inválida');
  }
  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as Secret) as JwtPayload & { userId: string, role: string };
    // attach the user to the job routes

    req.user = { userId: payload.userId, role: payload.role };
    next();
  } catch (error) {
    throw new CustomAPIError.UnauthenticatedError('Autenticação Inválida');
  }
};


export default authenticateUser;