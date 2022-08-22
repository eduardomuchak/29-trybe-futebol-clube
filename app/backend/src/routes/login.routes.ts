import { Router } from 'express';
import UsersController from './main';

const router = Router();

router.get('/login/validate', UsersController.getRoleByAuthorization);
router.post('/login', UsersController.login);

export default router;
