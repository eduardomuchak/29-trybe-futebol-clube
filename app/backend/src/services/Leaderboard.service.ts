import TeamModel from '../database/models/Teams.model';
import MatchesModel from '../database/models/Matches.model';

import { ILeaderboardService } from '../interfaces';

export default class LeaderboardService implements ILeaderboardService {
  private teamDb = TeamModel;
  private matchesDb = MatchesModel;

  public listHomeLeaderboard = async (): Promise<any> => {
    const getAllTeams = await this.teamDb.findAll({
      attributes: ['teamName'],
    });

    const allTeams = getAllTeams.map((team) => team.teamName);

    return allTeams;
  };
}
