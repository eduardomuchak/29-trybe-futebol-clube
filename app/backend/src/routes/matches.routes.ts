import { Router } from 'express';
import { matchesController } from './main';

const router = Router();

router.get('/matches', matchesController.filterInProgressMatches, matchesController.list);
router.post('/matches', matchesController.create);

export default router;
