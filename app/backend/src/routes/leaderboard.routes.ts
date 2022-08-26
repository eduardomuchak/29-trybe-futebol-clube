import { Router } from 'express';
import { leaderboardController } from './main';

const router = Router();

router.get('/leaderboard/home', leaderboardController.getLeaderboard);
router.get('/leaderboard/away', leaderboardController.getLeaderboard);
router.get('/leaderboard/', leaderboardController.getLeaderboard);

export default router;
