import { Request, Response } from 'express';
import UsersService from '../services/Users.service';

export default class UsersController {
  constructor(private usersService = new UsersService()) {}

  public login = async (req: Request, res: Response) => {
    const isValidUser = this.usersService.validateLogin(req.body);

    const token = await this.usersService.login(isValidUser);
    res.status(200).json({ token });
  };
}
