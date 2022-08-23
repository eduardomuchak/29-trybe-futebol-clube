import { Router } from 'express';
import { matchesController } from './main';

const router = Router();

router.get('/matches', matchesController.filterInProgressMatches, matchesController.list);

export default router;
