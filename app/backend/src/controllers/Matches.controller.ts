import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public list = async (_req: Request, res: Response) => {
    const matches = await this.matchesService.list();
    res.status(200).json(matches);
  };
}
