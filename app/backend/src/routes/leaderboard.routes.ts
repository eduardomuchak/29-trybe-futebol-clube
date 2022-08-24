import { Router } from 'express';
import { leaderboardController } from './main';

const router = Router();

router.get('/leaderboard/home', leaderboardController.list);

export default router;
