import { Router } from 'express';
import { getTickets } from '../controllers/ticket.controller';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, getTickets)

export default router;