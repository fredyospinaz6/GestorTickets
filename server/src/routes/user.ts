import { Router } from 'express';
import { loginUser, newUser, consultarUserId } from '../controllers/user.controller';

const router = Router();

router.post('/', newUser);
router.post('/login', loginUser);
router.get('/', consultarUserId);

export default router;