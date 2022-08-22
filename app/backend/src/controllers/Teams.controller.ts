import { Request, Response } from 'express';
import TeamsService from '../services/Teams.service';

export default class TeamsController {
  constructor(private teamsService = new TeamsService()) {}

  public list = async (_req: Request, res: Response) => {
    const teams = await this.teamsService.list();
    res.status(200).json(teams);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.teamsService.getById(Number(id));
    res.status(200).json(team);
  };
}
