import TeamsService from '../services/Teams.service';
import UsersService from '../services/Users.service';
import UsersController from '../controllers/Users.controller';
import TeamsController from '../controllers/Teams.controller';
import MatchesService from '../services/Matches.service';
import MatchesController from '../controllers/Matches.controller';

const usersService = new UsersService();
const usersController = new UsersController(usersService);

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

export { usersController, teamsController, matchesController };
