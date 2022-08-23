import { Router } from 'express';
import { matchesController } from './main';

const router = Router();

router.get('/matches', matchesController.list);
router.get('/matches?inProgress=true', matchesController.list);

export default router;
