import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public getHomeLeaderboard = async (req: Request, res: Response) => {
    const leaderboard = await this.leaderboardService.getLeaderboard('home');
    res.status(200).json(leaderboard);
  };
}
