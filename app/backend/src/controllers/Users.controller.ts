import { Request, Response } from 'express';
import CustomError from '../helpers/CustomError';
import UsersService from '../services/Users.service';

export default class UsersController {
  constructor(private usersService = new UsersService()) {}

  public login = async (req: Request, res: Response) => {
    const isValidUser = this.usersService.validateLogin(req.body);

    const token = await this.usersService.login(isValidUser);
    res.status(200).json({ token });
  };

  public getRoleByAuthorization = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new CustomError(404, 'Authorization not found');
    }

    const role = await this.usersService.getRoleByAuthorization(authorization);
    res.status(200).json({ role });
  };
}
