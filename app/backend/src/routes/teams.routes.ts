import { Router } from 'express';
import { teamsController } from './main';

const router = Router();

router.get('/teams/:id', teamsController.getById);
router.get('/teams', teamsController.list);

export default router;
