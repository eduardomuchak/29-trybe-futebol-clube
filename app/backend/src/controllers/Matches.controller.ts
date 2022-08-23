import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public list = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress === 'true') {
      const matches = await this.matchesService.listInProgress(true);
      res.status(200).json(matches);
    } else {
      const matches = await this.matchesService.list();
      res.status(200).json(matches);
    }
  };
}
