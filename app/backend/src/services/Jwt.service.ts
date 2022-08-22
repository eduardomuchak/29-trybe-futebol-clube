import 'dotenv/config';
import { sign, verify, Secret, SignOptions, JwtPayload } from 'jsonwebtoken';
import CustomError from '../helpers/CustomError';

const secret: Secret = process.env.JWT_SECRET || 'jwt_secret';

const signOptions: SignOptions = {
  expiresIn: '1h',
};

export default class JwtService {
  static sign = (payload: JwtPayload): string => sign(payload, secret, signOptions);

  static verify = (token: string): string => {
    const data = verify(token, secret) as JwtPayload;
    const { email } = data;

    if (!email) {
      throw new CustomError(404, 'Email not found');
    }

    return email;
  };
}
