import TeamModel from '../database/models/Teams.model';
import MatchesModel from '../database/models/Matches.model';
import { IMatchesService, Match } from '../interfaces';

export default class MatchesService implements IMatchesService {
  private db = MatchesModel;

  public list = async (): Promise<Match[]> => {
    const matches = await this.db.findAll(
      {
        include: [
          {
            model: TeamModel, as: 'teamHome', attributes: ['teamName'],
          },
          {
            model: TeamModel, as: 'teamAway', attributes: ['teamName'],
          },
        ],
      },
    );
    return matches;
  };
}
