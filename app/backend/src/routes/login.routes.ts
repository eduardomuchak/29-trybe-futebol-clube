import { Router } from 'express';
import UsersController from '../controllers/Users.controller';

const router = Router();

const usersController = new UsersController();

router.post('/login', usersController.login);

export default router;
