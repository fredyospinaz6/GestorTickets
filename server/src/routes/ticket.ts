import { Router } from 'express';
import { consultarUserId, getTickets, newTicket, getTicket, deleteTicket, postTicket, updateTicket } from '../controllers/ticket.controller';


const router = Router();

router.post('/', newTicket);
router.get('/', getTickets);
router.get('/:id', getTicket);
router.delete('/:id', deleteTicket);
router.post('/', postTicket);
router.put('/:id', updateTicket); 



export default router;