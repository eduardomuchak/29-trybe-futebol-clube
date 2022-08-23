import TeamModel from '../database/models/Teams.model';
import MatchesModel from '../database/models/Matches.model';
import { IMatchesService, Match } from '../interfaces';
import CustomError from '../helpers/CustomError';

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

  public listInProgress = async (inProgress: boolean): Promise<Match[]> => {
    const matches = await this.db.findAll(
      {
        where: {
          inProgress,
        },
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

  public create = async (match: Match): Promise<Match> => {
    const createdMatch = await this.db.create(match);
    return createdMatch;
  };

  public finishMatch = async (matchId: number): Promise<Match> => {
    const notFoundError = new CustomError(404, 'Match not found');

    const match = await this.db.findOne({ where: { id: matchId } });

    if (!match) {
      throw notFoundError;
    }

    match.inProgress = false;
    await match.save();

    return match;
  };

  // isValidMatch = async (homeTeamId: number, awayTeamId: number): Promise<void> => {
  //   const sameTeamsError = new CustomError(
  //     401,
  //     'It is not possible to create a match with two equal teams',
  //   );
  //   if (homeTeamId === awayTeamId) {
  //     throw sameTeamsError;
  //   }
  // };

  public isValidTeams = async (homeTeamId: number, awayTeamId: number): Promise<void> => {
    const notFoundError = new CustomError(404, 'There is no team with such id!');

    const homeTeam = await TeamModel.findOne({ where: { id: homeTeamId } });
    const awayTeam = await TeamModel.findOne({ where: { id: awayTeamId } });

    if (!homeTeam || !awayTeam) {
      throw notFoundError;
    }
  };

  public changeMatchResult = async (
    matchId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<Match> => {
    const notFoundError = new CustomError(404, 'Match not found');

    const match = await this.db.findOne({ where: { id: matchId } });

    if (!match) {
      throw notFoundError;
    }

    match.homeTeamGoals = homeTeamGoals;
    match.awayTeamGoals = awayTeamGoals;
    await match.save();

    return match;
  };
}
