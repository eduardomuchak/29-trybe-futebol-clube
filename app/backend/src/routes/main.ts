import UsersService from '../services/Users.service';
import UserController from '../controllers/Users.controller';

const usersService = new UsersService();
const userController = new UserController(usersService);

export default userController;
