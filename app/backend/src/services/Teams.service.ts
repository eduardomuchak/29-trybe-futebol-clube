import TeamModel from '../database/models/Teams.model';
import { ITeamService, Team } from '../interfaces';

export default class TeamsService implements ITeamService {
  private db = TeamModel;

  public list = async (): Promise<Team[]> => {
    const teams = await this.db.findAll();
    return teams;
  };

  public getById = async (id: number): Promise<Team | null> => {
    const team = await this.db.findOne({ where: { id } });
    return team;
  };
}
