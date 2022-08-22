import { Router } from 'express';
import { usersController } from './main';

const router = Router();

router.get('/login/validate', usersController.getRoleByAuthorization);
router.post('/login', usersController.login);

export default router;
