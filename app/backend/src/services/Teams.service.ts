import TeamModel from '../database/models/Teams.model';
import { ITeamService, Teams } from '../interfaces';

export default class TeamsService implements ITeamService {
  private db = TeamModel;

  public list = async (): Promise<Teams[]> => {
    const teams = await this.db.findAll();
    return teams;
  };
}
