import { Router } from 'express';
import { matchesController } from './main';

const router = Router();

router.get('/matches', matchesController.filterInProgressMatches, matchesController.list);
router.post('/matches', matchesController.create);
router.patch('/matches/:id/finish', matchesController.finishMatch);
router.patch('/matches/:id', matchesController.changeMatchResult);

export default router;
