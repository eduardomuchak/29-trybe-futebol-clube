import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public getLeaderboard = async (req: Request, res: Response) => {
    const place: string = req.url.split('/')[2];

    if (place === 'home') {
      const homeLeaderboard = await this.leaderboardService.getLeaderboard('home');
      res.status(200).json(homeLeaderboard);
    } else if (place === 'away') {
      const awayLeaderboard = await this.leaderboardService.getLeaderboard('away');
      res.status(200).json(awayLeaderboard);
    }
  };
}
