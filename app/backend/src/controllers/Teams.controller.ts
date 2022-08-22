import { Request, Response } from 'express';
import TeamsService from '../services/Teams.service';

export default class TeamsController {
  constructor(private teamsService = new TeamsService()) {}

  public list = async (_req: Request, res: Response) => {
    const teams = await this.teamsService.list();
    res.status(200).json(teams);
  };
}
