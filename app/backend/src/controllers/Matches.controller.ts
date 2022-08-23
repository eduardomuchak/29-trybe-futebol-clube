import { NextFunction, Request, Response } from 'express';
import CustomError from '../helpers/CustomError';
import JwtService from '../services/Jwt.service';
import MatchesService from '../services/Matches.service';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public list = async (req: Request, res: Response) => {
    const matches = await this.matchesService.list();
    res.status(200).json(matches);
  };

  public filterInProgressMatches = async (req: Request, res: Response, next: NextFunction) => {
    const { inProgress } = req.query;

    if (!inProgress) {
      next();
    } else if (inProgress === 'true') {
      const matches = await this.matchesService.listInProgress(true);
      res.status(200).json(matches);
    } else if (inProgress === 'false') {
      const matches = await this.matchesService.listInProgress(false);
      res.status(200).json(matches);
    }
  };

  public create = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam } = req.body;
    const { authorization } = req.headers;

    if (!authorization) {
      throw new CustomError(401, 'Token must be a valid token');
    }
    if (homeTeam === awayTeam) {
      throw new CustomError(401, 'It is not possible to create a match with two equal teams');
    }
    JwtService.validateToken(authorization);
    await this.matchesService.isValidTeams(homeTeam, awayTeam);

    const match = { ...req.body, inProgress: true };

    const newMatch = await this.matchesService.create(match);
    res.status(201).json(newMatch);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { authorization } = req.headers;

    if (!authorization) {
      throw new CustomError(404, 'Authorization not found');
    }

    JwtService.validateToken(authorization);

    await this.matchesService.finishMatch(Number(id));

    res.status(200).json({ message: 'Finished' });
  };

  // public isValidMatch = async (req: Request, _res: Response, next: NextFunction) => {
  //   const { homeTeam, awayTeam } = req.body;

  //   this.matchesService.isValidMatch(homeTeam, awayTeam);

  //   next();
  // };

  public changeMatchResult = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const match = await this.matchesService
      .changeMatchResult(Number(id), homeTeamGoals, awayTeamGoals);

    res.status(200).json({ match });
  };
}
