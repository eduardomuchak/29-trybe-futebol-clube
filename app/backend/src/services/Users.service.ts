import UserModel from '../database/models/Users.model';
import CustomError from '../helpers/CustomError';
import { ILoginService, LoginRequest, IUser } from '../interfaces';
import BcryptService from './Bcrypt.service';
import JwtService from './Jwt.service';

export default class UsersService implements ILoginService {
  private db = UserModel;

  public login = async (data: LoginRequest): Promise<string> => {
    const { email, password } = data;
    const unauthorizedError = new CustomError(401, 'Incorrect email or password');
    const user: IUser | null = await this.db.findOne({ where: { email } });

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

  public validateLogin = (data: LoginRequest): LoginRequest => {
    const { email, password } = data;
    const requiredError = new CustomError(400, 'All fields must be filled');
    if (!email || !password) {
      throw requiredError;
    }
    return data;
  };

  public getRoleByAuthorization = async (authorization: string): Promise<string | undefined> => {
    const email = JwtService.verify(authorization);
    const user: IUser | null = await this.db.findOne({ where: { email } });

    if (!user) {
      throw new CustomError(404, 'User not found');
    }

    return user.role;
  };
}
