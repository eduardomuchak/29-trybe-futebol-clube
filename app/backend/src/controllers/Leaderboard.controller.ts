import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public getLeaderboard = async (req: Request, res: Response) => {
    const place: string = req.url.split('/')[2];

    if (place === '') {
      const homeLeaderboard = await this.leaderboardService.getHomeOrAwayLeaderboard('home');
      const awayLeaderboard = await this.leaderboardService.getHomeOrAwayLeaderboard('away');
      const leaderboard = this.leaderboardService
        .getHomeAndAwayLeaderboard(homeLeaderboard, awayLeaderboard);
      res.status(200).json(leaderboard);
    } else if (place === 'home') {
      const homeLeaderboard = await this.leaderboardService.getHomeOrAwayLeaderboard('home');
      res.status(200).json(homeLeaderboard);
    } else if (place === 'away') {
      const awayLeaderboard = await this.leaderboardService.getHomeOrAwayLeaderboard('away');
      res.status(200).json(awayLeaderboard);
    }
  };
}
