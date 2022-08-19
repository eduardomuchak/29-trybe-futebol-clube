import UserModel from '../database/models/Users.model';
import CustomError from '../helpers/CustomError';
import { ILoginService, LoginRequest, IUser } from '../interfaces';
import BcryptService from './Bcrypt.service';
import JwtService from './Jwt.service';

export default class UsersService implements ILoginService {
  public login = async (data: LoginRequest): Promise<string> => {
    const { email, password } = data;
    const unauthorizedError = new CustomError(401, 'Unauthorized user');
    const user: IUser | null = await UserModel.findOne({ where: { email } });

    if (!user) {
      throw unauthorizedError;
    }

    const isPasswordValid = BcryptService.compareSyncPassword(password, user.password);

    if (!isPasswordValid) {
      throw unauthorizedError;
    }

    const token = JwtService.sign({ email, password });

    return token;
  };
}
