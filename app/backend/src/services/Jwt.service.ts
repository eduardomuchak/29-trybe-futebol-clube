import 'dotenv/config';
import { sign, Secret, SignOptions, JwtPayload } from 'jsonwebtoken';

const secret: Secret = process.env.JWT_SECRET || 'jwt_secret';

const signOptions: SignOptions = {
  expiresIn: '1h',
};

export default class JwtService {
  static sign = (payload: JwtPayload): string => sign(payload, secret, signOptions);
}
