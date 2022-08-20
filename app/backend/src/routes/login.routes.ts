import { Router } from 'express';
import UsersController from './main';

const router = Router();

router.post('/login', UsersController.login);

export default router;
