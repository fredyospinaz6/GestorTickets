import { Router } from 'express';
import { getTickets, newTicket } from '../controllers/ticket.controller';
import validateToken from './validate-token';

const router = Router();

router.post('/', newTicket);


export default router;