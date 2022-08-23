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
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const { authorization } = req.headers;

    if (!authorization) {
      throw new CustomError(404, 'Authorization not found');
    }

    JwtService.validateToken(authorization);

    const match = {
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress: true,
    };

    const newMatch = await this.matchesService.create(match);
    res.status(201).json(newMatch);
  };
}
