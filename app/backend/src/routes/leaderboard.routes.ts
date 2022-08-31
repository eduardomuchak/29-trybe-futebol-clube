import { Router } from 'express';
import { leaderboardController } from './main';

const router = Router();

router.get('/leaderboard/home', leaderboardController.getHomeOrAwayLeaderboard);
router.get('/leaderboard/away', leaderboardController.getHomeOrAwayLeaderboard);
router.get('/leaderboard/', leaderboardController.getCompleteLeaderboard);

export default router;
