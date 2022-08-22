import TeamsService from '../services/Teams.service';
import UsersService from '../services/Users.service';
import UsersController from '../controllers/Users.controller';
import TeamsController from '../controllers/Teams.controller';

const usersService = new UsersService();
const usersController = new UsersController(usersService);

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

export { usersController, teamsController };
